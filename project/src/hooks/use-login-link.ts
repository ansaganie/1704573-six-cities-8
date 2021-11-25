import { MouseEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../constants';

type UseLoginLink = (evt: MouseEvent) => void;

export const useLoginLink = (): UseLoginLink => {
  const history = useHistory();
  const { pathname, search } = history.location;

  const onLoginClick = useCallback((evt: MouseEvent) => {
    evt.preventDefault();

    history.push(AppRoute.SignIn, {
      from: `${pathname}${search}`,
    });
  }, [history, pathname, search]) ;

  return onLoginClick;
};
