import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {

  // если пользователь не залогинился, то защищаем роут "/saved-news"
  function gettoken() {
    if (localStorage.getItem('jwt')) {
      return true;
    } else {
      return false;
    }
  }

  React.useEffect(() => {
    if (!gettoken()) {
      props.handleEditRegisterClick();
    }
  })

    return (
        <Route>
            {
                () => gettoken() ? <Component {...props} /> : <Redirect to="/" />
            }
        </Route>
    )
};

export default ProtectedRoute;