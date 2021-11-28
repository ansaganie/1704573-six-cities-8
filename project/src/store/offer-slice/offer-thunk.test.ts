import { api, AsyncDispatch, RootState } from '../../store/store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffer, getFakeOffers } from '../../utils/fake-data';
import { BackendRoute } from '../../constants';
import {
  addOffer,
  setDisabledBookmarkId,
  setNearbyOffers,
  setNearbyOffersLoading,
  setOfferLoading,
  setOffers,
  setOffersLoading,
  updateIsFavorite
} from './offer-slice';
import {
  changeIsFavorite,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers
} from './offer-thunk';
import { updateFavoriteOffers } from '../app-slice/app-slice';

const axios = new MockAdapter(api);

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

describe('Thunk: Offer', () => {
  afterEach(() => {
    axios.reset();
    axios.resetHistory();
  });

  it('should fetch offers and set offers', async () => {
    const offers = getFakeOffers();

    axios.onGet(BackendRoute.Offers)
      .reply(200, offers);

    const store = mockStore();

    await store.dispatch(fetchOffers());

    expect(store.getActions()).toEqual([
      setOffersLoading(true),
      setOffers(offers),
      setOffersLoading(false),
    ]);
  });

  it('should fetch offer and add offer', async () => {
    const offer = getFakeOffer();

    axios.onGet(BackendRoute.getOfferLink(offer.id))
      .reply(200, offer);

    const store = mockStore();

    await store.dispatch(fetchOffer(offer.id));

    expect(store.getActions()).toEqual([
      setOfferLoading(true),
      addOffer(offer),
      setOfferLoading(false),
    ]);
  });

  it('should change is favorite and update offer', async () => {
    const offer = getFakeOffer();
    const changedOffer = { ...offer };
    changedOffer.isFavorite = !offer.isFavorite;

    axios.onPost(BackendRoute.getFavoriteToggleLink(offer.id, changedOffer.isFavorite))
      .reply(200, changedOffer);

    const store = mockStore();

    await store.dispatch(changeIsFavorite(changedOffer.id, changedOffer.isFavorite));

    expect(store.getActions()).toEqual([
      setDisabledBookmarkId(changedOffer.id),
      updateIsFavorite({
        offerId: changedOffer.id,
        status: changedOffer.isFavorite,
      }),
      updateFavoriteOffers({
        offer: changedOffer,
        status: changedOffer.isFavorite,
      }),
      setDisabledBookmarkId(''),
    ]);
  });

  it('should fetch and set nearby offers', async () => {
    const offerId = 'offerId2239553';
    const offers = getFakeOffers();

    axios.onGet(BackendRoute.getNearbyOffersLink(offerId))
      .reply(200, offers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffers(offerId));

    expect(store.getActions()).toEqual([
      setNearbyOffersLoading(true),
      setNearbyOffers({ offerId, offers }),
      setNearbyOffersLoading(false),
    ]);
  });
});
