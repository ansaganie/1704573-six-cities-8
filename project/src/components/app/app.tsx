import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { getInitialized } from '../../store/app-slice/app-selector';
import { initializeApp } from '../../store/app-slice/app-thunk';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import OfferScreen from '../offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const initialized = useAppSelector(getInitialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Spinner/>;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen/>
      </Route>
      <Route exact path={AppRoute.Offer}>
        <OfferScreen/>
      </Route>
      <PrivateRoute exact path={AppRoute.Favorites}>
        <FavoritesScreen/>
      </PrivateRoute>
      <Route exact path={AppRoute.SignIn}>
        <SignInScreen/>
      </Route>
      <NotFoundScreen/>
    </Switch>
  );
}

export default App;
