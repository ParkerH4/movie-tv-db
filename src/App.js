import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/MovieCard.js";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
      },
    });

    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  });

  const renderMovies = () => movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  return (
    <div className="App">
      <h1>MovieDB App</h1>
      <div className="container">{renderMovies()}</div>
    </div>
  );
};

export default App;
