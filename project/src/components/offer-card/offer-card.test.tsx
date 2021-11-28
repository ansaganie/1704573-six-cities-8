import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { Router } from 'react-router';
import { AccommodationType } from '../../constants';
import OfferCard, { OfferCardType } from './offer-card';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const offerIndex = 5;
    const offer = INITIAL_STATE.offer.offers[offerIndex];

    const store = mockStore(INITIAL_STATE);

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
