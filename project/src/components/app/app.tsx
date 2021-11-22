import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import { initializeApp } from '../../store/app-slice/app-thunk';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen/>
      </Route>
      <Route exact path={AppRoute.SignIn}>
        <SignInScreen/>
      </Route>
      <NotFoundScreen/>
    </Switch>
  );
}

export default App;
