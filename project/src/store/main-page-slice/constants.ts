const CITY_ZOOM = 13;

enum MainSearchParam {
  Tab = 'tab',
  Sort = 'sort',
}

enum Cities {
  Paris = 'Paris',
  Cologne= 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum SortType {
  Popular = 'Popular',
  PriceLowestFirst = 'Price: low to high',
  PriceHighestFirst = 'Price: high to low',
  TopRated = 'Top rated first',
}

const CityLocation = {
  [Cities.Paris]: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: CITY_ZOOM,
  },
  [Cities.Cologne]: {
    latitude: 50.9375,
    longitude: 6.9603,
    zoom: CITY_ZOOM,
  },
  [Cities.Brussels]: {
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: CITY_ZOOM,
  },
  [Cities.Amsterdam]: {
    latitude: 52.3676,
    longitude: 4.9041,
    zoom: CITY_ZOOM,
  },
  [Cities.Hamburg]: {
    latitude: 53.5511,
    longitude: 9.9937,
    zoom: CITY_ZOOM,
  },
  [Cities.Dusseldorf]: {
    latitude: 51.2277,
    longitude: 6.7735,
    zoom: CITY_ZOOM,
  },
};

export {
  Cities,
  SortType,
  CityLocation,
  MainSearchParam
};
