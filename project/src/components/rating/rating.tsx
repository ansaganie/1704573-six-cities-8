import classNames from 'classnames';
import React from 'react';
import { getRatingInPercentage } from '../../utils/offer';

type RatingProps = {
  rating: number,
  offerCard?: boolean,
  reviewItem?: boolean,
}

function Rating({ rating, offerCard, reviewItem }: RatingProps): JSX.Element {
  const ratingStyle = {
    width: getRatingInPercentage(rating),
  };

  return (
    <div
      className={classNames({
        'place-card__stars': offerCard,
        'rating__stars': true,
        'reviews__stars': reviewItem,
      })}
    >
      <span style={ratingStyle}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default Rating;
