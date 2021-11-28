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
import IOffer from '../../models/IOffer';
import { Cities } from '../../store/main-page-slice/constants';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Screen: Favorite', () => {
  it('should render correctly', async () => {
    const favoriteOffers: IOffer[] = [];
    const offers = { ...INITIAL_STATE.offer.offers };
    INITIAL_STATE.app.favoriteOffers.forEach((id) => {
      if (offers[id].city.name === Cities.Paris) {
        favoriteOffers.push(offers[id]);
      }
    });
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

    const result = [];

    favoriteOffers.forEach(({ title }) => result.push(screen.getByText(title)));

    expect(result.length).toBe(offersExpectedLength);
  });
});
