import { Token } from '../store/app-slice/types';
import IAbstractUser from './IAbstractUser';

interface IUser extends IAbstractUser {
  email: string;
  token: Token;
}

export default IUser;
