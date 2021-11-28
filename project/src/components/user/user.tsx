import React, { memo, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, LINK_CAP } from '../../constants';
import { useAppDispatch } from '../../hooks/redux';
import { useLoginRedirect } from '../../hooks/use-login-redirect';
import { logout } from '../../store/app-slice/app-thunk';

type UserProps = {
  authorized: boolean,
  email?: string,
  avatarUrl?: string,
};

function User({ authorized, email, avatarUrl }: UserProps): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const redirectToLogin = useLoginRedirect();

  const handleLoginClick = (evt: MouseEvent) => {
    evt.preventDefault();

    redirectToLogin();
  };

  const handleSignOutClick = (evt: MouseEvent) => {
    evt.preventDefault();

    dispatch(logout());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          !authorized && (location.pathname !== AppRoute.SignIn)
            && (
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile"
                  onClick={handleLoginClick}
                  href={LINK_CAP}
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
                <Link
                  to={AppRoute.Favorites}
                  className="header__nav-link header__nav-link--profile"
                >
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
                  onClick={handleSignOutClick}
                  className="header__nav-link"
                  href={LINK_CAP}
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
