import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { deepClone, INITIAL_STATE } from '../../setupTests';
import { Route, Router } from 'react-router';
import { AccommodationType, AppRoute } from '../../constants';
import OfferScreen from './offer-screen';
import { getFakeOffer } from '../../utils/fake-data';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Screen: Offer', () => {
  it('should render correctly', () => {
    const state: RootState = deepClone(INITIAL_STATE);
    const offer = getFakeOffer();
    state.offer.offers[offer.id] = offer;

    const store = mockStore(state);
    history.push(AppRoute.getOfferLink(offer.id));

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Offer}>
            <OfferScreen/>
          </Route>
        </Router>
      </Provider>,
    );

    expect(getByText(offer.rating.toFixed(1))).toBeInTheDocument();
    expect(getByText(AccommodationType[offer.type])).toBeInTheDocument();
    expect(getByText(`${offer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(getByText(`Max ${offer.maxAdults} adults`)).toBeInTheDocument();
    expect(getByText(`€${offer.price}`)).toBeInTheDocument();
  });
});
