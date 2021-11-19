import { Token } from '../types/Token';

export type UserId = string;

interface IUser {
  id: UserId,
  name: string,
  avatarUrl: string,
  isPro: boolean,
  email?: string,
  token?: Token,
}

export default IUser;
