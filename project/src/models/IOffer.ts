import IAbstractUser from './IAbstractUser';
import ICity from './ICity';
import ILocation from './ILocation';

export type OfferId = string;
export type NumberStringObject = { [key: number]: string };

interface IOffer {
  id: OfferId;
  bedrooms: number;
  description: string;
  goods: NumberStringObject;
  images: NumberStringObject;
  isFavorite: boolean;
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  city: ICity;
  host: IAbstractUser;
  location: ILocation;
}

export default IOffer;
