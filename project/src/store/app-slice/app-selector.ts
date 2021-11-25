import { createSelector } from 'reselect';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';
import { RootState } from '../store';
import { AuthStatus, CityOffersType } from './types';

const getAuthStatus = (state: RootState): AuthStatus => state.app.authStatus;
const getUser = (state: RootState): IUser | null => state.app.user;
const getInitialized = (state: RootState): boolean => state.app.initialized;
const getServerNotWorking = (state: RootState): boolean => state.app.serverNotWorking;
const getFavoriteOffersPlane = (state: RootState): IOffer[] => state.app.favoriteOffers;
const getFavoriteOffersLoading = (state: RootState): boolean => state.app.favoriteOffersLoading;

const getFavoriteOffers = createSelector(
  getFavoriteOffersPlane,
  (offers) => offers.reduce((acc, current): CityOffersType => {
    if (acc[current.city.name]) {
      acc[current.city.name].push(current);
    } else {
      acc[current.city.name] = [ current ];
    }

    return acc;
  }, {} as CityOffersType),
);

export {
  getAuthStatus,
  getUser,
  getInitialized,
  getServerNotWorking,
  getFavoriteOffers,
  getFavoriteOffersLoading
};
