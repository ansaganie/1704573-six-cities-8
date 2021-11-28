import React from 'react';
import { OfferId } from '../../models/IOffer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import combineClasses from '../../utils/combine-classes';
import { getBookmarkDisabled } from '../../store/offer-slice/offer-selector';
import { changeIsFavorite } from '../../store/offer-slice/offer-thunk';
import { getAuthorized } from '../../store/app-slice/app-selector';
import { useLoginRedirect } from '../../hooks/use-login-redirect';

type BookmarkProps = {
  offerId: OfferId,
  isFavorite: boolean,
  big: boolean,
}

function Bookmark({
  offerId,
  isFavorite,
  big,
}: BookmarkProps):JSX.Element {
  const dispatch = useAppDispatch();
  const redirectToLogin = useLoginRedirect();
  const disabled = useAppSelector((state) =>
    getBookmarkDisabled(state, offerId));
  const authorized = useAppSelector(getAuthorized);

  const bookmarkClickHandler = () => {
    if (authorized) {
      dispatch(changeIsFavorite(offerId, !isFavorite));
    } else {
      redirectToLogin();
    }
  };

  return (
    <button
      className={combineClasses({
        'button': true,
        'place-card__bookmark-button': !big,
        'property__bookmark-button': big,
        'bookmark-button--active': isFavorite,
      })}
      type="button"
      disabled={disabled}
      onClick={bookmarkClickHandler}
    >
      <svg
        className={combineClasses({
          'place-card__bookmark-icon': !big,
          'property__bookmark-icon': big,
        })}
        width={big ? '31' : '18'}
        height={big ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
