import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { getFakeReviews } from '../../utils/fake-data';
import Review from './review';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { INITIAL_STATE } from '../../setupTests';
import { OfferId } from '../../models/IOffer';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Review', () => {
  it('should render correctly', async () => {
    const offerId: OfferId = 'offerId97236498';
    const reviews = getFakeReviews();
    const expectedLength = reviews.length;

    INITIAL_STATE.review.reviews[offerId] = reviews;

    render(
      <Provider store={mockStore(INITIAL_STATE)}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Review offerId={offerId}/>
          </QueryParamProvider>
        </Router>
      </Provider>,
    );

    const commentElements = [];
    const userElements = [];
    reviews.forEach(({ comment, user: { name }, date }) => {
      commentElements.push(screen.getByText(comment));
      userElements.push(screen.getByText(name));
    });

    expect(commentElements.length).toBe(expectedLength);
    expect(userElements.length).toBe(expectedLength);
  });
});
