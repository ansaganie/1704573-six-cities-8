import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from './constants';
import IOffer, { OfferId } from '../../models/IOffer';
import IUser from '../../models/IUser';
import IAppState from './types';
import { SlicesNamespace } from '../types';

type UpdatesFavoriteOffersPayload = {
  offerId: OfferId,
  status: boolean,
}

const initialState: IAppState = {
  authStatus: AuthStatus.Unknown,
  user: null,
  initialized: false,
  serverNotWorking: false,
  favoriteOfferIds: [],
  favoriteOffersLoading: false,
};

const appSlice = createSlice({
  name: SlicesNamespace.App,
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
    setServerNotWorking: (state) => {
      state.serverNotWorking = true;
    },
    setFavoriteOffers: (state, action: PayloadAction<IOffer[]>) => {
      state.favoriteOfferIds = action.payload.map(({ id }) => id);
    },
    updateFavoriteOffers: (state, action: PayloadAction<UpdatesFavoriteOffersPayload>) => {
      const { offerId, status } = action.payload;

      if (status) {
        state.favoriteOfferIds.push(offerId);
      } else {
        state.favoriteOfferIds = state.favoriteOfferIds.filter((id) => id !== offerId);
      }
    },
    setFavoriteOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.favoriteOffersLoading = action.payload;
    },
  },
});

export const {
  setAuthStatus,
  setUser,
  setInitialized,
  setServerNotWorking,
  setFavoriteOffers,
  setFavoriteOffersLoading,
  updateFavoriteOffers,
} = appSlice.actions;

export type AppActions = typeof appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;
