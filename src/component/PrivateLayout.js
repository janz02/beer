import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/authSlice";
import logo from "../asset/logo.svg";
import "./PrivateLayout.css";

export const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="layout">
      <header className="header">
        <span>
          <img src={logo} className="logo" alt="application logo" />
          <a href="/beers">Beers</a>
        </span>
        <span>
          <span className="userName">{username}</span>
          <button className="logoutButton" onClick={()=>handleLogout()}>
            Logout
          </button>
        </span>
      </header>
      <div className="content">{children}</div>
    </div>
  );
};
