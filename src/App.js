import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { LoginPage } from "./feature/loginPage/LoginPage.js";
import { BeerListPage } from "./feature/beerList/BeerListPage.js";
import { BeerDetailPage } from "./feature/beerDetail/BeerDetailPage.js";
import { PrivateRoute } from "./component/PrivateRoute.js";

function App() {
  const onDefaultRoute = () => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    } else {
      return <Redirect to="/beers" />;
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/beers" component={BeerListPage} />
        <PrivateRoute path="/beer/:beerId" component={BeerDetailPage} />
        <Route path="*" render={onDefaultRoute} />
      </Switch>
    </Router>
  );
}

export default App;
