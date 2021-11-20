import { Token } from '../types/Token';

export type UserId = string;

interface IUser {
  id: UserId,
  name: string,
  email?: string,
  token?: Token,
  avatarUrl: string,
  isPro: boolean,
}

export default IUser;
