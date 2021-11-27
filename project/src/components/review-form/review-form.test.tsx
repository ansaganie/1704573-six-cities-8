import React from 'react';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { getFakeOffer } from '../../utils/fake-data';
import ReviewForm from './review-form';


const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const reviewTitle = 'Your review';
    const reviewPlaceholder = 'Tell how was your stay, what you like and what can be improved';

    const offer = getFakeOffer();
    const store = mockStore(INITIAL_STATE);

    const markup = (
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <ReviewForm offerId={offer.id}/>
          </QueryParamProvider>
        </Router>
      </Provider>
    );

    render(markup);

    expect(screen.getByText(reviewTitle)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(reviewPlaceholder)).toBeInTheDocument();
  });
});
