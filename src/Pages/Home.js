import React from "react";
import Header from "../Components/Header/Header";
import MovieList from "../Components/MovieList/MovieList";
import Footer from "../Components/Footer/Footer";
import ErrorBoundary from "../Components/Common/ErrorBoundary/ErrorBoundary";

function Home() {
  return (
    <div className="content">
      {/* {renderHeader()} */}
      <Header />
      <ErrorBoundary hasError={false}>
        <MovieList />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default Home;
