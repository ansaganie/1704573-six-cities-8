import { deepClone, INITIAL_STATE, unknownAction } from '../../setupTests';
import appReducer, {
  setOffers,
  addOffer,
  updateIsFavorite,
  setOffersLoading,
  setOfferLoading,
  setDisabledBookmarkId,
  setNotFoundOfferId,
  setNearbyOffers,
  setNearbyOffersLoading
} from './offer-slice';
import IOfferState from './types';
import { getFakeOffer, getFakeOffers } from '../../utils/fake-data';
import { OfferId } from '../../models/IOffer';


const offerState: IOfferState = deepClone(INITIAL_STATE.offer);

describe('Reducer: Offer', () => {
  it('should return initial state', () => {
    const expected = { ...offerState };
    expect(appReducer(offerState, unknownAction())).toEqual(expected);
  });

  it('should set offers', () => {
    const offers = getFakeOffers();
    const expected = { ...offerState };
    expected.offers = offers;

    expect(appReducer(offerState, setOffers(offers))).toEqual(expected);
  });

  it('should add offer', () => {
    const offer = getFakeOffer();
    const expected = { ...offerState };
    expected.offers = [ ...expected.offers, offer ];

    expect(appReducer(offerState, addOffer(offer))).toEqual(expected);
  });

  it('should update isFavorite', () => {
    const offerIndex = 5;
    const initial = {
      offers: getFakeOffers(),
    };
    initial.offers[offerIndex].isFavorite = false;

    const expected = deepClone(initial);
    expected.offers[offerIndex].isFavorite = true;

    const payload = {
      offerId: expected.offers[offerIndex].id,
      status: true,
    };

    expect(appReducer(initial as IOfferState, updateIsFavorite(payload))).toEqual(expected);
  });

  it('should set offers are loading', () => {
    const expected = { ...offerState };
    expected.offersLoading = true;

    expect(appReducer(offerState, setOffersLoading(true))).toEqual(expected);
  });

  it('should set offer is loading', () => {
    const expected = { ...offerState };
    expected.offerLoading = true;

    expect(appReducer(offerState, setOfferLoading(true))).toEqual(expected);
  });

  it('should set disabled bookmark id', () => {
    const offerId = 'offerId3463634';
    const expected = { ...offerState };
    expected.disabledBookmarkId = offerId;

    expect(appReducer(offerState, setDisabledBookmarkId(offerId))).toEqual(expected);
  });

  it('should set not found offer id', () => {
    const offerId = 'offerId3463634';
    const expected = { ...offerState };
    expected.notFoundOfferId = offerId;

    expect(appReducer(offerState, setNotFoundOfferId(offerId))).toEqual(expected);
  });

  it('should set nearby offers', () => {
    const offerId: OfferId = 'offerId3463634';
    const offers = getFakeOffers();
    const expected = { ...offerState };
    expected.nearbyOffers = {};
    expected.nearbyOffers[offerId] = offers;

    const payload = { offerId, offers };

    expect(appReducer(offerState, setNearbyOffers(payload))).toEqual(expected);
  });

  it('should set nearby offers are loading', () => {
    const expected = { ...offerState };
    expected.nearbyOffersLoading = true;

    expect(appReducer(offerState, setNearbyOffersLoading(true))).toEqual(expected);
  });
});
