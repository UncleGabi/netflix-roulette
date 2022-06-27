import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import Header from "./Components/Header/Header";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import MovieList from "./Components/MovieList/MovieList";
import Footer from "./Components/Footer/Footer";
import ErrorBoundary from "./Components/Common/ErrorBoundary/ErrorBoundary";

import "./App.scss";
import { selectAllMovies } from "./features/MoviesSlice";

const App = () => {
  const selectedMovieData = useSelector(selectAllMovies).selectedMovie;

  const renderHeader = useCallback(() => {
    if (JSON.stringify(selectedMovieData) === "{}") {
      return <Header />;
    } else {
      return <MovieDetails />;
    }
  }, [selectedMovieData]);

  return (
    <div className="app">
      <div className="content">
        {renderHeader()}
        <ErrorBoundary hasError={false}>
          <MovieList />
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
};

export default App;
