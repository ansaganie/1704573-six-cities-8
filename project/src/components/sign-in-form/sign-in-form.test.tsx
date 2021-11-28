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
import { INITIAL_STATE } from '../../setupTests';
import { AuthStatus } from '../../store/app-slice/constants';
import { AppRoute } from '../../constants';
import SignInForm from './sign-in-form';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: SignIn Form', () => {
  it('should render correctly', () => {
    const signInText = /Sign in/;
    const signInTextCount = 2;
    const emailPlaceholder = 'Email';
    const passwordPlaceholder = 'Password';

    const state = { ...INITIAL_STATE };
    state.app = {
      ...INITIAL_STATE.app,
    };

    state.app.authStatus = AuthStatus.NoAuth;

    const store = mockStore(state);
    history.push(AppRoute.SignIn);

    const result = render(
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <SignInForm/>
          </QueryParamProvider>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText(signInText).length).toBe(signInTextCount);
    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();

    result.unmount();
  });
});
