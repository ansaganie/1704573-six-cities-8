import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch } from '../../hooks/redux';
import IOffer from '../../models/IOffer';
import { setLocationInFocus, setOfferInFocusId } from '../../store/main-page-slice/main-page-slice';
import { getRatingInPercentage } from '../../utils/offer';
import Bookmark from '../bookmark/bookmark';

type OfferCardProps = {
  offer: IOffer,
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {
    id,
    isPremium,
    previewImage,
    title,
    price,
    rating,
    type,
    location,
    isFavorite,
  } = props.offer;
  const dispatch = useAppDispatch();
  const ratingStyle = {
    width: getRatingInPercentage(rating),
  };

  const mouseOverHandler = () => {
    dispatch(setLocationInFocus(location));
    dispatch(setOfferInFocusId(id));
  };

  return (
    <article
      className="cities__place-card place-card"
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
            isFavorite={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.getOfferLink(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
