import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { Action } from 'redux';
import { QueryParamProvider } from 'use-query-params';
import { createMemoryHistory } from 'history';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { Cities } from '../../store/main-page-slice/constants';
import Catalog from './catalog';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Catalog', () => {
  it('should render correctly', async () => {
    const cityName = Cities.Paris;
    const parisOffers = Object.values(INITIAL_STATE.offer.offers)
      .filter(({city}) => city.name === cityName);
    const expectedLength = parisOffers.length;

    const store = mockStore(INITIAL_STATE);

    const { getByText } = render(
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Catalog/>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>,
    );

    const offerElements = [];
    parisOffers.forEach(({ title }) => offerElements.push(getByText(title)));

    expect(parisOffers.length).toBe(expectedLength);
  });
});
