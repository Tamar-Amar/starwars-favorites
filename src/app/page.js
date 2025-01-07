"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./globals.css";

const API_URL = "https://swapi.py4e.com/api/films/";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const sortedMovies = data.results.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    fetchMovies();
  }, []);

  const toggleFavorite = (movieId) => {
    let updatedFavorites;

    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter((id) => id !== movieId);
    } else {
      updatedFavorites = [...favorites, movieId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <header>
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Star Wars Timeline
        </motion.h1>
        <p>Explore the Star Wars movies by their release dates!</p>
      </header>
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="timeline">
          {filteredMovies.map((movie) => (
            <div key={movie.episode_id} className="timeline-item">
              <motion.div
                className="timeline-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>{movie.title}</h2>
                <p>Release Date: {movie.release_date}</p>
                <p>{movie.opening_crawl.slice(0, 100)}...</p>
                <Link href={`/${movie.episode_id}`}>Details</Link>
                <button
                  className={`favorite-button ${
                    favorites.includes(movie.episode_id) ? "favorited" : ""
                  }`}
                  onClick={() => toggleFavorite(movie.episode_id)}
                >
                  {favorites.includes(movie.episode_id) ? <FaStar /> : <FaRegStar />}
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
