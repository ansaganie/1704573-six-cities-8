import { AxiosError, AxiosResponse } from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import api, { HttpCode } from '../services/api';
import { setAuthStatus, setServerNotWorking } from './app-slice/app-slice';
import { AuthStatus } from '../constants';

const store = configureStore({
  reducer: [],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk.withExtraArgument(api)),
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response?.status === HttpCode.Unauthorized) {
      store.dispatch(setAuthStatus(AuthStatus.NoAuth));
    }

    if (
      response?.status
      && response?.status >= HttpCode.ServerErrorMin
      && response?.status <= HttpCode.ServerErrorMax
    ) {
      store.dispatch(setServerNotWorking());
    }

    return Promise.reject(error);
  },
);

export default store;
