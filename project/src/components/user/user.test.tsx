import React from 'react';
import thunk from 'redux-thunk';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import { INITIAL_STATE } from '../../setupTests';
import { createMemoryHistory } from 'history';
import { getFakeUser } from '../../utils/fake-data';
import { render, screen } from '@testing-library/react';
import User from './user';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: User', () => {
  it('should render correctly when authorized = true', () => {
    const STATUS = true;
    const userAvatarsAltText = 'User\'s avatar';
    const signOutText = 'Sign out';
    const USER = getFakeUser();
    const store = mockStore(INITIAL_STATE);
    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <User
              authorized={STATUS}
              avatarUrl={USER.avatarUrl}
              email={USER.email}
            />
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
    const STATUS = false;
    const userAvatarsAltText = 'User\'s avatar';
    const signInText = 'Sign in';
    const store = mockStore(INITIAL_STATE);
    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <User
              authorized={STATUS}
            />
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
