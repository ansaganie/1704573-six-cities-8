import { AxiosError } from 'axios';
import { AsyncAction, tokenKeeper } from '../store';
import appToast from '../../utils/app-toast';
import ILoginForm from '../../models/ILoginForm';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';
import { BackendRoute } from '../../constants';
import { AuthStatus } from './constants';
import { adaptOffers, adaptUser } from '../../services/adapter';
import { fetchOffers } from '../offer-slice/offer-thunk';
import {
  setAuthStatus,
  setFavoriteOffers,
  setFavoriteOffersLoading,
  setInitialized,
  setUser
} from './app-slice';

const LOGOUT_FAIL_MESSAGE = 'Logout failed, please try again later';
const LOGOUT_SUCCESS_MESSAGE = 'Successfully logged out';
const FAVORITES_FAIL = 'Could not get your favorite offers';

const initializeApp = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<IUser>(BackendRoute.Login);

      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(adaptUser(data)));
    } finally {
      dispatch(setInitialized());
    }
  };

const login = (loginForm: ILoginForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<IUser>(BackendRoute.Login, loginForm);

      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(adaptUser(data)));
      tokenKeeper.setToken(data.token);

      await dispatch(fetchOffers());
      dispatch(setFavoriteOffers([]));
    } catch (error) {
      appToast.error((error as AxiosError).message);
    }
  };

const logout = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(BackendRoute.Logout);

      dispatch(setAuthStatus(AuthStatus.NoAuth));
      dispatch(setUser(null));

      tokenKeeper.dropToken();
      appToast.success(LOGOUT_SUCCESS_MESSAGE);

      await dispatch(fetchOffers());
    } catch (error) {
      appToast.info(LOGOUT_FAIL_MESSAGE);
      appToast.error((error as AxiosError).message);
    }
  };

const fetchFavorites = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setFavoriteOffersLoading(true));

    try {
      const { data } = await api.get<IOffer[]>(BackendRoute.Favorite);

      dispatch(setFavoriteOffers(adaptOffers(data)));
    } catch (error) {
      appToast.info(FAVORITES_FAIL);
      appToast.error((error as AxiosError).message);
    } finally {
      dispatch(setFavoriteOffersLoading(false));
    }
  };

export {
  initializeApp,
  login,
  logout,
  fetchFavorites
};
