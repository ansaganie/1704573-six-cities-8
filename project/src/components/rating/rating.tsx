import React from 'react';
import combineClass from '../../utils/combine-class';
import { getRatingInPercentage } from '../../utils/offer';

export enum RatingStarsType {
  OfferCard = 'offer-card',
  ReviewItem = 'review-item',
  OfferPage = 'offer-page',
}

type RatingProps = {
  rating: number,
  type: RatingStarsType,
}

function Rating({ rating, type }: RatingProps): JSX.Element {
  const ratingStyle = {
    width: getRatingInPercentage(rating),
  };

  return (
    <div
      className={combineClass({
        'rating__stars': true,
        'place-card__stars': type === RatingStarsType.OfferCard,
        'reviews__stars': type === RatingStarsType.ReviewItem,
        'property__stars': type === RatingStarsType.OfferPage,
      })}
    >
      <span style={ratingStyle}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default Rating;
