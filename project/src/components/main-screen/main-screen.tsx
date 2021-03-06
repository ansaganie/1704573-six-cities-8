import React, { useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import combineClasses from '../../utils/combine-classes';
import { setCurrentSort, setCurrentTab, setLocationInFocus } from '../../store/main-page-slice/main-page-slice';
import { Cities, CityLocation, MainSearchParam, SortType } from '../../store/main-page-slice/constants';
import { getFilteredOffers, getOffersLoading } from '../../store/offer-slice/offer-selector';
import { getLocationInFocus, getOfferInFocusId } from '../../store/main-page-slice/main-page-selector';
import Catalog from '../catalog/catalog';
import Header from '../header/header';
import Map from '../map/map';
import Tabs from '../tabs/tabs';
import ILocation from '../../models/ILocation';
import useTitleUpdate from '../../hooks/use-title-update';

const MAIN_PAGE_TITLE = '6 cities | Find best place to stay in ';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [ tab, setTab ] = useQueryParam(MainSearchParam.Tab, StringParam);
  const [ sort, setSort ] = useQueryParam(MainSearchParam.Sort, StringParam);
  const offers = useAppSelector(getFilteredOffers);
  const offersLoading = useAppSelector(getOffersLoading);
  const offerInFocusId = useAppSelector(getOfferInFocusId);
  const locationInFocus = useAppSelector(getLocationInFocus);
  const nothingToShow = !offers.length && !offersLoading;

  useTitleUpdate(`${MAIN_PAGE_TITLE}${tab}`);

  useEffect(() => {
    if (tab) {
      dispatch(setCurrentTab(tab as Cities));
      dispatch(setLocationInFocus(CityLocation[tab as Cities] as ILocation));
    } else {
      setTab(Cities.Paris);
    }
  }, [ dispatch, setTab, tab ]);

  useEffect(() => {
    if (sort) {
      dispatch(setCurrentSort(sort as SortType));
    } else {
      setSort(SortType.Popular);
    }
  }, [ dispatch, setSort, sort ]);

  return (
    <div
      className={combineClasses({
        'page page--gray page--main': true,
        'page__main--index-empty': nothingToShow,
      })}
    >
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs/>
        <div className="cities">
          <div
            className={combineClasses({
              'cities__places-container--empty': nothingToShow,
              'cities__places-container container': true,
            })}
          >
            {nothingToShow && (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in {tab}
                  </p>
                </div>
              </section>
            )}
            <Catalog/>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={offers}
                  offerInFocusId={offerInFocusId}
                  locationInFocus={locationInFocus}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
