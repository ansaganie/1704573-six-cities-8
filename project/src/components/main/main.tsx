import React, { useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentTab } from '../../store/main-page-slice/main-page-selector';
import { setCurrentTab } from '../../store/main-page-slice/main-page-slice';
import { Cities } from '../../types/cities';
import Header from '../header/header';
import Tabs from '../tabs/tabs';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(getCurrentTab);
  const [tab, setTab] = useQueryParam('tab', StringParam);

  useEffect(() => {
    if (tab) {
      dispatch(setCurrentTab(tab as Cities));
    } else {
      setTab(Cities.Paris);
    }
  }, [ dispatch, setTab, tab ]);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          activeTab={activeTab}
          onTabClick={setTab}
        />
      </main>
    </div>
  );
}

export default Main;
