import React from 'react';
import { render } from '@testing-library/react';
import { getFakeOffers } from '../../utils/fake-data';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', async () => {
    const tileLayer = 'OpenStreetMap';
    const offers = getFakeOffers();
    const offer = offers[0];
    const location = offer.city.location;

    const { getByText } = render(
      <Map offerInFocusId={offer.id} locationInFocus={location} offers={offers} />,
    );

    expect(getByText(tileLayer)).toBeInTheDocument();
  });
});
