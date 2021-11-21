import React, { useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentTab } from '../../store/main-page-slice/main-page-selector';
import { setCurrentSort, setCurrentTab } from '../../store/main-page-slice/main-page-slice';
import { Cities, SortingType } from '../../store/main-page-slice/types';
import Catalog from '../catalog/catalog';
import Header from '../header/header';
import Tabs from '../tabs/tabs';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(getCurrentTab);
  const [tab, setTab] = useQueryParam('tab', StringParam);
  const [ sort, setSort ] = useQueryParam('sort', StringParam);

  useEffect(() => {
    if (tab) {
      dispatch(setCurrentTab(tab as Cities));
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
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          activeTab={activeTab}
          onTabClick={setTab}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <Catalog/>
            <div className="cities__right-section">
              <section className="cities__map map">
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
