import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { getAuthorized } from '../../store/app-slice/app-selector';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element,
};

function PrivateRoute({ children, ...rest } : PrivateRouteProps): JSX.Element {
  const authorized = useAppSelector(getAuthorized);

  return (
    <Route
      {...rest}
      render={({ location: { pathname, search } }) =>
        authorized
          ? children
          : (
            <Redirect
              to={{
                pathname: AppRoute.SignIn,
                state: {
                  from: `${pathname}${search}`,
                },
              }}
            />
          )}
    />
  );
}

export default PrivateRoute;
