// src/components/MovieCard.js
import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>Year: {movie.Year}</p>
                <p>Rating: {movie.imdbRating}</p>
            </div>
        </div>
    );
}

export default MovieCard;
