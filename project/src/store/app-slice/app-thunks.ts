import { AuthStatus, BackendRoute } from '../../constants';
import ILoginForm from '../../models/ILoginForm';
import IServerData from '../../models/IServerData';
import { adaptUser } from '../../services/adapter';
import appToast from '../../utils/app-toast';
import { AsyncAction } from '../store';
import { setAuthStatus, setFavoriteOffersLoading, setInitialized, setUser } from './app-slice';

const AUTH_FAIL_MESSAGE = 'Do not forget to sign in';
const LOGIN_FAIL_MESSAGE = 'Please check you enter correct email address';
const LOGOUT_FAIL_MESSAGE = 'Logout failed, please try again later';
const FAVORITES_FAIL = 'Could not get your favorite offers';

const initializeApp = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<IServerData>(BackendRoute.Login);

      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(adaptUser(data)));
    } catch (error) {
      appToast.info(AUTH_FAIL_MESSAGE);
    } finally {
      dispatch(setInitialized());
    }
  };

const login = (loginForm: ILoginForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<IServerData>(BackendRoute.Login, loginForm);

      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUser(adaptUser(data)));
    } catch (error) {
      appToast.error(LOGIN_FAIL_MESSAGE);
    }
  };

const logout = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(BackendRoute.Logout);

      dispatch(setAuthStatus(AuthStatus.NoAuth));
      dispatch(setUser(null));
    } catch (error) {
      appToast.info(LOGOUT_FAIL_MESSAGE);
    }
  };

const fetchFavorites = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setFavoriteOffersLoading(true));

    try {
      await api.get<IServerData>(BackendRoute.Favorite);

    } catch (error) {
      appToast.info(FAVORITES_FAIL);
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
