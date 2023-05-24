import React from "react";
import placeholder from "./placeholder.jpg";

const MovieCard = ({ movie, setSelectedMovie }) => {
  const handleClick = () => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      {movie.poster_path ? <img className="movie-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : <img className="movie-cover" src={placeholder} alt={movie.title} />}
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
