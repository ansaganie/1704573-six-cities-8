import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { getAuthorized } from '../../store/app-slice/app-selector';
import Header from '../header/header';
import RandomCity from '../random-city/random-city';
import SignInForm from '../sign-in-form/sign-in-form';

const SIGN_IN_PAGE_TITLE = '6 cities | Find best place to stay in your favorite city';

function SignInScreen(): JSX.Element {
  const authorized = useAppSelector(getAuthorized);

  useEffect(() => {
    document.title = SIGN_IN_PAGE_TITLE;
  }, []);

  if (authorized) {
    return <Redirect to={AppRoute.Main}/>;
  }

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <SignInForm/>
          <RandomCity/>
        </div>
      </main>
    </div>
  );
}

export default SignInScreen;
