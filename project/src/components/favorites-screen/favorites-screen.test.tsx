import thunk from 'redux-thunk';
import { render, waitFor, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import { AppRoute } from '../../constants';
import FavoritesScreen from './favorites-screen';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Screen: Favorite', () => {
  it('should render correctly', async () => {
    const favoriteOffers = INITIAL_STATE.app.favoriteOffers.slice();
    const offersExpectedLength = favoriteOffers.length;

    const store = mockStore(INITIAL_STATE);
    history.push(AppRoute.Favorites);

    await waitFor(() => render(
      <Provider store={store}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Switch>
              <Route exact path={AppRoute.Favorites}>
                <FavoritesScreen/>
              </Route>
            </Switch>
          </QueryParamProvider>
        </Router>
      </Provider>,
    ));

    const offers = [];

    favoriteOffers.forEach(({ title }) => offers.push(screen.getByText(title)));

    expect(offers.length).toBe(offersExpectedLength);
  });
});
