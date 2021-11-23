import React, { useCallback } from 'react';
import classNames from 'classnames';
import { OfferId } from '../../models/IOffer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBookmarkDisabled } from '../../store/offer-slice/offer-selector';
import { changeIsFavorite } from '../../store/offer-slice/offer-thunk';

type BookmarkProps = {
  offerId: OfferId,
  isFavorite: boolean,
}

function Bookmark({ offerId, isFavorite}: BookmarkProps):JSX.Element {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector((state) => getBookmarkDisabled(state, offerId));

  const bookmarkClickHandler = useCallback(
    () => {
      dispatch(changeIsFavorite(offerId, !isFavorite));
    },
    [dispatch, isFavorite, offerId],
  );


  return (
    <button
      className={classNames({
        'place-card__bookmark-button button': true,
        'place-card__bookmark-button--active': isFavorite,
      })}
      type="button"
      disabled={disabled}
      onClick={bookmarkClickHandler}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
