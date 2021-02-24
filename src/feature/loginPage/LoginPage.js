import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/authSlice";

import "./LoginPage.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading, hasErrors } = useSelector((state) => state.auth);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const username = e.target[0].value;
      //const pass = e.target[0].value;

      dispatch(login(username));
    },
    [dispatch]
  );

  useEffect(() => {
    if (hasErrors) {
      window.alert("Wrong credentials");
    }
  }, [hasErrors]);

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={(e) => onSubmit(e)}>
        <h1>Login</h1>
        <label>Username</label>
        <input type="email" required={true} />

        <label>Password</label>
        <input type="password" required={true} />

        <input type="submit" value="Login" disabled={isLoading} />
      </form>
    </div>
  );
};
