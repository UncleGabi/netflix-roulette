import { configureStore } from "@reduxjs/toolkit";
import MoviesReducer from "../features/MoviesSlice";

export const store = configureStore({
  reducer: {
    movies: MoviesReducer,
  },
});
