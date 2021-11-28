import { render, screen } from '@testing-library/react';
import { getFakeReviews } from '../../utils/fake-data';
import ReviewList from './review-list';

describe('Component: ReviewList', () => {
  it('should render correctly', async () => {
    const maxCount = 10;
    const count = 15;
    const reviews = getFakeReviews(count)
      .slice(0, maxCount)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    const expectedLength = reviews.length;

    render(
      <ReviewList reviews={reviews}/>,
    );

    const commentElements = [];
    const userElements = [];
    reviews.forEach(({ comment, user: { name }, date }) => {
      commentElements.push(screen.getByText(comment));
      userElements.push(screen.getByText(name));
    });

    expect(commentElements.length).toBe(expectedLength);
    expect(userElements.length).toBe(expectedLength);
  });
});
