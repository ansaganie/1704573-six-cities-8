import React, { memo } from 'react';
import IReview from '../../models/IReview';
import { formatDate } from '../../utils/date';
import Rating, { RatingType } from '../rating/rating';

const MAX_REVIEWS_COUNT = 10;

type ReviewListPops = {
  reviews: IReview[],
}

function ReviewList({ reviews }: ReviewListPops): JSX.Element | null {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <ul className="reviews__list">
      {reviews
        .slice(0, MAX_REVIEWS_COUNT)
        .map(({ id, user, rating, comment, date }) => (
          <li key={id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={user.avatarUrl}
                  width="54"
                  height="54"
                  alt={`Reviews avatar: ${user.name}`}
                />
              </div>
              <span className="reviews__user-name">{user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <Rating rating={rating} type={RatingType.ReviewItem}/>
              </div>
              <p className="reviews__text">{comment}</p>
              <time
                className="reviews__time"
                dateTime={formatDate(date, 'YYYY-MM-DD')}
              >
                {formatDate(date, 'MMMM YYYY')}
              </time>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default memo(ReviewList);
