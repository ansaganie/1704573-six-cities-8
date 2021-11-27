import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import PrivateRoute from './private-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { Action } from '@reduxjs/toolkit';
import { INITIAL_STATE } from '../../setupTests';
import { AuthStatus } from '../../store/app-slice/constants';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: private route', () => {
  it('should redirect to login page when auth=false', () => {
    const signInPage = 'sign in page';
    const privatePage = 'private page';

    const state: RootState = JSON.parse(JSON.stringify(INITIAL_STATE));
    state.app.authStatus = AuthStatus.NoAuth;
    const store = mockStore(state);
    history.push(AppRoute.Favorites);

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.SignIn}>
              <span>{signInPage}</span>
            </Route>
            <PrivateRoute exact path={AppRoute.Favorites}>
              <span>{privatePage}</span>
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(getByText(signInPage)).toBeInTheDocument();
    expect(queryByText(privatePage)).not.toBeInTheDocument();
  });

  it('should redirect to private page when auth=true', () => {
    const signInPage = 'sign in page';
    const privatePage = 'private page';

    const store = mockStore(INITIAL_STATE);
    history.push(AppRoute.Favorites);

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.SignIn}>
              <span>{signInPage}</span>
            </Route>
            <PrivateRoute exact path={AppRoute.Favorites}>
              <span>{privatePage}</span>
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(getByText(privatePage)).toBeInTheDocument();
    expect(queryByText(signInPage)).not.toBeInTheDocument();
  });
});
