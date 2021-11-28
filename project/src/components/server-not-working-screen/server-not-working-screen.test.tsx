import React from 'react';
import { render } from '@testing-library/react';
import ServerNotWorkingScreen from './server-not-working-screen';

describe('Screen: Server Not Working', () => {
  it('should render correctly', () => {
    const title = /Internal server error/;
    const code = /500/;
    const text = /Sorry for inconvenience, we are working to solve it/;

    const { getByText } = render(<ServerNotWorkingScreen/>);

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(code)).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
  });
});
