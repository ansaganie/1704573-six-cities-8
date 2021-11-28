import { createSelector } from 'reselect';
import { OfferId } from '../../models/IOffer';
import { getCurrentSort, getCurrentTab } from '../main-page-slice/main-page-selector';
import { RootState } from '../store';
import { OffersSorter } from './sorting';
import { NearbyOffers, OffersById } from './types';

const getOfferId = (_state: RootState, offerId: OfferId) => offerId;

const getOffers = (state: RootState): OffersById => state.offer.offers;
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
    const result = Object.values(offers).filter(({city}) =>
      city.name === currentTab);

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
    getOffers,
    getOfferId,
  ],
  ( nearByOffers, offers, offerId) => {
    const ids = nearByOffers[offerId];

    if (!ids || !ids.length) {
      return [];
    }

    return ids.map((id) => offers[id]);
  },
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
