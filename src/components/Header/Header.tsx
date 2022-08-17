import React from 'react';
import './Header.scss';
import '../../styles/container.scss';

export const Header = () => {

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <a href="/">
            <div className="header__logo"></div>
          </a>
          <div className="header__buttons">
            <a href="#users">
              <button className="header__button">Users</button>
            </a>
            <a href="#signUp">
              <button className="header__button">Sign up</button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
