import React from 'react';
import styles from './map.module.css';
import { LatLng } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import IOffer, { OfferId } from '../../models/IOffer';
import ILocation from '../../models/ILocation';
import Leaflet from '../leaflet/leaflet';

const ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

type MapProps = {
  offerInFocusId: OfferId,
  locationInFocus: ILocation,
  offers: IOffer[],
}

function Map({
  offerInFocusId,
  locationInFocus,
  offers,
}: MapProps): JSX.Element | null {
  const position = new LatLng(
    locationInFocus.latitude,
    locationInFocus.longitude,
  );

  if (offers.length === 0) {
    return null;
  }

  return (
    <MapContainer
      className={styles.map}
      center={position}
      zoom={locationInFocus.zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution={ATTRIBUTION}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        data-testid="map-component"
      />
      <Leaflet
        offers={offers}
        offerInFocusId={offerInFocusId}
        locationInFocus={locationInFocus}
      />
    </MapContainer>
  );
}

export default Map;
