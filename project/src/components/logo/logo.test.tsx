import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import Logo, { LogoType } from './logo';

describe('Component: Logo', () => {
  it('should render correctly', async () => {
    const LOGO_ALT_TEXT = '6 cities logo';
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Logo type={LogoType.Footer}/>
      </Router>,
    );

    expect(screen.getByAltText(LOGO_ALT_TEXT)).toBeInTheDocument();
  });

  it('should render main page when logo clicked', async () => {
    const MAIN_PAGE_TEXT = 'This is main page';
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Switch>
          <Route>
            <h1>{MAIN_PAGE_TEXT}</h1>
          </Route>
        </Switch>
        <Logo type={LogoType.Footer}/>
      </Router>,
    );

    const link = screen.getByRole('link');
    userEvent.click(link);

    expect(screen.getByText(MAIN_PAGE_TEXT)).toBeInTheDocument();
  });
});
