import IOffer, { OfferId } from '../../models/IOffer';

interface IOfferState {
  offers: IOffer[];
  offersLoading: boolean;
  offerLoading: boolean;
  disabledBookmarkId: OfferId;
}

export default IOfferState;
