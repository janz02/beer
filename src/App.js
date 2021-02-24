import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { LoginPage } from "./feature/loginPage/LoginPage.js";
import { BeerListPage } from "./feature/beerList/BeerListPage.js";
import { BeerDetailPage } from "./feature/beerDetail/BeerDetailPage.js";
import { PrivateRoute } from "./component/PrivateRoute.js";
import { useAuthUtils } from "./app/useAuthUtils";

function App() {
  const { isLoggedIn } = useAuthUtils();

  const onDefaultRoute = () => {
    if (isLoggedIn) {
      return <Redirect to="/beers" />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/beers" component={BeerListPage} />
          <PrivateRoute path="/beer/:beerId" component={BeerDetailPage} />
          <Route path="*" render={onDefaultRoute} />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}
export const history = createBrowserHistory();
export default App;
