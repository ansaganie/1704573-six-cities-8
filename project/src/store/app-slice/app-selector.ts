import { createSelector } from 'reselect';
import { OfferId } from '../../models/IOffer';
import IUser from '../../models/IUser';
import { getOffers } from '../offer-slice/offer-selector';
import { RootState } from '../store';
import { AuthStatus } from './constants';
import { CityOffersType } from './types';

const getAuthStatus = (state: RootState): AuthStatus => state.app.authStatus;
const getUser = (state: RootState): IUser | null => state.app.user;
const getInitialized = (state: RootState): boolean => state.app.initialized;
const getServerNotWorking = (state: RootState): boolean => state.app.serverNotWorking;
const getFavoriteOfferIds = (state: RootState): OfferId[] => state.app.favoriteOfferIds;
const getFavoriteOffersLoading = (state: RootState): boolean => state.app.favoriteOffersLoading;

const getFavoriteOffers = createSelector(
  getOffers,
  getFavoriteOfferIds,
  (offers, ids) => {
    const favoriteOffers = ids.map((id) => offers[id]);

    return favoriteOffers.reduce((acc, current): CityOffersType => {
      if (acc[current.city.name]) {
        acc[current.city.name].push(current);
      } else {
        acc[current.city.name] = [ current ];
      }

      return acc;
    }, {} as CityOffersType);
  },
);

const getAuthorized = createSelector(
  getAuthStatus,
  (authStatus) => authStatus === AuthStatus.Auth,
);

const getIsFavorite = (offerId: OfferId) => (state: RootState): boolean =>
  state.app.favoriteOfferIds.includes(offerId);

export {
  getUser,
  getInitialized,
  getServerNotWorking,
  getFavoriteOffersLoading,
  getIsFavorite,
  getAuthorized,
  getFavoriteOffers
};
