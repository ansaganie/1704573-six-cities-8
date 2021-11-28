import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { deepClone, INITIAL_STATE } from '../../setupTests';
import { Router } from 'react-router';
import { AccommodationType } from '../../constants';
import OfferCard, { OfferCardType } from './offer-card';
import { getFakeOffer } from '../../utils/fake-data';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const offer = getFakeOffer();

    const state: RootState = deepClone(INITIAL_STATE);
    state.offer.offers[offer.id] = offer;

    const store = mockStore(state);

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Router history={history}>
          <OfferCard offer={offer} type={OfferCardType.FavoritesPage}/>
        </Router>
      </Provider>,
    );

    expect(getByAltText(offer.title)).toBeInTheDocument();
    expect(getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(getByText(offer.title)).toBeInTheDocument();
    expect(getByText(AccommodationType[offer.type])).toBeInTheDocument();
  });
});
