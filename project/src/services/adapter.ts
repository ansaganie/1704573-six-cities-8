import IOffer from '../models/IOffer';
import IReview from '../models/IReview';
import IUser from '../models/IUser';
import { convertKeyToCamelCase } from '../utils/common';

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
