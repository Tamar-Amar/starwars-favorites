"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://swapi.py4e.com/api/films/";

export default function MovieDetails({ params }) {
  const { movieId } = params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}${movieId}/`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <h1>{movie.title}</h1>
        <p>Release Date: {movie.release_date}</p>
      </header>
      <main>
        <p>{movie.opening_crawl}</p>
        <h2>Characters:</h2>
        <ul>
          {movie.characters.map((character, index) => (
            <li key={index}>{character}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
