import { OfferId } from './models/IOffer';

enum HttpCode {
  Unauthorized = 401,
  ServerErrorMin = 500,
  ServerErrorMax = 599,
}

enum SlicesNamespace {
  App = 'app',
  Offer = 'offer',
  Review = 'review',
}

enum AuthStatus {
  Auth = 'auth',
  NoAuth = 'no-auth',
  Unknown = 'unknown'
}

const AppRoute = {
  Main: '/',
  Favorites: '/favorites',
  SignIn: '/login',
  Offer: '/offer/:offerId',
  getOfferLink: (offerId: OfferId):string =>
    `/offer/${offerId}`,
};

const BackendRoute = {
  Offers: '/hotels',
  Favorite: '/favorite',
  Login: '/login',
  Logout: '/logout',
  getOfferLink: (offerId: OfferId):string =>
    `/hotels/${offerId}`,
  getNearbyOffersLink: (offerId: OfferId):string =>
    `/hotels/${offerId}/nearby`,
  getFavoriteToggleLink: (offerId: OfferId, status: boolean):string =>
    `/favorite/${offerId}/${Number(status)}`,
  getReviewsLink: (offerId: OfferId):string =>
    `/comments/${offerId}`,
};

export {
  HttpCode,
  AppRoute,
  BackendRoute,
  SlicesNamespace,
  AuthStatus
};
