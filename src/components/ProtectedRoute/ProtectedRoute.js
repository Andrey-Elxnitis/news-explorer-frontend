import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {

  React.useEffect(() => {
    if (!props.loggedIn) {
      props.handleEditRegisterClick();
    }
  }, []);

    return (
        <Route>
            {
              () => ( props.loggedIn === true ? (<Component {...props} />) : (<Redirect to="/" />))
            }
        </Route>
    )
};

export default ProtectedRoute;