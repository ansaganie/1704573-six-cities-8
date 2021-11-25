import IOffer from '../../models/IOffer';

export type CityOffersType = {
  [ cityName: string ]: IOffer[],
}
