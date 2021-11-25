import IOffer from '../../models/IOffer';

enum AuthStatus {
  Auth = 'auth',
  NoAuth = 'no-auth',
  Unknown = 'unknown'
}

export type CityOffersType = {
  [ cityName: string ]: IOffer[],
}

export {
  AuthStatus
};
