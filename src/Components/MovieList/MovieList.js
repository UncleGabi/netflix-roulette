import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  filterMovies,
  selectAllMovies,
  setMovies,
  sortMovies,
  deleteMovie,
  editMovie,
  setEditedMoive,
  searchMovies,
  setSelectedMovie,
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
  const { filteredMovies, editedMovie } = useSelector(selectAllMovies);
  const [searchParams, setSearchParams] = useSearchParams();
  const allParams = Object.fromEntries(searchParams.entries());
  const navigate = useNavigate();

  const [sortedMovieData, setSortedMovieData] = useState([]);
  const [openModal, setOpenModal] = useState(undefined);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sorting, _setSorting] = useState({ by: "", dir: "" });
  const [activeGenre, setActiveGenre] = useState("All");
  const [movieId, setMovieId] = useState(-1);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    fetchMovies();

    const { pathname } = location;
    if (pathname === "/") {
      navigate("/search");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteSearchParam = (params) => {
    setSearchParams(
      Object.fromEntries(
        Object.entries(allParams).filter(([key]) => !params.includes(key))
      )
    );
  };

  const updateData = () => {
    const params = Object.fromEntries(searchParams.entries());
    Object.entries(params).forEach(([key, value]) => {
      if (key === "title") {
        if (value) {
          dispatch(searchMovies(value));
        } else {
          deleteSearchParam([key]);
          const selectedGenre = searchParams.get("genre") || "All";
          dispatch(filterMovies(selectedGenre));
        }
      }
      if (key === "genre") {
        if (value) {
          setActiveGenre(value);
          dispatch(filterMovies(value));

          if (value === "All") {
            deleteSearchParam([key]);
            setActiveGenre("All");
          }
        }
      }

      const sortBy = searchParams.get("sortBy");
      const sortDir = searchParams.get("sortDir");
      if (sortBy && sortDir) {
        dispatch(sortMovies({ by: sortBy || "", dir: sortDir || "" }));
      } else {
        deleteSearchParam(["sortBy", "sortDir"]);
      }
    });
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    Object.entries(params).forEach(([key, value]) => {
      if (key === "title") {
        if (value) {
          dispatch(searchMovies(value));
        } else {
          deleteSearchParam([key]);
          const selectedGenre = searchParams.get("genre") || "All";
          dispatch(filterMovies(selectedGenre));
        }
      }

      if (key === "genre") {
        if (value) {
          setActiveGenre(value);
          dispatch(filterMovies(value));

          if (value === "All") {
            deleteSearchParam([key]);
            setActiveGenre("All");
          }
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    dispatch(filterMovies(activeGenre));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGenre]);

  const fetchMovies = async () => {
    try {
      const movieData = await axios.get("http://localhost:4000/movies");
      const movies = await movieData.data;
      setSortedMovieData(movies.data);
      dispatch(setMovies([...movies.data]));
      updateData();

      if (location.pathname.includes("movies")) {
        console.log("location", location.pathname);
        const movieId = location.pathname.split("/")[2];
        dispatch(setSelectedMovie(parseInt(movieId)));
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    let currentParams = Object.fromEntries(searchParams.entries());
    const by = searchParams.get("sortBy");
    const dir = searchParams.get("sortDir");
    if (by) {
      setSearchParams({
        ...currentParams,
        sortBy: sorting.by || by,
        sortDir: sorting.dir || dir,
      });
    } else {
      deleteSearchParam(["sortBy", "sortDir"]);
    }

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
      // const unsortedMovieData = sortedMovieData?.sort((a, b) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, sortedMovieData]);

  const renderGenreFilterList = () => {
    const genres = [
      "Drama",
      "Romance",
      "Animation",
      "Adventure",
      "Family",
      "Comedy",
      "Fantasy",
      "Sci-fi",
      "Action",
    ].sort();

    return ["All", ...genres].map((genre) => (
      <li
        key={genre}
        className={`${genre === activeGenre ? "active" : ""}`}
        onClick={() => {
          const currentParams = Object.fromEntries(searchParams.entries());
          setSearchParams({ ...currentParams, genre });
          setActiveGenre(searchParams.get("genre"));
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
        <span>{filteredMovies?.length}</span> movies found
      </div>
      <div className="movies-list">
        {filteredMovies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              src={movie?.poster_path}
              genre={movie.genres}
              rating={movie.vote_average}
              releaseYear={new Date(movie.release_date).getFullYear()}
              duration={movie.runtime}
              overview={movie.overview}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setMovieId={setMovieId}
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
          primaryButtonFn={() => {
            dispatch(editMovie(editedMovie));
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
            setOpenModal(false);
          }}
          secondaryButtonLabel="Reset"
          secondaryButtonFn={() => {
            const emptyEditedMovie = Object.fromEntries(
              Object.entries(editedMovie).map((entry) =>
                entry[0] === "id"
                  ? entry
                  : entry[0] === "release_date"
                  ? [entry[0], new Date().toLocaleDateString()]
                  : [entry[0], ""]
              )
            );
            dispatch(setEditedMoive(emptyEditedMovie));
          }}
          setOpenModal={setOpenModal}
          setMovieId={setMovieId}
        >
          <Form />
        </Modal>
      )}
      {openModal === "Delete" && (
        <Modal
          title="Delete"
          primaryButtonLabel="Confirm"
          primaryButtonFn={() => {
            dispatch(deleteMovie(movieId));
            setMovieId(-1);
            setOpenModal(false);
          }}
          setOpenModal={setOpenModal}
          setMovieId={setMovieId}
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
