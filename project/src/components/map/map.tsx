import React from 'react';
import styles from './map.module.css';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import IOffer, { OfferId } from '../../models/IOffer';
import ILocation from '../../models/ILocation';
import Leaflet from '../leaflet/leaflet';

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
  const position = new L.LatLng(
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
      data-testid="map-component"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Leaflet
        offers={offers}
        offerInFocusId={offerInFocusId}
        position={position}
      />
    </MapContainer>
  );
}

export default Map;
