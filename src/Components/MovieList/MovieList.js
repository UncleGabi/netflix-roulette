import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Modal from "../Common/Modal/Modal";
import Form from "../Common/Modal/Form/Form";
import MovieCard from "../MovieCard/MovieCard";

import "./MoviesList.scss";

const sortingDropdownData = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "releaseYear",
    label: "Release date",
  },
];

function MovieList({ movieData, setSelectedMovieData }) {
  const [sortedMovieData, setSortedMovieData] = useState(movieData);
  const [openModal, setOpenModal] = useState(undefined);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sorting, _setSorting] = useState({ by: "", dir: "" });

  const setSorting = ({ by, dir }) => {
    let direction = "asc";
    _setSorting((prevState) => {
      if (prevState.by === by) {
        switch (prevState.dir) {
          case "asc":
            direction = "desc";
            break;
          case "desc":
            direction = "";
            break;
          case "":
            direction = "asc";
            break;
          default:
            direction = "";
            break;
        }

        return { by, dir: direction };
      } else {
        return { by, dir };
      }
    });
  };

  useEffect(() => {
    if (sorting.dir.length) {
      const sortMovieData = ({ by, dir }) => {
        const sortedData = sortedMovieData.sort((a, b) => {
          if (a[by] > b[by]) {
            return dir === "asc" ? 1 : -1;
          } else if (a[by] < b[by]) {
            return dir === "asc" ? -1 : 1;
          } else {
            return 0;
          }
        });

        setSortedMovieData(sortedData);
      };

      sortMovieData({ by: sorting.by, dir: sorting.dir });
      setOpenDropdown(false);
    } else {
      const unsortedMovieData = sortedMovieData.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });

      setSortedMovieData(unsortedMovieData);
      setOpenDropdown(false);
    }
  }, [sorting, sortedMovieData, movieData]);

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
              {sorting.dir
                ? sortingDropdownData.find((item) => item.key === sorting.by)
                    .label
                : "Select"}
              <span className="down-arrow" />{" "}
            </div>
            {openDropdown && (
              <div className="sort-dropdown">
                <div
                  onClick={() => {
                    setSorting({ by: "title", dir: "asc" });
                  }}
                >
                  Title
                </div>
                <div
                  onClick={() => {
                    setSorting({ by: "releaseYear", dir: "asc" });
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
              rating={movie.rating}
              releaseYear={movie.releaseYear}
              duration={movie.duration}
              overview={movie.overview}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setSelectedMovieData={setSelectedMovieData}
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
