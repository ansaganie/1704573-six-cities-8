import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import logo from '../../assets/logo.svg';

function Logo(): JSX.Element {
  return (
    <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
      <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default Logo;
