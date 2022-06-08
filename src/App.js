import React from "react";

import Header from "./Components/Header/Header";
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
    releaseYear: 2004,
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    src: BohemianRhapsody,
    genre: ["Drama", "Biography", "Music"],
    releaseYear: 2020,
  },
  {
    id: 3,
    title: "Kill Bill: Vol 2",
    src: KillBill,
    genre: ["Oscar winning movie"],
    releaseYear: 1994,
  },
  {
    id: 4,
    title: "Avengers: War infinity",
    src: Avengers,
    genre: ["Action", "Adventure"],
    releaseYear: 2004,
  },
  {
    id: 5,
    title: "Inception",
    src: Inception,
    genre: ["Action", "Adventure"],
    releaseYear: 2010,
  },
  {
    id: 6,
    title: "Reservoir dogs",
    src: ReservoirDogs,
    genre: ["Oscar winning movie"],
    releaseYear: 1994,
  },
];

function App() {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <ErrorBoundary hasError={false}>
          <MovieList movieData={movieData} />
        </ErrorBoundary>
        <Footer />
      </div>
      <div className="sidebar">
        <DetailList />
        <ColorPallette />
      </div>
    </div>
  );
}

export default App;
