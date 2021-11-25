import { render, screen } from '@testing-library/react';
import { getFakeInsides } from '../../utils/fake-data';
import Inside from './inside';

describe('Component: Inside', () => {
  it('should render correctly', async () => {
    const INSIDES = getFakeInsides();

    render(
      <Inside inside={INSIDES}/>,
    );

    const elements = [];
    Object.values(INSIDES)
      .forEach((value) => elements.push(screen.getByText(value)));

    expect(elements.length).toBe(Object.values(INSIDES).length);
  });
});
