import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import { initializeApp } from '../../store/app-slice/app-thunk';
import Main from '../main/main';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Main/>
      </Route>
    </Switch>
  );
}

export default App;
