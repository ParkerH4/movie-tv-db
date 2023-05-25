import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ContentCard from "./components/ContentCard.js";
import { IoMdStar } from "react-icons/io";
import { BiMoviePlay } from "react-icons/bi";

const App = () => {
  // Constants
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // State variables
  const [contentType, setContentType] = useState("");
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching the content based on the selected content type (movies or TV shows)
  const fetchContent = async () => {
    let url = searchQuery ? `${BASE_URL}/search/movie` : `${BASE_URL}/discover/movie`;

    if (contentType === "tv") {
      url = searchQuery ? `${BASE_URL}/search/tv` : `${BASE_URL}/tv/top_rated?language=en-US&page=1'`;
    }

    const {
      data: { results },
    } = await axios.get(url, {
      params: {
        api_key: API_KEY,
        query: searchQuery,
      },
    });

    setContent(results);
    setSelectedContent(results[0]);
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line
  }, [contentType]);

  // Rendering each content card and mapping it to its proper details based on id
  const renderContent = () => content.map((item) => <ContentCard key={item.id} content={item} setSelectedContent={handleContentClick} />);

  // Content type changes between movies and TV show buttons
  const handleContentTypeChange = (type) => {
    setContentType(type);
  };

  // Search query changes as user types or submits a title
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchContent();
  };

  // when a content item is clicked, it is set as the selectedContent item
  const handleContentClick = (item) => {
    setSelectedContent(item);
  };

  // handling the click of the trailer button (searches YouTube and finds the YouTube URL based on item id)
  const handlePlayTrailer = async () => {
    let url = `${BASE_URL}/movie/${selectedContent.id}/videos`;

    if (contentType === "tv") {
      url = `${BASE_URL}/tv/${selectedContent.id}/videos`;
    }

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

  const chosenContentBackdrop = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${selectedContent.backdrop_path})`,
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-content center">
          <h1 onClick={() => window.location.reload()}>
            ShowtimeDB <BiMoviePlay size={40} className="movie-icon" />
          </h1>
          <div>
            <button className={`headerButton ${contentType === "movies" ? "active" : ""}`} onClick={() => handleContentTypeChange("movies")}>
              Movies
            </button>
            <button className={`headerButton ${contentType === "tv" ? "active" : ""}`} onClick={() => handleContentTypeChange("tv")}>
              TV Shows
            </button>
          </div>
          <form onSubmit={handleSearchSubmit}>
            <div className="search-container">
              <label>Search Content</label>
              <input type="text" id="searchInput" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." />
            </div>
          </form>
        </div>

        <div className="chosenContent" style={chosenContentBackdrop}>
          <div className="chosenContent-content center">
            <h1>{selectedContent.title || selectedContent.name}</h1>
            <div className="rating">
              <IoMdStar size={40} className="star-icon" />
              <span>{selectedContent.vote_average}</span>
            </div>
            <h3>{selectedContent.release_date || selectedContent.first_air_date}</h3>
            <p>{selectedContent.overview}</p>
            <button className="button" onClick={handlePlayTrailer}>
              Watch trailer
            </button>
          </div>
        </div>
      </div>
      <div className="container center">{renderContent()}</div>
    </div>
  );
};

export default App;
