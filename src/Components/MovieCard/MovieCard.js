import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import {
  setSelectedMovie,
  setEditedMoive,
  selectAllMovies,
} from "../../features/MoviesSlice";

import "./MovieCard.scss";

const MovieCard = ({
  id,
  title,
  src,
  genre,
  releaseYear,
  openModal,
  setOpenModal,
  setMovieId,
}) => {
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { filteredMovies } = useSelector(selectAllMovies);
  const selectedMovieData = filteredMovies.find((movie) => movie.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    setEditDropdownOpen(false);
  }, [openModal]);

  return (
    <div
      key={id}
      className="movie-card"
      onClick={(e) => {
        navigate(`/movies/${id}`);
      }}
    >
      <div className="edit-container">
        {editDropdownOpen ? (
          <div className="edit-dropdown">
            <div
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setEditDropdownOpen(false);
              }}
            >
              +
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal("Edit");
                setMovieId(id);
                dispatch(setEditedMoive(selectedMovieData));
              }}
              className="edit-dropdown__data"
            >
              Edit
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal("Delete");
                setMovieId(id);
              }}
              className="edit-dropdown__data"
            >
              Delete
            </div>
          </div>
        ) : (
          <MoreVertIcon
            className="edit-icon"
            onClick={(e) => {
              e.stopPropagation();
              setEditDropdownOpen(!editDropdownOpen);
            }}
          />
        )}
      </div>
      <img
        onClick={() => {
          dispatch(setSelectedMovie(id));
        }}
        src={`${src}`}
        alt={`${title}`}
      />
      <div className="movie-details">
        <div className="movie-title">{title}</div>
        <div className="release-year">{releaseYear}</div>
      </div>
      <div className="genres">{genre?.join(" & ")}</div>
    </div>
  );
};

export default MovieCard;
