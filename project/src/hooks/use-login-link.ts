import { useHistory } from 'react-router-dom';
import { AppRoute } from '../constants';
import { LoginState } from '../types/login-state';

export const useLoginLink = (): () => void => {
  const history = useHistory();

  const onLoginClick = () => {
    const state: LoginState = {
      from: history.location.pathname,
    };

    history.push(AppRoute.SignIn, state);
  };

  return onLoginClick;
};
