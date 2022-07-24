import React from "react";
import ErrorBoundary from "../Components/Common/ErrorBoundary/ErrorBoundary";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import MovieList from "../Components/MovieList/MovieList";

function SearchGenre() {
  return (
    <div className="content">
      <Header />
      <ErrorBoundary hasError={false}>
        <MovieList />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default SearchGenre;
