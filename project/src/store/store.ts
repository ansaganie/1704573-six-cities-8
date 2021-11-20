import { AxiosInstance } from 'axios';
import { Action, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import api from '../services/api';
import appReducer from './app-slice/app-slice';
import { SlicesNamespace } from '../constants';
import TokenKeeper from '../services/token';
import offerReducer from './offer-slice/offer-slice';
import reviewReducer from './review-slice/review-slice';

const TOKEN_KEY = 'six-cities-8';

const store = configureStore({
  reducer: {
    [SlicesNamespace.App]: appReducer,
    [SlicesNamespace.Offer]: offerReducer,
    [SlicesNamespace.Review]: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncAction<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>
export type AsyncDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
export const tokenKeeper = new TokenKeeper(localStorage, TOKEN_KEY);

export default store;
