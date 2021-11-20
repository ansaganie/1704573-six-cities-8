import { AuthStatus } from '../../constants';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';
import { RootState } from '../store';

const getAppStatus = (state: RootState): AuthStatus => state.app.appStatus;
const getUser = (state: RootState): IUser | null => state.app.user;
const getInitialized = (state: RootState): boolean => state.app.initialized;
const getServerNotWorking = (state: RootState): boolean => state.app.serverNotWorking;
const getFavoriteOffers = (state: RootState): IOffer[] => state.app.favoriteOffers;
const getFavoriteOffersLoading = (state: RootState): boolean => state.app.favoriteOffersLoading;

export {
  getAppStatus,
  getUser,
  getInitialized,
  getServerNotWorking,
  getFavoriteOffers,
  getFavoriteOffersLoading
};
