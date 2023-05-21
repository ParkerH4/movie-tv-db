import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img className="movie-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
