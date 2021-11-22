import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginState } from '../../types/login-state';

function SignInForm(): JSX.Element {
  const history = useHistory();

  const formSubmitHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    history.replace((history.location.state as LoginState).from);
  };

  return (
    <form
      className="login__form form"
      onSubmit={formSubmitHandler}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input className="login__input form__input" type="password" name="password" placeholder="Password" required/>
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default SignInForm;
