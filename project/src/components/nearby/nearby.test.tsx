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
import Nearby from './nearby';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Nearby', () => {
  it('should render correctly', async () => {
    const nearbyTitle = /Other places in the neighborhood/;
    const maxOffersCount = 3;
    const offers = getFakeOffers();
    const expectedLength = offers.length > maxOffersCount
      ? maxOffersCount
      : offers.length;

    const store = mockStore(INITIAL_STATE);

    const { queryByText } = render(
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <Nearby nearByOffers={offers} loading={false}/>
          </Router>
        </Provider>
      </StrictMode>,
    );

    let elements: unknown[] = [];

    offers.forEach(({title}) => elements.push(queryByText(title)));

    elements = elements.filter((item) => !!item);

    expect(elements.length).toBe(expectedLength);
    expect(queryByText(nearbyTitle)).toBeInTheDocument();
  });
});
