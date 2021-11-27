import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import thunk from 'redux-thunk';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { AuthStatus } from '../../store/app-slice/constants';
import { AppRoute, BackendRoute } from '../../constants';
import { getFakeOffers, getFakeUser } from '../../utils/fake-data';
import SignInForm from './sign-in-form';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const user = getFakeUser();
const offers = getFakeOffers();

const server = setupServer(
  rest.post(`${BACKEND_URL}${BackendRoute.Login}`, (_req, res, ctx) => res(
    ctx.json(user),
    ctx.status(200),
  )),
  rest.get(`${BACKEND_URL}${BackendRoute.Login}`, (_req, res, ctx) => res(
    ctx.status(401),
  )),
  rest.get(`${BACKEND_URL}${BackendRoute.Offers}`, (_req, res, ctx) => res(
    ctx.json(offers),
    ctx.status(200),
  )),
);

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: SignIn Form', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render correctly', () => {
    const signInText = 'Sign in';
    const emailPlaceholder = 'Email';
    const passwordPlaceholder = 'Password';

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
              <SignInForm/>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    expect(screen.getByText(signInText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
  });

  it('should login  successfully and render main page', async () => {
    const tokenKeyName = 'six-cities-8';
    const mainScreenMessage = 'This is main page';
    const signInText = 'Sign in';
    const emailPlaceholder = 'Email';
    const passwordPlaceholder = 'Password';
    const validPassword = 'aa11';
    const setItemCallCount = 3;
    const setItem =  jest.fn();

    const state = { ...INITIAL_STATE };
    state.app = {
      ...INITIAL_STATE.app,
    };

    state.app.authStatus = AuthStatus.NoAuth;

    const store = mockStore(state);
    history.push(AppRoute.SignIn);
    Storage.prototype.setItem = setItem;

    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Switch>
                <Route exact path={AppRoute.Main}>
                  <span>{mainScreenMessage}</span>
                </Route>
                <Route exact path={AppRoute.SignIn}>
                  <SignInForm/>
                </Route>
              </Switch>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    userEvent.type(
      screen.getByPlaceholderText(emailPlaceholder),
      user.email,
    );
    userEvent.type(
      screen.getByPlaceholderText(passwordPlaceholder),
      validPassword,
    );

    const submitButton = screen.getByText(signInText);

    userEvent.click(submitButton);

    await waitFor(() => screen.getByText(mainScreenMessage));

    expect(screen.getByText(mainScreenMessage)).toBeInTheDocument();
    expect(setItem).toBeCalled();
    expect(setItem).toBeCalledTimes(setItemCallCount);
    expect(setItem).toHaveBeenCalledWith(tokenKeyName, user.token);
  });
});
