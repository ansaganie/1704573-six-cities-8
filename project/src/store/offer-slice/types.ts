import IOffer, { OfferId } from '../../models/IOffer';

export type NearbyOffers = {
  [offerId: OfferId]: OfferId[],
}

export type OffersById = {
  [offerId: OfferId]: IOffer,
}

export type NearbyOffersPayloadType = {
  offerId: OfferId,
  offers: IOffer[],
}

interface IOfferState {
  offers: OffersById;
  offersLoading: boolean;
  offerLoading: boolean;
  disabledBookmarkId: OfferId;
  notFoundOfferId: OfferId;
  nearbyOffers: NearbyOffers;
  nearbyOffersLoading: boolean;
}

export default IOfferState;
