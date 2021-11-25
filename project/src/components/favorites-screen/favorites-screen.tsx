import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useTitleUpdate from '../../hooks/use-title-update';
import { getFavoriteOffers, getFavoriteOffersLoading } from '../../store/app-slice/app-selector';
import { fetchFavorites } from '../../store/app-slice/app-thunk';
import combineClasses from '../../utils/combine-class';
import FavoritesList from '../favorites-list/favorites-list';
import Header from '../header/header';
import Logo, { LogoType } from '../logo/logo';
import Spinner from '../spinner/spinner';

const FAVORITES_PAGE_TITLE = '6 cities | Favorite Offers';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const loading = useAppSelector(getFavoriteOffersLoading);

  useTitleUpdate(FAVORITES_PAGE_TITLE);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [ dispatch ]);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section
            className={combineClasses({
              'favorites': true,
              'favorites--empty': !favoriteOffers.length,
            })}
          >
            {loading
              ? <Spinner/>
              : (<FavoritesList offers={favoriteOffers}/>)}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type={LogoType.Footer}/>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
