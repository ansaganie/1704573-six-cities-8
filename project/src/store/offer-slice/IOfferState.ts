import IOffer from '../../models/IOffer';

interface IOfferState {
  offers: IOffer[];
  offersLoading: boolean;
  offerLoading: boolean;
  favoriteButtonDisabled: boolean;
}

export default IOfferState;
