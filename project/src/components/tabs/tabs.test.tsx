import React from 'react';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { Cities } from '../../store/main-page-slice/constants';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import Tabs from './tabs';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const store = mockStore(INITIAL_STATE);
    const expectedLength = Object.values(Cities).length;
    const tabQueryName = 'tab';

    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Tabs/>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>
    );

    render(markup);

    const tabs: HTMLElement[] = [];

    Object.values(Cities)
      .forEach(
        (city) => tabs.push(screen.getByText(city)),
      );

    expect(tabs.length).toBe(expectedLength);
    expect(screen.getAllByRole('link').length).toBe(expectedLength);

    userEvent.click(tabs[0]);

    expect(history.location.search).toContain(tabQueryName);
  });
});
