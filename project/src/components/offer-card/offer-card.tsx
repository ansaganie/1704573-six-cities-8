import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { AppRoute } from '../../constants';
import IOffer from '../../models/IOffer';
import combineClass from '../../utils/combine-class';
import { setLocationInFocus, setOfferInFocusId } from '../../store/main-page-slice/main-page-slice';
import Bookmark from '../bookmark/bookmark';
import Rating, { RatingStarsType } from '../rating/rating';

export enum OfferCardType {
  MainPage = 'main-page',
  OfferPage = 'offer-page',
  FavoritesPage = 'favorites-page',
}


type OfferCardProps = {
  offer: IOffer,
  type: OfferCardType,
}

function OfferCard({ offer, type }: OfferCardProps): JSX.Element {
  const {
    id,
    isPremium,
    previewImage,
    title,
    price,
    rating,
    type: roomType,
    location,
    isFavorite,
  } = offer;
  const dispatch = useAppDispatch();

  const mouseOverHandler = () => {
    dispatch(setLocationInFocus(location));
    dispatch(setOfferInFocusId(id));
  };

  return (
    <article
      className={combineClass({
        'place-card': true,
        'cities__place-card': type === OfferCardType.MainPage,
        'near-places__card': type === OfferCardType.OfferPage,
      })}
      onMouseOver={mouseOverHandler}
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.getOfferLink(id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark
            offerId={id}
            isFavorite={isFavorite} big={false}
          />
        </div>
        <div className="place-card__rating rating">
          <Rating rating={rating} type={RatingStarsType.OfferCard}/>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.getOfferLink(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{roomType}</p>
      </div>
    </article>
  );
}

export default OfferCard;
