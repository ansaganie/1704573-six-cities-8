import React from 'react';
import { CityOffersType } from '../../store/app-slice/types';
import FavoritesItem from '../favorites-item/favorites-item';

type FavoritesListProps = {
  offers: CityOffersType,
}

function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  if (Object.keys(offers).length === 0) {
    return (
      <>
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(offers).map(([ name, array ]) => (
          <FavoritesItem key={name} cityName={name} offers={array}/>
        ))}
      </ul>
    </>
  );
}

export default FavoritesList;
