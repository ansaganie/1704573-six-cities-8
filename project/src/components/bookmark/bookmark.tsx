import React, { useCallback, MouseEvent } from 'react';
import { OfferId } from '../../models/IOffer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import combineClass from '../../utils/combine-class';
import { getBookmarkDisabled } from '../../store/offer-slice/offer-selector';
import { changeIsFavorite } from '../../store/offer-slice/offer-thunk';
import { getAuthStatus } from '../../store/app-slice/app-selector';
import { useLoginLink } from '../../hooks/use-login-link';
import { AuthStatus } from '../../store/app-slice/types';

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
  const redirectToLogin = useLoginLink();
  const disabled = useAppSelector((state) => getBookmarkDisabled(state, offerId));
  const authStatus = useAppSelector(getAuthStatus);

  const bookmarkClickHandler = useCallback((evt: MouseEvent) => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(changeIsFavorite(offerId, !isFavorite));
    } else {
      redirectToLogin(evt);
    }
  }, [ authStatus, dispatch, isFavorite, offerId, redirectToLogin ]);


  return (
    <button
      className={combineClass({
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
        className={combineClass({
          'place-card__bookmark-icon': !big,
          'property__bookmark-icon': big,
        })}
        width={big ? '31' : '18'}
        height={big ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
