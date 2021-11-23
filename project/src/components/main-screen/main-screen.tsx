import React, { useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentSort, setCurrentTab, setLocationInFocus } from '../../store/main-page-slice/main-page-slice';
import { Cities, CityLocation, SortingType } from '../../store/main-page-slice/constants';
import Catalog from '../catalog/catalog';
import Header from '../header/header';
import Map from '../map/map';
import Tabs from '../tabs/tabs';
import ILocation from '../../models/ILocation';
import { getFilteredOffers, getOffersLoading } from '../../store/offer-slice/offer-selector';
import classNames from 'classnames';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useQueryParam('tab', StringParam);
  const [ sort, setSort ] = useQueryParam('sort', StringParam);
  const offers = useAppSelector(getFilteredOffers);
  const offersLoading = useAppSelector(getOffersLoading);
  const isNothing = !offers.length && !offersLoading;

  useEffect(() => {
    if (tab) {
      dispatch(setCurrentTab(tab as Cities));
      dispatch(setLocationInFocus(CityLocation[tab as Cities] as ILocation));
    } else {
      setTab(Cities.Paris);
    }
  }, [dispatch, setTab, tab]);

  useEffect(() => {
    if (sort) {
      dispatch(setCurrentSort(sort as SortingType));
    } else {
      setSort(SortingType.Popular);
    }
  }, [dispatch, setSort, sort]);

  return (
    <div
      className={classNames({
        'page page--gray page--main': true,
        'page__main--index-empty': isNothing,
      })}
    >
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs/>
        <div className="cities">
          <div
            className={classNames({
              'cities__places-container--empty': isNothing,
              'cities__places-container container': true,
            })}
          >
            {isNothing && (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
            )}
            <Catalog/>
            <div className="cities__right-section">
              <Map/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
