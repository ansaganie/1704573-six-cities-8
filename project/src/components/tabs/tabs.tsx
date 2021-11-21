import React, { useCallback } from 'react';
import { Cities } from '../../store/main-page-slice/types';
import TabsItem from '../tabs-item/tabs-item';

type TabsPops = {
  activeTab: Cities | null,
  onTabClick: (tab: Cities) => void,
}

function Tabs({ activeTab, onTabClick }: TabsPops): JSX.Element {

  const tabClickHandler = useCallback((cityName: Cities) => {
    onTabClick(cityName);
  }, [onTabClick]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Object.values(Cities).map((name) => (
              <TabsItem
                key={name}
                name={name}
                active={activeTab === name}
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
