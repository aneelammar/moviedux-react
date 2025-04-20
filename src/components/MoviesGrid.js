import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard"; // Import the MovieCard component

export default function MovieGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [genre, setGenre] = useState("All Genres"); // State to hold the selected genre
  const [rating, setRating] = useState("All"); // State to hold the selected rating

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value); // Update the genre state
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value); // Update the rating state
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;

      case "Good":
        return movie.rating >= 8;

      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;

      case "Bad":
        return movie.rating < 5;

      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleSearchChange} // Update the search term on input change
      />

      <div className="filter-bar">
        <div className="filtter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="All Genres">All Genres</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
          </select>
        </div>

        <div className="filtter-slot"></div>
        <label>Rating</label>
        <select
          className="filter-dropdown"
          value={rating}
          onChange={handleRatingChange}
        >
          <option value="All">All</option>
          <option value="Good">Good</option>
          <option value="Ok">Ok</option>
          <option value="Bad">Bad</option>
        </select>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)} // Check if the movie is in the watchlist
          >
            {" "}
          </MovieCard> // Use the MovieCard component to display each movie
        ))}
      </div>
    </div>
  );
}
