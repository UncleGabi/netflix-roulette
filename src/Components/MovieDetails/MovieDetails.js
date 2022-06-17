import React from "react";

import SearchIcon from "@mui/icons-material/Search";

import "./MovieDetails.scss";

const MovieDetails = ({ selectedMovieData, setSelectedMovieData }) => {
  const genre = selectedMovieData.genre.join(" & ");

  return (
    <div id="header" className="movie-data">
      <div className="movie-data__header">
        <div>netflixroulette</div>
        <SearchIcon onClick={() => setSelectedMovieData({})} />
      </div>
      <div className="movie-data__content">
        <img src={`${selectedMovieData.src}`} alt="" />
        <div className="movie-data__content-details">
          <div className="main-details">
            <div className="title-rating">
              <span className="title">{selectedMovieData.title}</span>
              <span className="rating">{selectedMovieData.rating}</span>
            </div>
            <div className="genre">{genre}</div>
          </div>
          <div className="release-duration">
            <div className="release">{selectedMovieData.releaseYear}</div>
            <div className="duration">{selectedMovieData.duration}</div>
          </div>
          <div className="overview">{selectedMovieData.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
