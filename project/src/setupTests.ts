// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { AuthStatus } from './store/app-slice/constants';
import { Cities, CityLocation } from './store/main-page-slice/constants';
import { SlicesNamespace } from './store/types';
import { getFakeOffers, getFakeUser } from './utils/fake-data';

const OFFERS_COUNT = 30;

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
    offers: getFakeOffers(OFFERS_COUNT),
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
    currentTab: null,
    currentSort: null,
    locationInFocus: CityLocation[Cities.Paris],
    offerInFocusId: '',
  },
};

export {
  INITIAL_STATE
};

