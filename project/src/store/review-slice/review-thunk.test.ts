import { lorem, datatype } from 'faker';
import { api, AsyncDispatch, RootState } from '../../store/store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeReviews } from '../../utils/fake-data';
import { BackendRoute } from '../../constants';
import {
  setReviews,
  setReviewsLoading
} from './review-slice';
import {
  fetchReviews,
  postReview
} from './review-thunk';
import { OfferId } from '../../models/IOffer';
import IReviewForm from '../../models/IReviewForm';
import IReview from '../../models/IReview';

const axios = new MockAdapter(api);

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

describe('Thunk: Review', () => {
  afterEach(() => {
    axios.reset();
    axios.resetHistory();
  });

  it('should fetch reviews and set reviews', async () => {
    const offerId: OfferId = 'offerId2832725982347';
    const reviews = getFakeReviews()
      .map((review) => ({
        ...review,
        date: review.date.toISOString(),
      })) as unknown as IReview[];

    axios.onGet(BackendRoute.getReviewsLink(offerId))
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(fetchReviews(offerId));

    expect(store.getActions()).toEqual([
      setReviewsLoading(true),
      setReviews({ offerId, reviews }),
      setReviewsLoading(false),
    ]);
  });

  it('should post review and update state', async () => {
    const offerId: OfferId = 'offerId2832725982347';
    const form: IReviewForm = {
      comment: lorem.paragraph(),
      rating: datatype.number({
        min: 1,
        max: 5,
        precision: 1,
      }),
    };
    const reviews = getFakeReviews()
      .map((review) => ({
        ...review,
        date: review.date.toISOString(),
      })) as unknown as IReview[];

    axios.onPost(BackendRoute.getReviewsLink(offerId))
      .reply(201, reviews);

    const store = mockStore();

    await store.dispatch(postReview(offerId, form));

    expect(store.getActions()).toEqual([
      setReviews({ offerId, reviews }),
    ]);
  });
});
