import { AxiosError } from 'axios';
import { AsyncAction, tokenKeeper } from '../store';
import appToast from '../../utils/app-toast';
import ILoginForm from '../../models/ILoginForm';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';
import { BackendRoute } from '../../constants';
import { AuthStatus } from './constants';
import { adaptOffers, adaptUser } from '../../services/adapter';
import {
  setAuthStatus,
  setFavoriteOffers,
  setFavoriteOffersLoading,
  setInitialized,
  setUser
} from './app-slice';
import { addOffers } from '../offer-slice/offer-slice';

const LOGOUT_FAIL_MESSAGE = 'Logout failed, please try again later';
const LOGOUT_SUCCESS_MESSAGE = 'Successfully logged out';
const FAVORITES_FAIL = 'Could not get your favorite offers';

const initializeApp = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<IUser>(BackendRoute.Login);

      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(adaptUser(data)));
      await dispatch(fetchFavorites());
    } finally {
      dispatch(setInitialized());
    }
  };

const login = (loginForm: ILoginForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<IUser>(BackendRoute.Login, loginForm);

      tokenKeeper.setToken(data.token);
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(adaptUser(data)));
      await dispatch(fetchFavorites());

      return Promise.resolve();
    } catch (error) {
      appToast.error((error as AxiosError).message);

      return Promise.reject();
    }
  };

const logout = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(BackendRoute.Logout);

      tokenKeeper.dropToken();
      dispatch(setAuthStatus(AuthStatus.NoAuth));
      dispatch(setUser(null));
      dispatch(setFavoriteOffers([]));

      appToast.success(LOGOUT_SUCCESS_MESSAGE);
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
      const adapted = adaptOffers(data);

      dispatch(addOffers(adapted));
      dispatch(setFavoriteOffers(adapted));
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
