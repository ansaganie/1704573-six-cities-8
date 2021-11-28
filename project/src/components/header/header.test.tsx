import React from 'react';
import thunk from 'redux-thunk';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import { deepClone, INITIAL_STATE } from '../../setupTests';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../store/app-slice/constants';
import Header from './header';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly when authorized = true', () => {
    const userAvatarsAltText = 'User\'s avatar';
    const signOutText = 'Sign out';
    const store = mockStore(INITIAL_STATE);
    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <Header/>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    expect(screen.getByAltText(userAvatarsAltText))
      .toBeInTheDocument();
    expect(screen.getByText(signOutText))
      .toBeInTheDocument();
  });

  it('should render correctly when authorized = false', () => {
    const userAvatarsAltText = 'User\'s avatar';
    const signInText = 'Sign in';
    const state: RootState = deepClone(INITIAL_STATE);
    state.app.authStatus = AuthStatus.NoAuth;

    const store = mockStore(state);
    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <Header/>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    expect(screen.queryByAltText(userAvatarsAltText))
      .not.toBeInTheDocument();
    expect(screen.getByText(signInText))
      .toBeInTheDocument();
  });
});
