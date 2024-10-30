// src/App.js
import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const apiKey = '237cc408';

    useEffect(() => {
        // Fetch IMDb IDs from the JSON file
        fetch('/imdb_movies.json')
            .then((response) => response.json())
            .then((movieList) => {
                fetchMovieDetails(movieList);
            });
    }, []);

    async function fetchMovieDetails(movieList) {
        const movieData = [];
        for (const movie of movieList) {
            try {
                const response = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
                const data = await response.json();
                if (data.Response === 'True') {
                    movieData.push(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        setMovies(movieData);
    }

    return (
        <div className="app">
            <h2>My Watched Movies</h2>
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default App;
