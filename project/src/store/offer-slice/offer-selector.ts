import { createSelector } from 'reselect';
import IOffer, { OfferId } from '../../models/IOffer';
import { getCurrentSort, getCurrentTab } from '../main-page-slice/main-page-selector';
import { RootState } from '../store';
import { OffersSorter } from './sorting';
import { NearbyOffers } from './types';

const getOfferId = (_state: RootState, offerId: OfferId) => offerId;

const getOffers = (state: RootState): IOffer[] => state.offer.offers;
const getOffersLoading = (state: RootState): boolean => state.offer.offersLoading;
const getOfferLoading = (state: RootState): boolean => state.offer.offerLoading;
const getDisabledBookmarkId = (state: RootState): OfferId => state.offer.disabledBookmarkId;
const getNotFoundOfferId = (state: RootState): OfferId => state.offer.notFoundOfferId;
const getNearbyOffers = (state: RootState): NearbyOffers => state.offer.nearbyOffers;
const getNearbyOffersLoading = (state: RootState): boolean => state.offer.nearbyOffersLoading;

const getFilteredOffers = createSelector(
  getOffers,
  getCurrentTab,
  getCurrentSort,
  (offers, currentTab, currentSort) => {
    const result = offers.filter(({city}) => city.name === currentTab);

    if (currentSort) {
      return result.sort(OffersSorter[currentSort]);
    }

    return result;
  },
);

const getBookmarkDisabled = createSelector(
  [
    getDisabledBookmarkId,
    getOfferId,
  ],
  ( disabledBookmarkId, offerId) => disabledBookmarkId === offerId,
);

const getNearbyOffersById = createSelector(
  [
    getNearbyOffers,
    getOfferId,
  ],
  ( nearByOffers, offerId) => nearByOffers[offerId] || [],
);

export {
  getOffers,
  getOffersLoading,
  getOfferLoading,
  getNotFoundOfferId,
  getNearbyOffers,
  getNearbyOffersLoading,
  getBookmarkDisabled,
  getFilteredOffers,
  getNearbyOffersById
};
