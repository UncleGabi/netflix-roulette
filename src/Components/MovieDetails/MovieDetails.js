import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMovie } from "../../features/MoviesSlice";

import SearchIcon from "@mui/icons-material/Search";

import "./MovieDetails.scss";
import { selectAllMovies } from "../../features/MoviesSlice";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovieData = useSelector(selectAllMovies).selectedMovie;

  const minConverter = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes - hrs * 60;
    return `${hrs}h ${mins}min`;
  };

  useEffect(() => {
    if (JSON.stringify(selectedMovieData[0]) !== "{}") {
      const header = document.querySelector("#header");
      header.scrollIntoView({ behavior: "smooth", block: "center" });
      minConverter(selectedMovieData.runtime);
    }
  }, [selectedMovieData]);

  return (
    <div id="header" className="movie-data">
      <div className="movie-data__header">
        <div>netflixroulette</div>
        <SearchIcon onClick={() => dispatch(setSelectedMovie(-1))} />
      </div>
      <div className="movie-data__content">
        <img src={`${selectedMovieData.poster_path}`} alt="" />
        <div className="movie-data__content-details">
          <div className="main-details">
            <div className="title-rating">
              <span className="title">{selectedMovieData.title}</span>
              <span className="rating">{selectedMovieData.vote_average}</span>
            </div>
            <div className="genre">{selectedMovieData.genres.join(" & ")}</div>
          </div>
          <div className="release-duration">
            <div className="release">
              {new Date(selectedMovieData.release_date).getFullYear()}
            </div>
            <div className="duration">
              {minConverter(selectedMovieData.runtime)}
            </div>
          </div>
          <div className="overview">{selectedMovieData.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
