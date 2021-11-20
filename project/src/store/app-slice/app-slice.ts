import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../constants';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';
import IAppState from './IAppState';

const initialState: IAppState = {
  appStatus: AuthStatus.Unknown,
  user: null,
  initialized: false,
  serverNotWorking: false,
  favoriteOffers: [],
  favoriteOffersLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.appStatus = action.payload;
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
} = appSlice.actions;

export type AppActions = typeof appSlice.actions;

export default appSlice.reducer;