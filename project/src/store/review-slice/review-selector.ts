import { createSelector } from 'reselect';
import { OfferId } from '../../models/IOffer';
import { RootState } from '../store';
import { ReviewsByOfferId } from './types';

const getReviews = (state: RootState): ReviewsByOfferId => state.review.reviews;
const getReviewsLoading = (state: RootState): boolean => state.review.reviewsLoading;
const getSubmittingReview = (state: RootState): boolean => state.review.submittingReview;

const getReviewByOfferId = createSelector(
  [
    getReviews,
    (_state: RootState, offerId: OfferId) => offerId,
  ],
  (reviews, offerId) => reviews[offerId] || [],
);

export {
  getReviewsLoading,
  getSubmittingReview,
  getReviewByOfferId
};
