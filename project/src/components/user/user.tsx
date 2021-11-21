import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

type UserProps = {
  authorized: boolean,
  email?: string,
  avatarUrl?: string,
};

function User(props: UserProps): JSX.Element {
  const { authorized, email, avatarUrl } = props;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          authorized
            ? (
              <>
                <li className="header__nav-item user">
                  <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img
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
                  <span className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </span>
                </li>
              </>
            )
            : (
              <li className="header__nav-item user">
                <Link to={AppRoute.SignIn} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </Link>
              </li>
            )
        }
      </ul>
    </nav>
  );
}

export default memo(User);
