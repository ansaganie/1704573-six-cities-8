import IOffer from '../../models/IOffer';
import { SortingType } from '../main-page-slice/types';

const OffersSorter = {
  [SortingType.PriceLowestFirst]: (first: IOffer, second: IOffer): number =>
    first.price - second.price,
  [SortingType.PriceHighestFirst]: (first: IOffer, second: IOffer): number =>
    second.price - first.price,
  [SortingType.TopRated]: (first: IOffer, second: IOffer): number =>
    second.rating - first.rating,
  [SortingType.Popular]: (): number => 0,
};

export { OffersSorter };
