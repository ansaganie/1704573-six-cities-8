import React, { useEffect } from 'react';
import Header from '../header/header';
import RandomCity from '../random-city/random-city';
import SignInForm from '../sign-in-form/sign-in-form';

const SIGN_IN_PAGE_TITLE = '6 cities | Sign in';

function SignInScreen(): JSX.Element {
  useEffect(() => {
    document.title = SIGN_IN_PAGE_TITLE;
  }, []);

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
