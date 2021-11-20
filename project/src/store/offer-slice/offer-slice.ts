import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IOfferState from './IOfferState';
import IOffer, { OfferId } from '../../models/IOffer';
import { SlicesNamespace } from '../../constants';

const initialState: IOfferState = {
  offers: [],
  offersLoading: false,
  offerLoading: false,
  favoriteButtonDisabled: false,
};

const offerSlice = createSlice({
  name: SlicesNamespace.Offer,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<IOffer[]>) => {
      state.offers = action.payload;
    },
    addOffer: (state, action: PayloadAction<IOffer>) => {
      state.offers.push(action.payload);
    },
    updateIsFavorite: (
      state,
      action: PayloadAction<{offerId: OfferId, status: boolean}>,
    ) => {
      const offer = state.offers.find(({id}) => id === action.payload.offerId);
      offer && (offer.isFavorite = action.payload.status);
    },
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.offersLoading = action.payload;
    },
    setOfferLoading: (state, action: PayloadAction<boolean>) => {
      state.offerLoading = action.payload;
    },
    setFavoriteButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.favoriteButtonDisabled = action.payload;
    },
  },
});

const offerReducer = offerSlice.reducer;

export const {
  setOffers,
  addOffer,
  updateIsFavorite,
  setOffersLoading,
  setOfferLoading,
  setFavoriteButtonDisabled,
} = offerSlice.actions;

export default offerReducer;