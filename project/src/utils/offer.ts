const MAX_RATING_WIDTH = 100;
const MAX_RATING_VALUE = 5;

const getRatingInPercentage = (rating: number): string =>
  `${((rating * MAX_RATING_WIDTH) / MAX_RATING_VALUE)}%`;

export {
  getRatingInPercentage
};
