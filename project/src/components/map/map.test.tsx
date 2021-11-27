import React from 'react';
import { render } from '@testing-library/react';
import { getFakeOffers } from '../../utils/fake-data';
import Map from './map';

describe('Component: Nearby', () => {
  it('should render correctly', async () => {
    const testId = 'map-component';
    const offers = getFakeOffers();
    const offer = offers[0];
    const location = offer.city.location;

    const { getByTestId } = render(
      <Map offerInFocusId={offer.id} locationInFocus={location} offers={offers} />,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
