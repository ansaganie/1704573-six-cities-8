import { api, AsyncDispatch, RootState } from '../../store/store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers, getFakeUser } from '../../utils/fake-data';
import { BackendRoute } from '../../constants';
import { AuthStatus } from './constants';
import ILoginForm from '../../models/ILoginForm';
import { addOffers, setOffers, setOffersLoading } from '../offer-slice/offer-slice';
import {
  initializeApp,
  login,
  logout,
  fetchFavorites
} from './app-thunk';
import {
  setAuthStatus,
  setFavoriteOffers,
  setFavoriteOffersLoading,
  setInitialized,
  setUser
} from './app-slice';

const axios = new MockAdapter(api);

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

describe('Thunk: AppThunk', () => {
  afterEach(() => {
    axios.reset();
    axios.resetHistory();
  });

  it('should initialize app', async () => {
    const user = getFakeUser();

    axios.onGet(BackendRoute.Login)
      .reply(200, user);

    const store = mockStore();

    await store.dispatch(initializeApp());

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.Auth),
      setUser((user)),
      setInitialized(),
    ]);
  });

  it('should login and set token', async () => {
    const TOKEN_KEY = 'six-cities-8';
    const setItem = jest.fn();
    const user = getFakeUser();
    const offers = getFakeOffers();
    const password = '22aa';
    const formData: ILoginForm = {
      email: user.email,
      password,
    };

    axios.onPost(BackendRoute.Login)
      .reply(200, user);
    axios.onGet(BackendRoute.Offers)
      .reply(200, offers);

    const store = mockStore();
    Storage.prototype.setItem = setItem;

    await store.dispatch(login(formData));

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.Auth),
      setUser((user)),
      setOffersLoading(true),
      setOffers(offers),
      setOffersLoading(false),
      setFavoriteOffers([]),
    ]);

    expect(setItem).toBeCalledTimes(1);
    expect(setItem).toBeCalledWith(TOKEN_KEY, user.token);
  });

  it('should logout and drop token', async () => {
    const TOKEN_KEY = 'six-cities-8';
    const removeItem = jest.fn();
    const offers = getFakeOffers();

    axios.onDelete(BackendRoute.Logout)
      .reply(200);
    axios.onGet(BackendRoute.Offers)
      .reply(200, offers);

    const store = mockStore();
    Storage.prototype.removeItem = removeItem;

    await store.dispatch(logout());

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.NoAuth),
      setUser(null),
      setOffersLoading(true),
      setOffers(offers),
      setOffersLoading(false),
    ]);

    expect(removeItem).toBeCalledTimes(1);
    expect(removeItem).toBeCalledWith(TOKEN_KEY);
  });

  it('should fetch and set favorite offers', async () => {
    const offers = getFakeOffers();
    axios.onGet(BackendRoute.Favorite)
      .reply(200, offers);

    const store = mockStore();

    await store.dispatch(fetchFavorites());

    expect(store.getActions()).toEqual([
      setFavoriteOffersLoading(true),
      addOffers(offers),
      setFavoriteOffers(offers),
      setFavoriteOffersLoading(false),
    ]);
  });
});
