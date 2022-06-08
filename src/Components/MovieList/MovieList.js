import React from "react";
import PropTypes from "prop-types";

function MovieList({ movieData }) {
  return (
    <main className="movies__container">
      <div className="movies-header">
        <ul>
          <li>All</li>
          <li>Documentary</li>
          <li>Comedy</li>
          <li>Horror</li>
          <li>Crime</li>
        </ul>
        <div className="movies-handler">
          <div className="sort">Sort by</div>
          <div className="release-date">
            Release date <span className="down-arrow" />{" "}
          </div>
        </div>
      </div>
      <div className="movies-found">
        <span>39</span> movies found
      </div>
      <div className="movies-list">
        {movieData.map((movie) => {
          return (
            <div key={movie.id} className="movie-card">
              <img src={`${movie.src}`} alt={`${movie.title}`} />
              <div className="movie-details">
                <div className="movie-title">{movie.title}</div>
                <div className="release-year">{movie.releaseYear}</div>
              </div>
              <div className="genres">{movie.genre.join(" & ")}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

MovieList.prototype = {
  movieData: {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    genre: PropTypes.number.isRequired,
  },
};

export default MovieList;
