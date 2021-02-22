import React from "react";
import { history } from "../App.js";
import logo from "../asset/logo.svg";
import "./PrivateLayout.css";

export const PrivateLayout = ({ children }) => {
  const logout = () => {
    //TODO remove loggedin from state
    window.location = "/login";
    history.push("/login");
  };

  const user = "Loggend in user";

  return (
    <div className="layout">
      <header className="header">
        <span>
          <img src={logo} className="logo" alt="application logo" />
          <a href="/beers">Beers</a>
        </span>
        <span>
          <span className="userName">{user}</span>
          <button className="logoutButton" onClick={logout}>Logout</button>
        </span>
      </header>
      <div className="content">{children}</div>
    </div>
  );
};
