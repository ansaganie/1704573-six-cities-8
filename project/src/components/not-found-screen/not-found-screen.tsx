import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import Header from '../header/header';

function NotFoundScreen():JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Not Found</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404</b>
                <b className="cities__status">Page you requested was not found</b>
                <p className="cities__status-description">Looks like you got lost. Please go <Link to={AppRoute.Main}>home</Link></p>
              </div>
            </section>
            <div className="cities__right-section"/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
