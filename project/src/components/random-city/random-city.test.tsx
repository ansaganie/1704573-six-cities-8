import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { AppRoute } from '../../constants';
import RandomCity from './random-city';

describe('Component: RandomCity', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();

    const { getByRole } = render(
      <Router history={history}>
        <RandomCity/>
      </Router>,
    );

    const link = getByRole('link');

    expect(link).toBeInTheDocument();
    userEvent.click(link);

    expect(history.location.pathname).toEqual(AppRoute.Main);
    expect(history.location.search).toContain('tab');
  });
});
