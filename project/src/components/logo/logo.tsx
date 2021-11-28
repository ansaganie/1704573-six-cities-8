import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import logo from '../../assets/logo.svg';
import combineClasses from '../../utils/combine-classes';

export enum LogoType {
  Header = 'header',
  Footer = 'footer',
}

type LogoWidthHeightType = {
  [key: string]: number,
}

const LogoWidth: LogoWidthHeightType = {
  [LogoType.Header]: 81,
  [LogoType.Footer]: 64,
};

const LogoHeight: LogoWidthHeightType = {
  [LogoType.Header]: 41,
  [LogoType.Footer]: 33,
};

type LogoProps = {
  type: LogoType,
}

function Logo({ type }: LogoProps): JSX.Element {
  return (
    <Link
      to={AppRoute.Main}
      className={combineClasses({
        'header__logo-link header__logo-link--active':
          type === LogoType.Header,
        'footer__logo-link': type === LogoType.Footer,
      })}
    >
      <img
        className={combineClasses({
          'header__logo': type === LogoType.Header,
          'footer__logo': type === LogoType.Footer,
        })}
        src={logo}
        alt="6 cities logo"
        width={LogoWidth[type]}
        height={LogoHeight[type]}
      />
    </Link>
  );
}

export default Logo;
