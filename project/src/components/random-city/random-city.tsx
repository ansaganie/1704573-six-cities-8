import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router';
import { AppRoute, LINK_CAP } from '../../constants';
import { Cities } from '../../store/main-page-slice/constants';
import { shuffleArray } from '../../utils/common';

const INDEX = 3;

function RandomCity(): JSX.Element {
  const cityName = shuffleArray(Object.values(Cities))[INDEX];
  const history = useHistory();

  const cityClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    history.push(`${AppRoute.Main}?tab=${cityName}`);
  };

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a
          className="locations__item-link"
          href={LINK_CAP}
          onClick={cityClickHandler}
        >
          <span>{cityName}</span>
        </a>
      </div>
    </section>
  );
}

export default RandomCity;
