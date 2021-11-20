import IOffer from '../../models/IOffer';
import { RootState } from '../store';

const getOffers = (state: RootState): IOffer[] => state.offer.offers;
const getOffersLoading = (state: RootState): boolean => state.offer.offersLoading;
const getOfferLoading = (state: RootState): boolean => state.offer.offerLoading;
const getFavoriteButtonDisabled = (state: RootState): boolean => state.offer.favoriteButtonDisabled;

export {
  getOffers,
  getOffersLoading,
  getOfferLoading,
  getFavoriteButtonDisabled
};
