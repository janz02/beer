import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PrivateLayout } from "./PrivateLayout.js";

export const PrivateRoute = (props) => {
  const loggedIn = true;

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <PrivateLayout>
      <Route {...props} />
    </PrivateLayout>
  );
};
