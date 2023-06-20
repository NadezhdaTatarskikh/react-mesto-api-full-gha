import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const Header = ({ loggedIn, headerEmail, onSignOut }) => {
  const location = useLocation();
  const linkText = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const buttonText = loggedIn ? "Выйти" : linkText;

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto" />
      <div className="header__info">
        <Routes>
          <Route
            path="/react-mesto-auth"
            element={
              <Link to="/sign-in" className="header__link-button">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <nav className="header__nav">
                <p className="header__email">{headerEmail}</p>
                <button
                  className="header__link-button header__link-button_type_authorized"
                  onClick={() => onSignOut()}
                >
                  {buttonText}
                </button>
              </nav>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link-button">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link-button">
                Войти
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
};

export default Header;
