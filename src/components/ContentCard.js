import React from "react";
import placeholder from "../components/assets/placeholder.jpg";

const ContentCard = ({ content, setSelectedContent }) => {
  const handleCardClick = () => {
    setSelectedContent(content);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {content.poster_path ? <img className="card-image" src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} alt={content.title || content.name} /> : <img className="card-image" src={placeholder} alt={content.title || content.name} />}
      <div className="card-content">
        <h3>{content.title || content.name}</h3>
        <p>{content.release_date || content.first_air_date}</p>
      </div>
    </div>
  );
};

export default ContentCard;
