// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { Action } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { AuthStatus } from './store/app-slice/constants';
import { Cities, CityLocation, SortType } from './store/main-page-slice/constants';
import { SlicesNamespace } from './store/types';
import { getFakeOffers, getFakeUser } from './utils/fake-data';

const OFFERS_COUNT = 30;

const offers = getFakeOffers(OFFERS_COUNT);

const INITIAL_STATE = {
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
    offerInFocusId: offers.find(({ city }) => city.name === Cities.Paris)?.id,
  },
};

const scrollTo = jest.fn();

const unknownAction = (): Action => ({ type: 'UNKNOWN_ACTION'} as Action);

window.scrollTo = scrollTo;

export {
  INITIAL_STATE,
  scrollTo,
  unknownAction
};

