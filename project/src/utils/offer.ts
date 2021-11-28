import IOffer from '../models/IOffer';
import { OffersById } from './../store/offer-slice/types';
const MAX_RATING_WIDTH = 100;
const MAX_RATING_VALUE = 5;

const getRatingInPercentage = (rating: number): string =>
  `${((Math.trunc(rating) * MAX_RATING_WIDTH) / MAX_RATING_VALUE)}%`;

const reduceOffers = (acc: OffersById, current: IOffer): OffersById => ({
  ...acc,
  [current.id]: current,
});

export {
  getRatingInPercentage,
  reduceOffers
};
