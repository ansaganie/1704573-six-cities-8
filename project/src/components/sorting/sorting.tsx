import React, { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { SortType } from '../../store/main-page-slice/constants';
import combineClasses from '../../utils/combine-class';

function Sorting(): JSX.Element {
  const [ sort, setSort ] = useQueryParam('sort', StringParam);
  const [ isSelectOpen, setIsSelectOpen ] = useState(false);

  const selectClickHandler = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const optionClickHandler = (sortType: SortType) => () => {
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
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul
        className={combineClasses({
          'places__options places__options--custom': true,
          'places__options--opened': isSelectOpen,
        })}
      >
        {
          Object.values(SortType).map((value) => (
            <li
              key={value}
              className={combineClasses({
                'places__option': true,
                'places__option--active': value === sort,
              })}
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
