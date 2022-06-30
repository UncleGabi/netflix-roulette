import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterMovies,
  selectAllMovies,
  setMovies,
  sortMovies,
} from "../../features/MoviesSlice";
import axios from "axios";
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
    key: "release_date",
    label: "Release date",
  },
];

function MovieList() {
  const [sortedMovieData, setSortedMovieData] = useState([]);
  const [openModal, setOpenModal] = useState(undefined);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sorting, _setSorting] = useState({ by: "", dir: "" });
  const [activeGenre, setActiveGenre] = useState("All");
  const dispatch = useDispatch();

  const movieData = useSelector(selectAllMovies);

  const fetchMovies = async () => {
    try {
      const movieData = await axios.get("http://localhost:4000/movies");
      const movies = await movieData.data;
      setSortedMovieData(movies.data);
      dispatch(setMovies([...movies.data]));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        dispatch(sortMovies({ by, dir: direction }));
        return { by, dir: direction };
      } else {
        dispatch(sortMovies({ by, dir }));
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
      const unsortedMovieData = sortedMovieData?.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });

      setSortedMovieData(unsortedMovieData);
      setOpenDropdown(false);
    }
  }, [sorting, sortedMovieData]);

  const handleFiltering = (genre) => {
    dispatch(filterMovies(genre));
  };

  const renderGenreFilterList = () => {
    const genres = [
      ...new Set(movieData.movies.map(({ genres }) => genres).flat()),
    ].sort();

    return ["All", ...genres].map((genre) => (
      <li
        key={genre}
        className={`${genre === activeGenre ? "active" : ""}`}
        onClick={() => {
          handleFiltering(genre);
          setActiveGenre(genre);
        }}
      >
        {genre}
      </li>
    ));
  };

  const renderSortingArrow = () => {
    if (sorting.dir) {
      return sorting.dir === "asc" ? (
        <span className="arrow-up" />
      ) : (
        <span className="arrow-down" />
      );
    } else {
      return <></>;
    }
  };

  return (
    <main className="movies__container">
      <div className="movies-header">
        <ul>{renderGenreFilterList()}</ul>
        <div className="movies-handler">
          <div className="sort">Sort by</div>
          <div className="release-date">
            <div onClick={() => setOpenDropdown(!openDropdown)}>
              {sorting.dir
                ? sortingDropdownData.find((item) => item.key === sorting.by)
                    .label
                : "Select"}
              {renderSortingArrow()}
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
                    setSorting({ by: "release_date", dir: "asc" });
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
        <span>{movieData.filteredMovies.length}</span> movies found
      </div>
      <div className="movies-list">
        {movieData.filteredMovies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              src={movie.poster_path}
              genre={movie.genres}
              rating={movie.vote_average}
              releaseYear={new Date(movie.release_date).getFullYear()}
              duration={movie.runtime}
              overview={movie.overview}
              openModal={openModal}
              setOpenModal={setOpenModal}
              movie={movie}
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
