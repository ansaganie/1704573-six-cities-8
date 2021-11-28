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
import FavoritesList from './favorites-list';
import { CityOffersType } from '../../store/app-slice/types';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Favorites List', () => {
  it('should render correctly', async () => {
    const favoritesTitle = /Saved listing/;
    const offers = getFakeOffers();
    const favoriteOffers = offers
      .reduce((acc, current): CityOffersType => {
        if (acc[current.city.name]) {
          acc[current.city.name].push(current);
        } else {
          acc[current.city.name] = [ current ];
        }

        return acc;
      }, {} as CityOffersType);
    const cityNames = Object.keys(favoriteOffers);

    const expectedLength = offers.length;

    const store = mockStore(INITIAL_STATE);

    const { getByText } = render(
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <FavoritesList offers={favoriteOffers}/>
          </Router>
        </Provider>
      </StrictMode>,
    );

    const offerElements = [];
    const cityElements = [];

    offers.forEach(({ title }) => offerElements.push(getByText(title)));
    cityNames.forEach((city) => cityElements.push(getByText(city)));

    expect(offers.length).toBe(expectedLength);
    expect(cityElements.length).toBe(cityNames.length);
    expect(getByText(favoritesTitle)).toBeInTheDocument();
  });
});
