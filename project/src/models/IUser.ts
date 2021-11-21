import { Token } from '../types/token';
import IAbstractUser from './IAbstractUser';

interface IUser extends IAbstractUser {
  email: string;
  token: Token;
}

export default IUser;
