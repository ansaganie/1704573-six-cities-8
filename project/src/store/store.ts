import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Action, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import api, { HttpCode } from '../services/api';
import appReducer, { AppActions, setAuthStatus, setServerNotWorking } from './app-slice/app-slice';
import { AuthStatus } from '../constants';
import Token from '../services/token';

const TOKEN_KEY = 'six-cities-8';

const store = configureStore({
  reducer: [ appReducer ],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
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

export type RootAction = AppActions;

export type RootState = ReturnType<typeof store.getState>;
export type AsyncAction<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>
export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
export const token = new Token(localStorage, TOKEN_KEY);

export default store;
