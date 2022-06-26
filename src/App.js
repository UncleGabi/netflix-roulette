import React, { useCallback, useState } from "react";

import Header from "./Components/Header/Header";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import MovieList from "./Components/MovieList/MovieList";
import Footer from "./Components/Footer/Footer";
import ErrorBoundary from "./Components/Common/ErrorBoundary/ErrorBoundary";

import "./App.scss";

// Movies props
// id, budget, genres, overview, poster_path, release_date, revenue, runtime, tagline, title, vote_average, vote_count

const App = () => {
  const [selectedMovieData, setSelectedMovieData] = useState({});

  const renderHeader = useCallback(() => {
    if (JSON.stringify(selectedMovieData) === "{}") {
      return <Header />;
    } else {
      return (
        <MovieDetails
          selectedMovieData={selectedMovieData}
          setSelectedMovieData={setSelectedMovieData}
        />
      );
    }
  }, [selectedMovieData]);

  return (
    <div className="app">
      <div className="content">
        {renderHeader()}
        <ErrorBoundary hasError={false}>
          <MovieList
            setSelectedMovieData={setSelectedMovieData}
          />
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
};

export default App;
