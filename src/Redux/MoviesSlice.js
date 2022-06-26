import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  filteredMovies: [],
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      return {
        ...state,
        movies: action.payload,
        filteredMovies: action.payload,
      };
    },
    filterMovies: (state, action) => {
      if (action.payload) {
        state.filteredMovies = state.movies.filter(({ genres }) => {
          const lowecaseGenres = genres.map((genre) => genre.toLowerCase());
          return lowecaseGenres.includes(action.payload.toLowerCase());
        });
      } else {
        state.filteredMovies = state.movies;
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
        state.filteredMovies = state.movies;
      }
    },
  },
});

export const selectAllMovies = (state) => state.movies;
export const { setMovies, filterMovies, sortMovies } = MoviesSlice.actions;

export default MoviesSlice.reducer;
