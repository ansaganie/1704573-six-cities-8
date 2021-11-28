import { createSelector } from 'reselect';
import { OfferId } from '../../models/IOffer';
import IReview from '../../models/IReview';
import { adaptReviews } from '../../services/adapter';
import { RootState } from '../store';
import { ReviewsByOfferId } from './types';

const sortReviewsNewToOld = (first: IReview, second: IReview) =>
  second.date.getTime() - first.date.getTime();

const getReviews = (state: RootState): ReviewsByOfferId => state.review.reviews;
const getReviewsLoading = (state: RootState): boolean => state.review.reviewsLoading;

const getReviewByOfferId = createSelector(
  [
    getReviews,
    (_state: RootState, offerId: OfferId) => offerId,
  ],
  (reviews, offerId) =>
    adaptReviews(reviews[offerId] || []).sort(sortReviewsNewToOld),
);

export {
  getReviewsLoading,
  getReviewByOfferId
};
