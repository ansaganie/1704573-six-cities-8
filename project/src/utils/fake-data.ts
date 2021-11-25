import { image, datatype, lorem } from 'faker';
import IAbstractUser from '../models/IAbstractUser';
import ICity from '../models/ICity';
import ILocation from '../models/ILocation';
import IOffer, { NumberStringObject } from '../models/IOffer';
import { Cities } from '../store/main-page-slice/constants';

const FAKE_IMAGES_COUNT = 10;
const FAKE_GOODS_COUNT = 6;
const FAKE_OFFERS_COUNT = 15;
const ROOM_TYPES = [ 'apartment', 'room', 'house', 'hotel' ];

const getRandomElement = <T>(array: T[]): T =>
  array[datatype.number({
    min: 0,
    max: array.length - 1,
  })];


const getFakeImages = (): NumberStringObject => new Array(FAKE_IMAGES_COUNT)
  .fill(null)
  .reduce((acc, _value, index) => ({
    ...acc,
    [index]: image.city(),
  }), {});

const getFakeInsides = (): NumberStringObject => new Array(FAKE_GOODS_COUNT)
  .fill(null)
  .reduce((acc, _value, index) => ({
    ...acc,
    [index]: lorem.sentence(),
  }), {});

const getFakeHost = (): IAbstractUser => ({
  id: datatype.uuid(),
  name: datatype.string(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
});

const getFakeLocation = (): ILocation => ({
  latitude: datatype.float(),
  longitude: datatype.float(),
  zoom: datatype.number(),
});

const getFakeCity = (): ICity => ({
  location: getFakeLocation(),
  name: getRandomElement(Object.values(Cities)),
});

const getFakeOffer = (): IOffer => ({
  id: datatype.uuid(),
  bedrooms: datatype.number(),
  description: datatype.string(),
  goods: getFakeInsides(),
  images: getFakeImages(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  maxAdults: datatype.number(),
  previewImage: image.nature(),
  price: datatype.number(),
  rating: datatype.number(),
  title: lorem.sentence(),
  type: getRandomElement(ROOM_TYPES),
  city: getFakeCity(),
  host: getFakeHost(),
  location: getFakeLocation(),
});

const getFakeOffers = (): IOffer[] => new Array(FAKE_OFFERS_COUNT)
  .fill(null)
  .map(() => getFakeOffer());

export {
  getFakeImages,
  getFakeHost,
  getFakeOffers,
  getFakeInsides,
  getFakeOffer
};
