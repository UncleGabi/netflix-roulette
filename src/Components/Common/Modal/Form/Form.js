import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";

import "./Form.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
  selectAllMovies,
  setEditedMoive,
} from "../../../../features/MoviesSlice";
import { CheckBox } from "@mui/icons-material";

const Form = () => {
  const { movies, editedMovie } = useSelector(selectAllMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("editedMovie.release_date", editedMovie.release_date);
  }, []);

  const handleMovieDataEditing = (prop, data) =>
    dispatch(setEditedMoive({ ...editedMovie, [prop]: data }));

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
    <form>
      <div className="add-movie__form">
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            className="title"
            name="title"
            type="text"
            placeholder="Title"
            value={editedMovie.title || ""}
            onChange={(e) => {
              handleMovieDataEditing("title", e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="releaseDate">Release date</label>
          <DatePicker
            name="releaseDate"
            dateFormat="MM-dd-yyyy"
            selected={
              new Date()
              // editedMovie.release_date
              //   ? new Date(`${editedMovie.release_date}`)
              //   : new Date()
            }
            onChange={(date) => {
              dispatch(
                setEditedMoive({
                  ...editedMovie,
                  release_date: date.toLocaleDateString(),
                })
              );
            }}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="movieUrl">Movie URL</label>
          <input
            className="movieUrl"
            name="posterPath"
            type="text"
            placeholder="https://"
            value={editedMovie.poster_path || ""}
            onChange={(e) => {
              handleMovieDataEditing("poster_path", e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="rating">Rating</label>
          <input
            className="rating"
            name="rating"
            type="number"
            step="any"
            placeholder="0.0"
            min="1"
            max="10"
            value={editedMovie.vote_average || ""}
            onChange={(e) => {
              handleMovieDataEditing(
                "vote_average",
                e.target.value > 10 ? 10 : e.target.value
              );
            }}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="genre">Genre</label>
          <input
            className="genre"
            name="genre"
            onChange={(e) => {
              handleMovieDataEditing("genres", e.target.value.split(","));
            }}
            value={editedMovie.genres || []}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="runtime">Runtime</label>
          <input
            className="runtime"
            name="runtime"
            type="number"
            step="1"
            placeholder="minutes"
            value={editedMovie.runtime || ""}
            onChange={(e) => {
              handleMovieDataEditing("runtime", e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="textarea-container">
        <label htmlFor="overview">Overview</label>
        <textarea
          className="overview"
          name="overview"
          type="text"
          placeholder="Movie description"
          value={editedMovie.overview || ""}
          onChange={(e) => {
            handleMovieDataEditing("overview", e.target.value);
          }}
          required
        />
      </div>
    </form>
  );
};

export default Form;
