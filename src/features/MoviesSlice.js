import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  filteredMovies: [],
  selectedMovie: {},
  editedMovie: {},
  searchMovieTitle: "",
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchMovieTitle: (state, action) => {
      return { ...state, searchMovieTitle: action.payload };
    },
    setMovies: (state, action) => {
      return {
        ...state,
        movies: action.payload,
        filteredMovies: action.payload,
      };
    },
    searchMovies: (state, { payload }) => {
      state.filteredMovies = state.filteredMovies.filter(({ title }) => {
        return title?.toLowerCase().includes(payload?.toLowerCase());
      });
    },
    filterMovies: (state, action) => {
      const payload = action.payload?.toLowerCase();
      const searchedMovies = state.movies.filter((movie) =>
        movie.title.includes(state.searchMovieTitle)
      );
      if (payload === "all") {
        state.filteredMovies = searchedMovies;
      } else {
        state.filteredMovies = searchedMovies?.filter(({ genres }) => {
          const lowecaseGenres = genres.map((genre) => genre?.toLowerCase());
          return lowecaseGenres.includes(payload);
        });
      }
    },
    sortMovies: (state, { payload }) => {
      if (payload.dir) {
        state.filteredMovies = state.filteredMovies.sort((a, b) => {
          return payload.dir === "asc"
            ? a[payload.by].localeCompare(b[payload.by])
            : -a[payload.by].localeCompare(b[payload.by]);
        });
      } else {
        state.filteredMovies = state.filteredMovies;
      }
    },
    setSelectedMovie: (state, { payload }) => {
      if (payload === -1) {
        state.selectedMovie = {};
      } else {
        state.selectedMovie = state.filteredMovies.find(
          ({ id }) => id === payload
        );
      }
    },
    setEditedMoive: (state, { payload }) => {
      state.editedMovie = payload;
    },
    addMovie: (state, { payload }) => {
      state.movies = [...state.movies, payload];
      state.filteredMovies = [...state.filteredMovies, payload];
    },
    editMovie: (state, { payload }) => {
      state.filteredMovies = state.filteredMovies.map((movie) =>
        movie.id === payload.id ? { ...payload } : movie
      );
    },
    deleteMovie: (state, { payload }) => {
      state.filteredMovies = state.filteredMovies.filter(
        ({ id }) => id !== payload
      );
    },
  },
});

export const selectAllMovies = (state) => state.movies;
export const {
  setSearchMovieTitle,
  setMovies,
  filterMovies,
  sortMovies,
  searchMovies,
  setSelectedMovie,
  setEditedMoive,
  addMovie,
  editMovie,
  deleteMovie,
} = MoviesSlice.actions;

export default MoviesSlice.reducer;
