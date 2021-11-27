import { render, screen } from '@testing-library/react';
import { formatDate } from '../../utils/date';
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
    const dateElements = [];
    reviews.forEach(({ comment, user: { name }, date }) => {
      commentElements.push(screen.getByText(comment));
      userElements.push(screen.getByText(name));
      dateElements.push(screen.getByText(formatDate(date, 'MMMM YYYY')));
    });

    expect(commentElements.length).toBe(expectedLength);
    expect(userElements.length).toBe(expectedLength);
    expect(dateElements.length).toBe(expectedLength);
  });
});
