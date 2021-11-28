import IOffer from '../../models/IOffer';
import { SortType } from '../main-page-slice/constants';

const OffersSorter = {
  [SortType.PriceLowestFirst]: (first: IOffer, second: IOffer): number =>
    first.price - second.price,
  [SortType.PriceHighestFirst]: (first: IOffer, second: IOffer): number =>
    second.price - first.price,
  [SortType.TopRated]: (first: IOffer, second: IOffer): number =>
    second.rating - first.rating,
  [SortType.Popular]: (): number => 0,
};

export { OffersSorter };
