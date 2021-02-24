import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PrivateLayout } from "./PrivateLayout.js";
import { useAuthUtils } from "../app/useAuthUtils";

export const PrivateRoute = (props) => {
  const { isLoggedIn } = useAuthUtils();

  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <PrivateLayout>
      <Route {...props} />
    </PrivateLayout>
  );
};
