import { createSelector } from 'reselect';
import IOffer, { OfferId } from '../../models/IOffer';
import { getCurrentSort, getCurrentTab } from '../main-page-slice/main-page-selector';
import { RootState } from '../store';
import { OffersSorter } from './sorting';

const getOffers = (state: RootState): IOffer[] => state.offer.offers;
const getOffersLoading = (state: RootState): boolean => state.offer.offersLoading;
const getOfferLoading = (state: RootState): boolean => state.offer.offerLoading;
const getDisabledBookmarkId = (state: RootState): OfferId => state.offer.disabledBookmarkId;

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
    (_state: RootState, offerId: OfferId) => offerId,
  ],
  ( disabledBookmarkId, offerId) => disabledBookmarkId === offerId,
);

export {
  getOffers,
  getOffersLoading,
  getOfferLoading,
  getBookmarkDisabled,
  getFilteredOffers
};
