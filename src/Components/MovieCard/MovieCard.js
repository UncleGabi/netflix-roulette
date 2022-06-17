import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./MovieCard.scss";

const MovieCard = ({
  id,
  title,
  src,
  genre,
  rating,
  releaseYear,
  duration,
  overview,
  openModal,
  setOpenModal,
  setSelectedMovieData,
}) => {
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);

  useEffect(() => {
    setEditDropdownOpen(false);
  }, [openModal]);

  return (
    <div key={id} className="movie-card">
      <div className="edit-container">
        {editDropdownOpen ? (
          <div className="edit-dropdown">
            <div
              className="close-btn"
              onClick={() => setEditDropdownOpen(false)}
            >
              +
            </div>
            <div
              onClick={() => setOpenModal("Edit")}
              className="edit-dropdown__data"
            >
              Edit
            </div>
            <div
              onClick={() => setOpenModal("Delete")}
              className="edit-dropdown__data"
            >
              Delete
            </div>
          </div>
        ) : (
          <MoreVertIcon
            className="edit-icon"
            onClick={() => setEditDropdownOpen(!editDropdownOpen)}
          />
        )}
      </div>
      <a href="#header">
        <img
          onClick={() =>
            setSelectedMovieData({
              title,
              src,
              genre,
              rating,
              releaseYear,
              duration,
              overview,
            })
          }
          src={`${src}`}
          alt={`${title}`}
        />
      </a>
      <div className="movie-details">
        <div className="movie-title">{title}</div>
        <div className="release-year">{releaseYear}</div>
      </div>
      <div className="genres">{genre.join(" & ")}</div>
    </div>
  );
};

export default MovieCard;
