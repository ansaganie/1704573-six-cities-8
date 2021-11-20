export type UserId = string;

interface IAbstractUser {
  id: UserId;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export default IAbstractUser;
