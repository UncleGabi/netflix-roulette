import React from "react";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__title">
        <div className="header__title-logo">
          <span>netflix</span>roulette
        </div>
        <button>+ Add movie</button>
      </div>
      <div className="header__search-container">
        <h2>Find your movie</h2>
        <div>
          <input type="text" placeholder="What do you want to watch?" />
          <button>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
