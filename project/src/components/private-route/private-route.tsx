import React, { ReactChild } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { getAuthStatus } from '../../store/app-slice/app-selector';
import { AuthStatus } from '../../store/app-slice/types';

type PrivateRouteProps = RouteProps & {
  children: ReactChild
}

function PrivateRoute(props : PrivateRouteProps): JSX.Element | null {
  const { children, ...rest } = props;
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <Route {...rest}>
      {
        authStatus !== AuthStatus.Auth
          ? <Redirect to={{
            pathname: AppRoute.SignIn,
            state: {
              from: rest.path,
            },
          }}/>
          : children
      }
    </Route>
  );
}

export default PrivateRoute;
