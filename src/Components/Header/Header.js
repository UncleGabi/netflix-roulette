import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addMovie,
  searchMovies,
  selectAllMovies,
  setEditedMoive,
  setMovies,
} from "../../features/MoviesSlice";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Common/Modal/Modal";
import Form from "../Common/Modal/Form/Form";

import "./Header.scss";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { movies, editedMovie } = useSelector(selectAllMovies);

  const handleChange = (e) => {
    setTitle(e.target.value);
    dispatch(searchMovies(e.target.value));
  };

  const handleSearch = () => {
    dispatch(searchMovies(title));
  };

  return (
    <header className="header">
      <div className="header__title">
        <div className="header__title-logo">
          <span>netflix</span>roulette
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
            dispatch(
              setEditedMoive({
                title: "",
                vote_average: 0,
                genres: [],
                release_date: new Date().toLocaleDateString(),
                runtime: 0,
                overview: "",
              })
            );
          }}
        >
          + Add movie
        </button>
      </div>
      <div className="header__search-container">
        <h2>Find your movie</h2>
        <div>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={title}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }

              if (e.key === "Escape") {
                setTitle("");
                dispatch(setMovies(movies));
              }
            }}
            autoFocus
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {openModal && (
        <Modal
          title="Add movie"
          width={900}
          height={750}
          primaryButtonFn={() => {
            dispatch(
              addMovie({
                id: uuidv4(),
                ...editedMovie,
                release_date:
                  editedMovie.release_date || new Date().toLocaleDateString(),
              })
            );
            setOpenModal(undefined);
          }}
          secondaryButtonFn={() => setOpenModal(undefined)}
          setOpenModal={setOpenModal}
        >
          <Form />
        </Modal>
      )}
    </header>
  );
};

export default Header;
