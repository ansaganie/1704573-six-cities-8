import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { AppRoute } from '../../constants';
import IOffer from '../../models/IOffer';
import combineClasses from '../../utils/combine-class';
import { setLocationInFocus, setOfferInFocusId } from '../../store/main-page-slice/main-page-slice';
import Bookmark from '../bookmark/bookmark';
import Rating, { RatingType } from '../rating/rating';

export enum OfferCardType {
  MainPage = 'main-page',
  OfferPage = 'offer-page',
  FavoritesPage = 'favorites-page',
}

type PosterWidthHeightType = {
  [key: string]: number,
}

const PosterWidth: PosterWidthHeightType = {
  [OfferCardType.MainPage]: 260,
  [OfferCardType.FavoritesPage]: 150,
};

const PosterHeight: PosterWidthHeightType = {
  [OfferCardType.MainPage]: 200,
  [OfferCardType.FavoritesPage]: 110,
};

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
      className={combineClasses({
        'place-card': true,
        'cities__place-card': type === OfferCardType.MainPage,
        'near-places__card': type === OfferCardType.OfferPage,
        'favorites__card': type === OfferCardType.FavoritesPage,
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
      <div
        className={combineClasses({
          'place-card__image-wrapper': true,
          'favorites__image-wrapper': type === OfferCardType.FavoritesPage,
          'cities__image-wrapper': type === OfferCardType.MainPage,
        })}
      >
        <Link to={AppRoute.getOfferLink(id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={PosterWidth[type]}
            height={PosterHeight[type]}
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
          <Rating rating={rating} type={RatingType.OfferCard}/>
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
