import React, { useCallback } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { Cities } from '../../store/main-page-slice/constants';
import TabsItem from '../tabs-item/tabs-item';

function Tabs(): JSX.Element {
  const [ tab, setTab ] = useQueryParam('tab', StringParam);

  const tabClickHandler = useCallback((cityName: Cities) => {
    setTab(cityName);
  }, [ setTab ]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Object.values(Cities).map((name) => (
              <TabsItem
                key={name}
                name={name}
                active={tab === name}
                onClick={tabClickHandler}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
