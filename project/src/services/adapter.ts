import IOffer from '../models/IOffer';
import IReview from '../models/IReview';
import IUser from '../models/IUser';

const convertKeyToCamelCase = <T>(obj: T): T => {
  const result: {
    [key: string]: unknown
  } = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        result[key] = convertKeyToCamelCase(obj[key]);

        continue;
      }

      if (key.includes('_')) {
        const words = key.split('_');
        const newKey = words.reduce((acc, value, index) => {
          if (index !== 0) {
            return `${acc}${value[0].toUpperCase()}${value.slice(1)}`;
          }

          return value;
        });

        result[newKey] = obj[key];
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result as unknown as T;
};

const adaptUser = (user: IUser): IUser => {
  const result = convertKeyToCamelCase(user);
  result.id = result.id.toString();

  return result as IUser;
};

const adaptOffer = (offer: IOffer): IOffer => {
  const result = convertKeyToCamelCase(offer);
  result.id = result.id.toString();

  return result as IOffer;
};

const adaptOffers = (offers: IOffer[]): IOffer[] => offers.map(adaptOffer);

const adaptReview = (review: IReview): IReview => {
  const result = convertKeyToCamelCase(review);
  result.id = result.id.toString();
  result.date = new Date(result.date);

  return result as IReview;
};

const adaptReviews = (reviews: IReview[]): IReview[] => reviews.map(adaptReview);

export {
  adaptUser,
  adaptOffer,
  adaptOffers,
  adaptReview,
  adaptReviews
};
