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
import NotFoundScreen from './not-found-screen';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Screen: Offer', () => {
  it('should render correctly', () => {
    const notFoundTitle = /Not Found/;
    const notFoundCode = /404/;
    const notFoundText = /Page you requested was not found/;

    const store = mockStore(INITIAL_STATE);

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundScreen/>
        </Router>
      </Provider>,
    );

    expect(getByText(notFoundTitle)).toBeInTheDocument();
    expect(getByText(notFoundText)).toBeInTheDocument();
    expect(getByText(notFoundCode)).toBeInTheDocument();
  });
});
