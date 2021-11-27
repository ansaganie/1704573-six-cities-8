import { render, screen } from '@testing-library/react';
import { getFakeReviews } from '../../utils/fake-data';
import ReviewList from './review-list';

describe('Component: ReviewList', () => {
  it('should render correctly', async () => {
    const reviews = getFakeReviews();
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
