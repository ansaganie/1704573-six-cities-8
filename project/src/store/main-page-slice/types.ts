enum Cities {
  Paris = 'Paris',
  Cologne= 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum SortingType {
  Popular = 'Popular',
  PriceLowestFirst = 'Price: low to high',
  PriceHighestFirst = 'Price: high to low',
  TopRated = 'Top rated first',
}

const SortingType2 = {
  Popular: {
    index: 0,
    label: 'Popular',
  },
  PriceLowestFirst: {
    index: 0,
    label: 'Price: low to high',
  },
  PriceHighestFirst: {
    index: 0,
    label: 'Price: high to low',
  },
  TopRated: {
    index: 0,
    label: 'Top rated first',
  },
};

export {
  Cities,
  SortingType
};
