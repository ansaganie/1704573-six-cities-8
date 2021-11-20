import IOffer from '../models/IOffer';
import IUser from '../models/IUser';
import convertKeyToCamelCase from '../utils/convert-keys-to-camel-case';

const adaptUser = (user: IUser): IUser => {
  const result = convertKeyToCamelCase(user);
  result.id = result.id.toString();

  return result as IUser;
};

const adaptOffer = (offer: IOffer): IOffer => {
  const result = convertKeyToCamelCase(offer);
  result.id = result.id.toString();
  result.host = result.host as IUser;

  return result as IOffer;
};

const adaptOffers = (offers: IOffer[]): IOffer[] => offers.map(adaptOffer);

export {
  adaptUser,
  adaptOffer,
  adaptOffers
};
