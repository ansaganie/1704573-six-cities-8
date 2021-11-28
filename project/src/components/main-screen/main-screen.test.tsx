import thunk from 'redux-thunk';
import { render, waitFor, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { Cities, MainSearchParam } from '../../store/main-page-slice/constants';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import MainScreen from './main-screen';
import { AppRoute } from '../../constants';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Screen: Main', () => {
  it('should render correctly', async () => {
    const parisOffers = INITIAL_STATE.offer.offers.filter(({ city }) =>
      city.name === Cities.Paris);
    const offersExpectedLength = parisOffers.length;
    const tabsExpectedLength = Object.values(Cities).length;

    const store = mockStore(INITIAL_STATE);
    history.push({
      pathname: AppRoute.Main,
      search: `?${MainSearchParam.Tab}=${Cities.Paris}`,
    });

    const markup = (
      <StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Switch>
                <Route exact path={AppRoute.Main}>
                  <MainScreen/>
                </Route>
              </Switch>
            </QueryParamProvider>
          </Router>
        </Provider>
      </StrictMode>
    );

    await waitFor(() => render(markup));

    const tabs = [];
    const offers = [];

    Object.values(Cities)
      .forEach(
        (city) => tabs.push(screen.getByText(city)),
      );

    parisOffers.forEach(({ title }) => offers.push(screen.getByText(title)));

    expect(tabs.length).toBe(tabsExpectedLength);
    expect(offers.length).toBe(offersExpectedLength);
  });
});
