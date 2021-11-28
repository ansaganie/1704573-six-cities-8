import { render, screen } from '@testing-library/react';
import Rating, { RatingType } from './rating';

describe('Component: Rating', () => {
  it('should render correctly', async () => {
    const TEST_ID = 'rating__stars';
    const RATING = 5;

    render(
      <Rating rating={RATING} type={RatingType.OfferCard}/>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should render stars with width 100% when rating=5', async () => {
    const TEST_ID = 'rating__stars';
    const RATING = 5;
    const expectedWidth = '100%';

    render(
      <Rating rating={RATING} type={RatingType.OfferCard}/>,
    );

    expect(screen.getByTestId(TEST_ID).style.width).toBe(expectedWidth);
  });

  it('should render stars with width 0% when rating=0', async () => {
    const TEST_ID = 'rating__stars';
    const RATING = 0;
    const expectedWidth = '0%';

    render(
      <Rating rating={RATING} type={RatingType.OfferCard}/>,
    );

    expect(screen.getByTestId(TEST_ID).style.width).toBe(expectedWidth);
  });

  it('should render stars with width 50% when rating=2.5', async () => {
    const TEST_ID = 'rating__stars';
    const RATING = 2.5;
    const expectedWidth = '50%';

    render(
      <Rating rating={RATING} type={RatingType.OfferCard}/>,
    );

    expect(screen.getByTestId(TEST_ID).style.width).toBe(expectedWidth);
  });
});
