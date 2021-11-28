import React from 'react';
import combineClasses from '../../utils/combine-classes';
import { getRatingInPercentage } from '../../utils/offer';

export enum RatingType {
  OfferCard = 'offer-card',
  ReviewItem = 'review-item',
  OfferPage = 'offer-page',
}

type RatingProps = {
  rating: number,
  type: RatingType,
}

function Rating({ rating, type }: RatingProps): JSX.Element {
  return (
    <div
      className={combineClasses({
        'rating__stars': true,
        'place-card__stars': type === RatingType.OfferCard,
        'reviews__stars': type === RatingType.ReviewItem,
        'property__stars': type === RatingType.OfferPage,
      })}
    >
      <span
        style={{
          width: getRatingInPercentage(rating),
        }}
        data-testid="rating__stars"
      />
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default Rating;
