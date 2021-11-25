import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IReviewState from './types';
import { OfferId } from '../../models/IOffer';
import IReview from '../../models/IReview';
import { SlicesNamespace } from '../types';

const initialState: IReviewState = {
  reviews: {},
  reviewsLoading: false,
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
    setReviewsLoading: (state, action: PayloadAction<boolean>) => {
      state.reviewsLoading = action.payload;
    },
  },
});

const reviewReducer = reviewSlice.reducer;

export const {
  setReviews,
  setReviewsLoading,
} = reviewSlice.actions;

export default reviewReducer;
