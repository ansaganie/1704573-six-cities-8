import { render, screen } from '@testing-library/react';
import { getFakeHost } from '../../utils/fake-data';
import Host from './host';

describe('Component: Host', () => {
  it('should render correctly', async () => {
    const HOST = getFakeHost();
    const DESCRIPTION = 'This is fake description of the offer';
    const ALT_TEXT = 'Host avatar';

    render(
      <Host host={HOST} description={DESCRIPTION}/>,
    );

    expect(screen.getByAltText(ALT_TEXT)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(HOST.name)).toBeInTheDocument();
  });

  it('should render "Pro" when isPro = true', async () => {
    const HOST = getFakeHost();
    const DESCRIPTION = 'This is fake description of the offer';
    const PRO_TEXT = 'Pro';
    HOST.isPro = true;

    render(
      <Host host={HOST} description={DESCRIPTION}/>,
    );

    expect(screen.getByText(PRO_TEXT)).toBeInTheDocument();
  });

  it('should not render "Pro" when isPro = false', async () => {
    const HOST = getFakeHost();
    const DESCRIPTION = 'This is fake description of the offer';
    const PRO_TEXT = 'Pro';
    HOST.isPro = false;

    render(
      <Host host={HOST} description={DESCRIPTION}/>,
    );

    expect(screen.queryByText(PRO_TEXT)).not.toBeInTheDocument();
  });
});
