import { AuthStatus } from './types';
import IOffer from '../../models/IOffer';
import IUser from '../../models/IUser';

interface IAppState {
  authStatus: AuthStatus;
  user: IUser | null;
  initialized: boolean;
  serverNotWorking: boolean;
  favoriteOffers: IOffer[];
  favoriteOffersLoading: boolean;
}

export default IAppState;
