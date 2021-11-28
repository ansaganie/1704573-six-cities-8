import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IOfferState, { NearbyOffersPayloadType } from './types';
import IOffer, { OfferId } from '../../models/IOffer';
import { SlicesNamespace } from '../types';
import { reduceOffers } from '../../utils/offer';

const initialState: IOfferState = {
  offers: {},
  offersLoading: false,
  offerLoading: false,
  disabledBookmarkId: '',
  notFoundOfferId: '',
  nearbyOffers: {},
  nearbyOffersLoading: false,
};

const offerSlice = createSlice({
  name: SlicesNamespace.Offer,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<IOffer[]>) => {
      state.offers = action.payload.reduce(reduceOffers, {});
    },
    addOffer: (state, action: PayloadAction<IOffer>) => {
      state.offers[action.payload.id] = (action.payload);
    },
    addOffers: (state, action: PayloadAction<IOffer[]>) => {
      state.offers = action.payload.reduce(
        reduceOffers,
        { ...state.offers },
      );
    },
    updateIsFavorite: (
      state,
      action: PayloadAction<{offerId: OfferId, status: boolean}>,
    ) => {
      const { offerId, status } = action.payload;
      state.offers[offerId].isFavorite = status;
    },
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.offersLoading = action.payload;
    },
    setOfferLoading: (state, action: PayloadAction<boolean>) => {
      state.offerLoading = action.payload;
    },
    setDisabledBookmarkId: (state, action: PayloadAction<OfferId>) => {
      state.disabledBookmarkId = action.payload;
    },
    setNotFoundOfferId: (state, action: PayloadAction<OfferId>) => {
      state.notFoundOfferId = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<NearbyOffersPayloadType>) => {
      const { offerId, offers } = action.payload;
      state.nearbyOffers[offerId] = offers.map(({ id }) => id);
    },
    setNearbyOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.nearbyOffersLoading = action.payload;
    },
  },
});

const offerReducer = offerSlice.reducer;

export const {
  setOffers,
  addOffer,
  addOffers,
  updateIsFavorite,
  setOffersLoading,
  setOfferLoading,
  setDisabledBookmarkId,
  setNotFoundOfferId,
  setNearbyOffers,
  setNearbyOffersLoading,
} = offerSlice.actions;

export default offerReducer;
