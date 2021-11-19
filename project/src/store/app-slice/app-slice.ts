import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../constants';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';

interface IAppState {
  appStatus: AuthStatus;
  user: IUser | null;
  initialized: boolean;
  serverNotWorking: boolean;
  favoriteOffers: IOffer[];
  favoriteOffersLoading: boolean;
}

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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
    setServerNotWorking: (state) => {
      state.serverNotWorking = true;
    },
  },
});

export const {
  setAuthStatus,
  setUser,
  setInitialized,
  setServerNotWorking,
} = appSlice.actions;

export default appSlice.reducer;
