import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../authentication/AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthService.checkAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/invalid" />
      )
    }
  />
);

export default PrivateRoute;
