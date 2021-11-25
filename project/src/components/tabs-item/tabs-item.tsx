import React, { memo } from 'react';
import { LINK_CAP } from '../../constants';
import { Cities } from '../../store/main-page-slice/constants';
import combineClasses from '../../utils/combine-class';

type TabsItemProps = {
  name: Cities,
  active: boolean,
  onClick: (cityName: Cities) => void;
}

function TabsItem({ name, active, onClick }: TabsItemProps): JSX.Element {
  const tabClickHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();

    onClick(name);
  };

  return (
    <li className="locations__item">
      <a
        onClick={tabClickHandler}
        className={combineClasses({
          'locations__item-link tabs__item': true,
          'tabs__item--active': active,
        })}
        href={LINK_CAP}
      >
        <span>{name}</span>
      </a>
    </li>
  );
}

export default memo(TabsItem);
