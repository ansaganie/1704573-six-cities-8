import { deepClone, INITIAL_STATE, unknownAction } from '../../setupTests';
import { getFakeOffer, getFakeOffers } from '../../utils/fake-data';
import { AuthStatus } from './constants';
import IAppState from './types';
import appReducer, {
  setAuthStatus,
  setUser,
  setInitialized,
  setServerNotWorking,
  setFavoriteOffers,
  setFavoriteOffersLoading,
  updateFavoriteOffers
} from './app-slice';


const appState: IAppState = deepClone(INITIAL_STATE.app);

describe('Reducer: App', () => {
  it('should return initial state', () => {
    const expected = { ...appState };
    expect(appReducer(appState, unknownAction())).toEqual(expected);
  });

  it('should set auth status', () => {
    const expected = { ...appState };
    expected.authStatus = AuthStatus.NoAuth;

    expect(appReducer(appState, setAuthStatus(AuthStatus.NoAuth))).toEqual(expected);
  });

  it('should set user', () => {
    const expected = { ...appState };
    expected.user = null;

    expect(appReducer(appState, setUser(null))).toEqual(expected);
  });

  it('should set initialized', () => {
    const initial = { ...appState };
    initial.initialized = false;
    const expected = { ...appState };
    expected.initialized = true;

    expect(appReducer(initial, setInitialized())).toEqual(expected);
  });

  it('should set server not working', () => {
    const expected = { ...appState };
    expected.serverNotWorking = true;

    expect(appReducer(appState, setServerNotWorking())).toEqual(expected);
  });

  it('should set favorite offers', () => {
    const offers = getFakeOffers();
    const expected = { ...appState };
    expected.favoriteOfferIds = offers.map(({ id }) => id);

    expect(appReducer(appState, setFavoriteOffers(offers.slice()))).toEqual(expected);
  });

  it('should set favorite offers loading to true', () => {
    const expected = { ...appState };
    expected.favoriteOffersLoading = true;

    expect(appReducer(appState, setFavoriteOffersLoading(true))).toEqual(expected);
  });

  it('should update favorite offers', () => {
    const offer = getFakeOffer();
    const expected = { ...appState };
    expected.favoriteOfferIds = [ ...expected.favoriteOfferIds, offer.id ];

    expect(appReducer(appState, updateFavoriteOffers({
      offerId: offer.id,
      status: true,
    }))).toEqual(expected);
  });
});
