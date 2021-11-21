import { createSelector } from 'reselect';
import IOffer from '../../models/IOffer';
import { getCurrentTab } from '../main-page-slice/main-page-selector';
import { RootState } from '../store';

const getOffers = (state: RootState): IOffer[] => state.offer.offers;
const getOffersLoading = (state: RootState): boolean => state.offer.offersLoading;
const getOfferLoading = (state: RootState): boolean => state.offer.offerLoading;
const getFavoriteButtonDisabled = (state: RootState): boolean => state.offer.favoriteButtonDisabled;

const getFilteredOffers = createSelector(
  getOffers,
  getCurrentTab,
  (offers, currentTab) => offers.filter(({city}) => city.name === currentTab ),
);

export {
  getOffers,
  getOffersLoading,
  getOfferLoading,
  getFavoriteButtonDisabled,
  getFilteredOffers
};
