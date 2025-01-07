"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";


const API_URL = "https://swapi.py4e.com/api/films/";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);



  useEffect(() => {
    // Fetch movies from API
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Load favorites from Local Storage
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
        <h1>Star Wars Films</h1>
        <p>Select your favorite films and keep them saved for your next visit!</p>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 border rounded mt-10 ml-20"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="movies-container">
          {filteredMovies.map((movie) => (
            <div key={movie.episode_id}>
            <motion.div
              className="movie-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{movie.title}</h3>
              <Link href={`/${movie.episode_id}`}>Details</Link>
              <p>Release Date: {movie.release_date}</p>
              <button                 className={`favorite-button ${
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
