import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', async () => {
    const TEST_ID = 'spinner';

    render(
      <Spinner/>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
