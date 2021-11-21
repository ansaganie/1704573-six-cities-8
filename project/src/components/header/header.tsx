import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getAuthStatus, getUser } from '../../store/app-slice/app-selector';
import { AuthStatus } from '../../store/app-slice/types';
import Logo from '../logo/logo';
import User from '../user/user';

function Header(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const user = useAppSelector(getUser);
  const isAuthorized = !!user && (authStatus === AuthStatus.Auth);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          <User authorized={isAuthorized} email={user?.email}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
