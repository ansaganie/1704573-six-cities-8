import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { getFakeOffers } from '../../utils/fake-data';
import FavoritesItem from './favorites-item';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Favorites Item', () => {
  it('should render correctly', async () => {
    const offers = getFakeOffers();
    const cityName = 'Atyrau';
    const expectedLength = offers.length;

    const store = mockStore(INITIAL_STATE);

    const { getByText } = render(
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <FavoritesItem cityName={cityName} offers={offers}/>
          </Router>
        </Provider>
      </StrictMode>,
    );

    const offerElements = [];
    offers.forEach(({ title }) => offerElements.push(getByText(title)));

    expect(offers.length).toBe(expectedLength);
    expect(getByText(cityName)).toBeInTheDocument();
  });
});
