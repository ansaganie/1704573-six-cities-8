import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../constants';

type UseLoginRedirect = () => void;

export const useLoginRedirect = (): UseLoginRedirect => {
  const history = useHistory();
  const { pathname, search } = history.location;

  const onLoginClick = useCallback(() => {
    history.push(AppRoute.SignIn, {
      from: `${pathname}${search}`,
    });
  }, [ history, pathname, search ]) ;

  return onLoginClick;
};
