import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { getAuthStatus } from '../../store/app-slice/app-selector';
import { AuthStatus } from '../../store/app-slice/types';
import Header from '../header/header';
import SignInForm from '../sign-in-form/sign-in-form';

const SIGN_IN_PAGE_TITLE = '6 cities | Find best place to stay in your favorite city';

function SignInScreen(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    document.title = SIGN_IN_PAGE_TITLE;
  }, []);

  if (authStatus === AuthStatus.Auth) {
    return <Redirect to={AppRoute.Main}/>;
  }

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <SignInForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignInScreen;
