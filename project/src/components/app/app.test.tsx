import React from 'react';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { deepClone, INITIAL_STATE } from '../../setupTests';
import { Cities } from '../../store/main-page-slice/constants';
import { AuthStatus } from '../../store/app-slice/constants';
import { AppRoute } from '../../constants';
import App from './app';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: App', () => {
  it('should render Main Page', () => {

    const parisOffers = INITIAL_STATE
      .offer
      .offers
      .filter(({ city }) => city.name === Cities.Paris);

    const store = mockStore(INITIAL_STATE);

    const markup = (
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App/>
          </QueryParamProvider>
        </Router>
      </Provider>
    );

    render(markup);

    expect(screen.getByText(parisOffers[0].title)).toBeInTheDocument();
  });

  it('should render Sign In Page', () => {
    const signInText = 'Sign in';
    const chosenOption = 'Amsterdam';
    const expectedLength = 2;

    const state: RootState = deepClone(INITIAL_STATE);
    state.app.authStatus = AuthStatus.NoAuth;
    state.app.user = null;
    const store = mockStore(state);
    history.push(AppRoute.SignIn);

    const markup = (
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App/>
          </QueryParamProvider>
        </Router>
      </Provider>
    );

    render(markup);

    expect(screen.getAllByText(signInText).length).toBe(expectedLength);
    expect(screen.getByText(chosenOption)).toBeInTheDocument();
  });

  it('should render Favorites Page', () => {
    const favoriteOffers = INITIAL_STATE.app.favoriteOffers.slice();
    const offersExpectedLength = favoriteOffers.length;
    const store = mockStore(INITIAL_STATE);
    history.push(AppRoute.Favorites);

    const markup = (
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App/>
          </QueryParamProvider>
        </Router>
      </Provider>
    );

    render(markup);

    const offers = [];

    favoriteOffers.forEach(({ title }) => offers.push(screen.getByText(title)));

    expect(offers.length).toBe(offersExpectedLength);
  });

  it('should render NotFound Page', () => {
    const notFoundTitle = /Not Found/;
    const notFoundCode = /404/;
    const notFoundText = /Page you requested was not found/;
    const store = mockStore(INITIAL_STATE);
    history.push('bla-bla');

    const markup = (
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App/>
          </QueryParamProvider>
        </Router>
      </Provider>
    );

    render(markup);

    expect(screen.getByText(notFoundTitle)).toBeInTheDocument();
    expect(screen.getByText(notFoundText)).toBeInTheDocument();
    expect(screen.getByText(notFoundCode)).toBeInTheDocument();
  });
});
