import React, { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { SortingType } from '../../store/main-page-slice/types';

function Sorting(): JSX.Element {
  const [ sort, setSort ] = useQueryParam('sort', StringParam);
  const [ isSelectOpen, setIsSelectOpen ] = useState(false);

  const selectClickHandler = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const optionClickHandler = (sortType: SortingType) => () => {
    setSort(sortType);
    setIsSelectOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span
        className="places__sorting-caption"
        style={{marginRight: '5px'}}
      >
        Sort by
      </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={selectClickHandler}
      >
        {sort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`
          places__options
          places__options--custom
          ${isSelectOpen ? 'places__options--opened' : ''}
        `}
      >
        {
          Object.values(SortingType).map((value) => (
            <li
              key={value}
              className={`
                places__option
                ${value === sort ? 'places__option--active' : ''}
              `}
              tabIndex={0}
              onClick={optionClickHandler(value)}
            >
              {value}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default Sorting;
