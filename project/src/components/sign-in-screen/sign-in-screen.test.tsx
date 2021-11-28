import React from 'react';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { AuthStatus } from '../../store/app-slice/constants';
import { AppRoute } from '../../constants';
import SignInScreen from './sign-in-screen';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Screen: SignIn', () => {
  it('should render correctly', () => {
    const signInText = 'Sign in';
    const chosenOption = 'Amsterdam';
    const expectedLength = 2;

    const state = { ...INITIAL_STATE };
    state.app = {
      ...INITIAL_STATE.app,
    };

    state.app.authStatus = AuthStatus.NoAuth;

    const store = mockStore(state);
    history.push(AppRoute.SignIn);

    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <SignInScreen/>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    expect(screen.getAllByText(signInText).length).toBe(expectedLength);
    expect(screen.getByText(chosenOption)).toBeInTheDocument();
  });
});
