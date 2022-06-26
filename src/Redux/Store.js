import { configureStore } from "@reduxjs/toolkit";
import MoviesReducer from "./MoviesSlice";

export const store = configureStore({
  reducer: {
    movies: MoviesReducer,
  },
});
