import React, { memo, useCallback, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch } from '../../hooks/redux';
import { useLoginLink } from '../../hooks/use-login-link';
import { logout } from '../../store/app-slice/app-thunk';

type UserProps = {
  authorized: boolean,
  email?: string,
  avatarUrl?: string,
};

function User(props: UserProps): JSX.Element {
  const { authorized, email, avatarUrl } = props;
  const dispatch = useAppDispatch();
  const location = useLocation();

  const loginClickHandler = useLoginLink();
  const signOutClickHandler = useCallback((evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logout());
  }, [ dispatch ]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          !authorized && (location.pathname !== AppRoute.SignIn)
            && (
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile"
                  onClick={loginClickHandler}
                  href="/"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </a>
              </li>
            )
        }
        {
          authorized && (
            <>
              <li className="header__nav-item user">
                <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img
                      className="user__avatar"
                      src={avatarUrl}
                      alt="User's avatar"
                      width="20"
                      height="20"
                    />
                  </div>
                  <span className="header__user-name user__name">{email}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <a
                  onClick={signOutClickHandler}
                  className="header__nav-link"
                  href="/"
                >
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  );
}

export default memo(User);
