import IOffer, { OfferId } from '../../models/IOffer';
import IUser from '../../models/IUser';
import { AuthStatus } from './constants';

interface IAppState {
  authStatus: AuthStatus;
  user: IUser | null;
  initialized: boolean;
  serverNotWorking: boolean;
  favoriteOfferIds: OfferId[];
  favoriteOffersLoading: boolean;
}

export type CityOffersType = {
  [ cityName: string ]: IOffer[],
}

export type Token = string;

export default IAppState;
