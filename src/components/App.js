import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import PageNotFound from "./PageNotFound";
import Login from "../auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from "../auth/useToken";
// fontawesome
import initFontAwesome from "./common/initFontAwesome";
initFontAwesome();
// API
const apiUrl = process.env.API_URL;

function App() {
  const { token, setToken } = useToken();
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route
          path="/login"
          render={(routeProps) => <Login {...routeProps} setToken={setToken} />}
        />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} position="top-left" />
    </Fragment>
  );
}

export default App;
