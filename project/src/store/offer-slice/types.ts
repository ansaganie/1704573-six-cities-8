import IOffer, { OfferId } from '../../models/IOffer';

export type NearbyOffers = {
  [offerId: OfferId]: IOffer[],
}

interface IOfferState {
  offers: IOffer[];
  offersLoading: boolean;
  offerLoading: boolean;
  disabledBookmarkId: OfferId;
  notFoundOfferId: OfferId;
  nearbyOffers: NearbyOffers;
  nearbyOffersLoading: boolean;
}

export default IOfferState;
