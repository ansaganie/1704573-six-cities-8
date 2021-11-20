import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IReviewState from './IReviewState';
import { SlicesNamespace } from '../../constants';
import { OfferId } from '../../models/IOffer';
import IReview from '../../models/IReview';

const initialState: IReviewState = {
  reviews: {},
  reviewsLoading: false,
  submittingReview: false,
};

const reviewSlice = createSlice({
  name: SlicesNamespace.Review,
  initialState,
  reducers: {
    setReviews: (
      state,
      action: PayloadAction<{
        offerId: OfferId,
        reviews: IReview[],
      }>,
    ) => {
      const { offerId, reviews } = action.payload;
      state.reviews[offerId] = reviews;
    },
    addReview: (
      state,
      action: PayloadAction<{
        offerId: OfferId,
        review: IReview,
      }>) => {
      const { offerId, review } = action.payload;
      state.reviews[offerId].push(review);
    },
    setReviewsLoading: (state, action: PayloadAction<boolean>) => {
      state.reviewsLoading = action.payload;
    },
    setSubmittingReview: (state, action: PayloadAction<boolean>) => {
      state.submittingReview = action.payload;
    },
  },
});

const reviewReducer = reviewSlice.reducer;

export const {
  setReviews,
  addReview,
  setReviewsLoading,
  setSubmittingReview,
} = reviewSlice.actions;

export default reviewReducer;