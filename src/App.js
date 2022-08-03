import React, { useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.scss";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Header from "./Components/Header/Header";

const App = () => {
  // const selectedMovieData = useSelector(selectAllMovies).selectedMovie;

  // const renderHeader = useCallback(() => {
  //   if (JSON.stringify(selectedMovieData) === "{}") {
  //     return <Header />;
  //   } else {
  //     return <MovieDetails />;
  //   }
  // }, [selectedMovieData]);

  return (
    <div className="app">
      {/* <div className="content">
          {renderHeader()}
          <ErrorBoundary hasError={false}>
            <MovieList />
          </ErrorBoundary>
          <Footer />
        </div> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/movies/:movieId" element={<Movies />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
