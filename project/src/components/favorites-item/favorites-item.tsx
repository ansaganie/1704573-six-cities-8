import React from 'react';
import { AppRoute } from '../../constants';
import IOffer from '../../models/IOffer';
import { MainSearchParam } from '../../store/main-page-slice/constants';
import OfferCard, { OfferCardType } from '../offer-card/offer-card';

type FavoritesItemProps = {
  cityName: string,
  offers: IOffer[],
}

function FavoritesItem({
  cityName,
  offers,
}: FavoritesItemProps): JSX.Element | null {
  if (offers.length === 0) {
    return null;
  }

  const link = `${AppRoute.Main}?${MainSearchParam.Tab}=${cityName}`;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href={link}>
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map(
          (offer) =>(
            <OfferCard
              key={offer.id}
              offer={offer}
              type={OfferCardType.FavoritesPage}
            />
          ),
        )}
      </div>
    </li>
  );
}

export default FavoritesItem;
