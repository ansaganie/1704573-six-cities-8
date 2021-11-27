import { OfferId } from './models/IOffer';

const LINK_CAP = '';

enum HttpCode {
  Unauthorized = 401,
  ServerErrorMin = 500,
  ServerErrorMax = 599,
  NotFound = 404,
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

const AccommodationType: {
  [ type: string ]: string,
} = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export {
  LINK_CAP,
  HttpCode,
  AppRoute,
  BackendRoute,
  AccommodationType
};
