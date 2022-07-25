import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);

// import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// export const PrivateRoute = ({ children }) => {
//   const { authTokens } = useContext(AuthContext);

//   return authTokens ? children : <Redirect to="/login" />;
// };
