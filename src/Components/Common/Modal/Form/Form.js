import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "./Form.scss";
import "react-datepicker/dist/react-datepicker.css";
import { selectAllMovies } from "../../../../features/MoviesSlice";
import { CheckBox } from "@mui/icons-material";

const Form = ({ title, src, genre, releaseYear }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieSrc, setMovieSrc] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieReleaseYear, setMovieReleaseYear] = useState("2020-01-01");
  const [movieRating, setMovieRating] = useState("");
  const [movieRuntime, setMovieRuntime] = useState("");
  const [movieOverview, setMovieOverView] = useState("");

  const { movies } = useSelector(selectAllMovies);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setMovieTitle(title || "");
    setMovieSrc(src || "");
    setMovieGenre(genre || "");
    setMovieReleaseYear(`${releaseYear || "2020"}-01-01`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderGenreOptions = () => {
    const allGenres = [
      ...new Set(movies.flatMap(({ genres }) => genres)),
    ].sort();
    return ["Select", ...allGenres].map((genre) => (
      <option key={genre} id={genre} className="option">
        <CheckBox />
        {genre}
      </option>
    ));
  };

  renderGenreOptions();

  return (
    <>
      <div className="add-movie__form">
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            className="title"
            type="text"
            placeholder="Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="releaseDate">Release date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="movieUrl">Movie URL</label>
          <input
            className="movieUrl"
            type="text"
            placeholder="https://"
            value={`https://${movieSrc}`}
            onChange={(e) => setMovieSrc(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="rating">Rating</label>
          <input
            className="rating"
            type="text"
            placeholder="0.0"
            value={movieRating}
            onChange={(e) => setMovieRating(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="genre">Genre</label>
          <select
            className="genre"
            onChange={(e) => setMovieGenre(e.target.value)}
            value={movieGenre}
          >
            {renderGenreOptions()}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="runtime">Runtime</label>
          <input
            className="runtime"
            type="text"
            placeholder="minutes"
            value={movieRuntime}
            onChange={(e) => setMovieRuntime(e.target.value)}
          />
        </div>
      </div>
      <div className="textarea-container">
        <label htmlFor="overview">Overview</label>
        <textarea
          className="overview"
          type="text"
          placeholder="Movie description"
          value={movieOverview}
          onChange={(e) => setMovieOverView(e.target.value)}
        />
      </div>
    </>
  );
};

export default Form;
