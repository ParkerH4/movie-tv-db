import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/MovieCard/MovieCard.js";
import { IoMdStar } from "react-icons/io";

const App = () => {
  // Constants
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // State variables
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching the movies based on what is searched by the user
  // eslint-disable-next-line
  const fetchMovies = async () => {
    const url = searchQuery ? `${BASE_URL}/search/movie` : `${BASE_URL}/discover/movie`;
    const {
      data: { results },
    } = await axios.get(url, {
      params: {
        api_key: API_KEY,
        query: searchQuery,
      },
    });

    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Rendering each movie card and mapping it to it's proper details based on id
  const renderMovies = () => movies.map((movie) => <MovieCard key={movie.id} movie={movie} setSelectedMovie={handleMovieClick} />);

  // Movies changes as user types or submits a title
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  // when a movie is clicked it is set to the state of that movie
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // handling the click of the trailer button (searches youtube and finds the youtube URL based on movie id)
  const handlePlayTrailer = async () => {
    const url = `${BASE_URL}/movie/${selectedMovie.id}/videos`;
    const {
      data: { results },
    } = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });

    const trailer = results.find((video) => video.type === "Trailer" && video.site === "YouTube");
    if (trailer) {
      const youtubeURL = `https://www.youtube.com/watch?v=${trailer.key}`;
      window.open(youtubeURL, "_blank");
    }
  };

  const chosenMovieBackdrop = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path})`,
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-content center">
          <h1>ShowtimeDB</h1>
          <form onSubmit={handleSearchSubmit}>
            <div className="search-container">
              <label>Search Content</label>
              <input type="text" id="searchInput" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." />
            </div>
          </form>
        </div>

        <div className="chosenMovie" style={chosenMovieBackdrop}>
          <div className="chosenMovie-content center">
            <h1>{selectedMovie.title}</h1>
            <div className="rating">
              <IoMdStar size={40} className="star-icon" />
              <span>{selectedMovie.vote_average}</span>
            </div>
            <h3>{selectedMovie.release_date}</h3>
            <p>{selectedMovie.overview}</p>
            <button className="button" onClick={handlePlayTrailer}>
              Watch trailer
            </button>
          </div>
        </div>
      </div>
      <div className="container center">{renderMovies()}</div>
    </div>
  );
};

export default App;
