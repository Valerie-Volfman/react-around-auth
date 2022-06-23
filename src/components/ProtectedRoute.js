import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => loggedIn ? children : <Redirect to="./signin" />
      }
    </Route>
)}

export default ProtectedRoute;