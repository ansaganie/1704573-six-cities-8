import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { api, AsyncDispatch, RootState } from '../../store/store';
import { INITIAL_STATE } from '../../setupTests';
import Bookmark from './bookmark';

const middleware = [ thunk.withExtraArgument(api) ];
const mockStore = configureMockStore<
  RootState,
  Action,
  AsyncDispatch
>(middleware);

const history = createMemoryHistory();

describe('Component: Bookmark', () => {
  it('should render correctly', async () => {
    const offerId = '135151465464';
    const className = 'button';

    const store = mockStore(INITIAL_STATE);

    const { getByRole } = render(
      <Provider store={store}>
        <Router history={history}>
          <Bookmark offerId={offerId} isFavorite big/>
        </Router>
      </Provider>,
    );

    const buttonElement = getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(className);
  });
});
