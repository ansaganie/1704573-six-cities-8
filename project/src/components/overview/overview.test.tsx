import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { getFakeOffer } from '../../utils/fake-data';
import { Router } from 'react-router';
import Overview, { AccommodationType } from './overview';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Overview', () => {
  it('should redirect to login page when auth=false', () => {
    const offer = getFakeOffer();

    const store = mockStore(INITIAL_STATE);

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Overview offer={offer}/>
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
