const state = {
  movies: [],
  filteredMovies: [],
  selectedMovie: {},
  editedMovie: {},
  searchMovieTitle: "",
};

export const testUseAppSelector = (f) => f(state);
