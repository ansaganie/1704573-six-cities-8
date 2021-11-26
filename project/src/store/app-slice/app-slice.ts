import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from './constants';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';
import IAppState from './types';
import { SlicesNamespace } from '../types';

type UpdatesFavoriteOffersPayload = {
  offer: IOffer,
  status: boolean,
}

const initialState: IAppState = {
  authStatus: AuthStatus.Unknown,
  user: null,
  initialized: false,
  serverNotWorking: false,
  favoriteOffers: [],
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
      state.favoriteOffers = action.payload;
    },
    updateFavoriteOffers: (state, action: PayloadAction<UpdatesFavoriteOffersPayload>) => {
      const { offer, status } = action.payload;

      if (status) {
        state.favoriteOffers.push(offer);
      } else {
        state.favoriteOffers = state.favoriteOffers.filter(({id}) => id !== offer.id);
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

export default appSlice.reducer;
