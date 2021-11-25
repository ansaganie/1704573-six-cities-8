import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { getAuthStatus } from '../../store/app-slice/app-selector';
import { AuthStatus } from '../../store/app-slice/types';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element,
};

function PrivateRoute({ children, ...rest } : PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <Route
      {...rest}
      render={({ location: { pathname, search } }) => authStatus !== AuthStatus.Auth
        ? <Redirect to={{
          pathname: AppRoute.SignIn,
          state: {
            from: `${pathname}${search}`,
          },
        }}/>
        : children}
    />
  );
}

export default PrivateRoute;
