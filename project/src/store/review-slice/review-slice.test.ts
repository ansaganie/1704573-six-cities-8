import { OfferId } from '../../models/IOffer';
import { deepClone, INITIAL_STATE, unknownAction } from '../../setupTests';
import { getFakeReviews } from '../../utils/fake-data';
import appReducer, {
  setReviews,
  setReviewsLoading
} from './review-slice';
import IReviewState from './types';


const reviewState: IReviewState = deepClone(INITIAL_STATE.review);

describe('Reducer: Review', () => {
  it('should return initial state', () => {
    const expected = { ...reviewState };
    expect(appReducer(reviewState, unknownAction())).toEqual(expected);
  });

  it('should set reviews', () => {
    const offerId: OfferId = 'offerId99238475982';
    const reviews = getFakeReviews();
    const expected = { ...reviewState };
    expected.reviews[offerId] = reviews;

    const payload = { offerId, reviews };

    expect(appReducer(reviewState, setReviews(payload))).toEqual(expected);
  });

  it('should set reviews loading', () => {
    const expected = { ...reviewState };
    expected.reviewsLoading = true;

    expect(appReducer(reviewState, setReviewsLoading(true))).toEqual(expected);
  });
});

