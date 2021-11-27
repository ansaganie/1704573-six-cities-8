import React from 'react';
import { render } from '@testing-library/react';
import { LatLng } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { getFakeOffers } from '../../utils/fake-data';
import Leaflet from './leaflet';

describe('Component: Nearby', () => {
  it('should render correctly', async () => {
    const testId = 'leaflet-marker';
    const offers = getFakeOffers();
    const offer = offers[0];
    const location = offer.city.location;
    const { latitude, longitude } = location;
    const position = new LatLng(latitude, longitude);

    const { getAllByAltText } = render(
      <MapContainer
        center={position}
        zoom={location.zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Leaflet offerInFocusId={offer.id} position={position} offers={offers}/>
      </MapContainer>,
    );

    expect(getAllByAltText(testId).length).toBe(offers.length);
  });
});
