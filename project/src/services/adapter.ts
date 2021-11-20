import IServerUser from '../models/IServerUser';
import IUser from '../models/IUser';

const UserMapping: {
  [key: string]: string,
} = {
  'avatar_url': 'avatarUrl',
  email: 'email',
  id: 'id',
  'is_pro': 'IsPro',
  name: 'name',
  token: 'token',
};

const adaptUser = (user: IServerUser): IUser => {
  const result = Object.keys(user)
    .reduce((acc, value) => ({
      ...acc,
      [UserMapping[value]]: user[value],
    }), ({} as IUser));

  result.id = result.id.toString();
  result.isPro = Boolean(result.isPro);

  return result;
};

export { adaptUser };
