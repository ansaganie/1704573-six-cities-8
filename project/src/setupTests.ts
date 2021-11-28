// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { AuthStatus } from './store/app-slice/constants';
import { Cities, CityLocation, SortType } from './store/main-page-slice/constants';
import { RootState } from './store/store';
import { SlicesNamespace } from './store/types';
import { getFakeOffers, getFakeUser } from './utils/fake-data';

const OFFERS_COUNT = 30;

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const offers = getFakeOffers(OFFERS_COUNT);
const offer = offers[0];
offer.city.name = Cities.Paris;

const INITIAL_STATE: RootState = {
  [SlicesNamespace.App]: {
    authStatus: AuthStatus.Auth,
    user: getFakeUser(),
    initialized: true,
    serverNotWorking: false,
    favoriteOffers: getFakeOffers(),
    favoriteOffersLoading: false,
  },
  [SlicesNamespace.Offer]: {
    offers: offers,
    offersLoading: false,
    offerLoading: false,
    disabledBookmarkId: '',
    notFoundOfferId: '',
    nearbyOffers: {},
    nearbyOffersLoading: false,
  },
  [SlicesNamespace.Review]: {
    reviews: {},
    reviewsLoading: false,
  },
  [SlicesNamespace.MainPage]: {
    currentTab: Cities.Paris,
    currentSort: SortType.Popular,
    locationInFocus: CityLocation[Cities.Paris],
    offerInFocusId: offer.id,
  },
};

const scrollTo = jest.fn();

const unknownAction = (): AnyAction => ({ type: 'UNKNOWN_ACTION'} as AnyAction);

window.scrollTo = scrollTo;

export {
  INITIAL_STATE,
  scrollTo,
  unknownAction,
  deepClone
};

