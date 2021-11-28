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
import { SortType } from '../../store/main-page-slice/constants';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import Sorting from './sorting';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const sortingText = 'Sort by';
    const chosenOption = Object.values(SortType)[0];

    const store = mockStore(INITIAL_STATE);

    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Sorting/>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    expect(screen.getByText(sortingText)).toBeInTheDocument();
    expect(screen.getByText(chosenOption)).toBeInTheDocument();
  });
});
