import React, { memo } from 'react';
import { Cities } from '../../types/cities';

const LINK_CAP = '';

type TabsItemProps = {
  name: Cities,
  active: boolean,
  onClick: (cityName: Cities) => void;
}

function TabsItem(props: TabsItemProps): JSX.Element {
  const { name, active, onClick} = props;
  const activeClass = active ? 'tabs__item--active' : '';

  const tabClickHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();

    onClick(name);
  };

  return (
    <li
      className="locations__item"
    >
      <a
        onClick={tabClickHandler}
        className={`locations__item-link tabs__item ${activeClass}`}
        href={LINK_CAP}
      >
        <span>{name}</span>
      </a>
    </li>
  );
}

export default memo(TabsItem);
