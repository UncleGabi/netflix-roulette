import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Modal from "../Common/Modal/Modal";
import Form from "../Common/Modal/Form/Form";
import MovieCard from "../MovieCard/MovieCard";

import "./MoviesList.scss";

function MovieList({ movieData }) {
  const [sortedMovieData, setSortedMovieData] = useState(movieData);
  const [openModal, setOpenModal] = useState(undefined);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sorting, setSorting] = useState({ by: "releaseYear", dir: "asc" });

  useEffect(() => {
    console.log(sorting);
    const sortMovieData = ({ by, dir }) => {
      const test = sortedMovieData.sort((a, b) => {
        let direction = "asc";
        if (direction === dir) {
          switch (dir) {
            case "asc":
              direction = "desc";
              break;
            case "":
              direction = "asc";
              break;
            case "desc":
              direction = "";
              break;
            default:
              break;
          }
        }

        if (a[by] > b[by]) {
          return direction === "asc" ? 1 : -1;
        } else if (a[by] < b[by]) {
          return direction === "asc" ? -1 : 1;
        } else {
          return 0;
        }
      });

      setSortedMovieData(test);
    };

    sortMovieData({ by: sorting.by, dir: sorting.dir });
  }, [sorting]);

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
            <div onClick={() => setOpenDropdown(!openDropdown)}>
              Release date <span className="down-arrow" />{" "}
            </div>
            {openDropdown && (
              <div className="sort-dropdown">
                <div
                  onClick={() => {
                    if (openDropdown) {
                      setSorting({ by: "title", dir: "asc" });
                      setOpenDropdown(false);
                    }
                  }}
                >
                  Title
                </div>
                <div
                  onClick={() => {
                    if (openDropdown) {
                      setSorting({ by: "releaseYear", dir: "asc" });
                      setOpenDropdown(false);
                    }
                  }}
                >
                  Release date
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="movies-found">
        <span>39</span> movies found
      </div>
      <div className="movies-list">
        {sortedMovieData.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              src={movie.src}
              genre={movie.genre}
              releaseYear={movie.releaseYear}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          );
        })}
      </div>
      {openModal === "Edit" && (
        <Modal
          title="Edit"
          width={900}
          height={750}
          primaryButtonLabel="Submit"
          primaryButtonFn={() => undefined}
          secondaryButtonLabel="Reset"
          secondaryButtonFn={() => undefined}
          setOpenModal={setOpenModal}
        >
          <Form />
        </Modal>
      )}
      {openModal === "Delete" && (
        <Modal
          title="Delete"
          primaryButtonLabel="Confirm"
          primaryButtonFn={() => undefined}
          setOpenModal={setOpenModal}
        >
          Are you sure you want to delete this movie?
        </Modal>
      )}
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
