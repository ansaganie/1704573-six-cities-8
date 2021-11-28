import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getAuthorized, getUser } from '../../store/app-slice/app-selector';
import Logo, { LogoType } from '../logo/logo';
import User from '../user/user';

function Header(): JSX.Element {
  const isAuthorized = useAppSelector(getAuthorized);
  const user = useAppSelector(getUser);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type={LogoType.Header}/>
          </div>
          <User
            authorized={isAuthorized}
            email={user?.email}
            avatarUrl={user?.avatarUrl}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
