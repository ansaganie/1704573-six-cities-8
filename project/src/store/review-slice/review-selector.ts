import { OfferId } from '../../models/IOffer';
import IReview from '../../models/IReview';
import { RootState } from '../store';

const getReviews = (state: RootState): { [key: OfferId]: IReview[] } => state.review.reviews;
const getReviewsLoading = (state: RootState): boolean => state.review.reviewsLoading;
const getSubmittingReview = (state: RootState): boolean => state.review.submittingReview;

export {
  getReviews,
  getReviewsLoading,
  getSubmittingReview
};
