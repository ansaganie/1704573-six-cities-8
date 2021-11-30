import React from 'react';
import { AccommodationType } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import IOffer from '../../models/IOffer';
import { getIsFavorite } from '../../store/app-slice/app-selector';
import Bookmark from '../bookmark/bookmark';
import Rating, { RatingType } from '../rating/rating';

type OverviewProps = {
  offer: IOffer,
}

function Overview({ offer }: OverviewProps): JSX.Element {
  const {
    id,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
  } = offer;
  const isFavorite = useAppSelector(getIsFavorite(id));

  return (
    <>
      {isPremium && (
        <div className="property__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="property__name-wrapper">
        <h1 className="property__name">{title}</h1>
        <Bookmark offerId={id} isFavorite={isFavorite} big/>
      </div>
      <div className="property__rating rating">
        <Rating rating={rating} type={RatingType.OfferPage}/>
        <span className="property__rating-value rating__value">
          {rating.toFixed(1)}
        </span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {AccommodationType[type]}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
          Max {maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
    </>
  );
}

export default Overview;
