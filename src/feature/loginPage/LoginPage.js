import React from "react";
import "./LoginPage.css";

export const LoginPage = () => {
  const onSubmit = () => {
    window.location = "/beers"

    fetch(`https://yesno.wtf/api`, {
      method: "GET",
      credentials: "omit",
      mode: "no-cors",
      referrerPolicy: "no-referrer",
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((resp) => {
        return resp.json();
      })

      .then((data) => {
        if (data.answer === "yes") {
          //set loggedin to true
          window.location = "/beers"
        } else {
          console.error("wrong credentials, please try again");
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={onSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input type="email" required={true} />

        <label>Password</label>
        <input type="password" required={true} />

        <input
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};
