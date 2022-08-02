import React from "react";
import MovieDetails from "../Components/MovieDetails/MovieDetails";
import MovieList from "../Components/MovieList/MovieList";
import Footer from "../Components/Footer/Footer";
import ErrorBoundary from "../Components/Common/ErrorBoundary/ErrorBoundary";

function Movies() {
  return (
    <div className="content">
      {/* {renderHeader()} */}
      <MovieDetails />
      <ErrorBoundary hasError={false}>
        <MovieList />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default Movies;
