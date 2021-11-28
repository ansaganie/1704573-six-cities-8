import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Action, combineReducers, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import appReducer, { setAuthStatus, setServerNotWorking } from './app-slice/app-slice';
import { SlicesNamespace } from './types';
import { AuthStatus } from './app-slice/constants';
import { HttpCode } from '../constants';
import TokenKeeper from '../services/token';
import offerReducer from './offer-slice/offer-slice';
import reviewReducer from './review-slice/review-slice';
import mainPageReducer from './main-page-slice/main-page-slice';

const TOKEN_KEY = 'six-cities-8';
const TOKEN_HEADER_NAME = 'x-token';
const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const TIMEOUT = 5000;

const tokenKeeper = new TokenKeeper(localStorage, TOKEN_KEY);

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
});

const rootReducer = combineReducers({
  [SlicesNamespace.App]: appReducer,
  [SlicesNamespace.Offer]: offerReducer,
  [SlicesNamespace.Review]: reviewReducer,
  [SlicesNamespace.MainPage]: mainPageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

api.interceptors.request.use(
  (request): AxiosRequestConfig => {
    const token = tokenKeeper.getToken();

    if (token) {
      request.headers[TOKEN_HEADER_NAME] = token;
    }

    return request;
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;

    const status = response?.status;

    if (status === HttpCode.Unauthorized) {
      store.dispatch(setAuthStatus(AuthStatus.NoAuth));
    }

    if (
      status
      && status >= HttpCode.ServerErrorMin
      && status <= HttpCode.ServerErrorMax
    ) {
      store.dispatch(setServerNotWorking());
    }

    return Promise.reject(error);
  },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncAction<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>
export type AsyncDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;

export {
  api,
  tokenKeeper,
  rootReducer
};
export default store;
