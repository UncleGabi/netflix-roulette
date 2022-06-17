import React, { useCallback, useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import MovieList from "./Components/MovieList/MovieList";
import DetailList from "./Components/Sidebar/Details/DetailList";
import ColorPallette from "./Components/Sidebar/ColorPallette/ColorPallette";
import Footer from "./Components/Footer/Footer";

import PulpFiction from "./Assets/images/pulp-fiction.png";
import BohemianRhapsody from "./Assets/images/bohemian-rhapsody.png";
import KillBill from "./Assets/images/kill-bill.png";
import Avengers from "./Assets/images/avengers.jpg";
import Inception from "./Assets/images/inception.png";
import ReservoirDogs from "./Assets/images/reservoir-dogs.png";

import "./App.scss";
import ErrorBoundary from "./Components/Common/ErrorBoundary/ErrorBoundary";

const movieData = [
  {
    id: 1,
    title: "Pulp fiction",
    src: PulpFiction,
    genre: ["Action", "Adventure"],
    rating: 8.9,
    releaseYear: 2004,
    duration: "2h 34m",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    src: BohemianRhapsody,
    genre: ["Drama", "Biography", "Music"],
    rating: 8.6,
    releaseYear: 2020,
    duration: "2h 14m",
    overview:
      "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).",
  },
  {
    id: 3,
    title: "Kill Bill: Vol 2",
    src: KillBill,
    genre: ["Oscar winning movie"],
    rating: 8.2,
    releaseYear: 1994,
    duration: "2h 17m",
    overview:
      "The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle.",
  },
  {
    id: 4,
    title: "Avengers: War infinity",
    src: Avengers,
    genre: ["Action", "Adventure"],
    rating: 8.8,
    releaseYear: 2004,
    duration: "2h 29m",
    overview:
      "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
  },
  {
    id: 5,
    title: "Inception",
    src: Inception,
    genre: ["Action", "Adventure"],
    rating: 9.0,
    releaseYear: 2010,
    duration: "2h 28m",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  },
  {
    id: 6,
    title: "Reservoir dogs",
    src: ReservoirDogs,
    genre: ["Oscar winning movie"],
    rating: 9.2,
    releaseYear: 1994,
    duration: "1h 39m",
    overview:
      "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
  },
];

function App() {
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
            movieData={movieData}
            setSelectedMovieData={setSelectedMovieData}
          />
        </ErrorBoundary>
        <Footer />
      </div>
      {/* <div className="sidebar">
        <DetailList />
        <ColorPallette />
      </div> */}
    </div>
  );
}

export default App;
