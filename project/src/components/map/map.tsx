import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAppSelector } from '../../hooks/redux';
import { getLocationInFocus, getOfferInFocusId } from '../../store/main-page-slice/main-page-selector';
import { getFilteredOffers, getOffersLoading } from '../../store/offer-slice/offer-selector';
import Leaflet from '../leaflet/leaflet';

function Map(): JSX.Element | null {
  const locationInFocus = useAppSelector(getLocationInFocus);
  const offerInFocusId = useAppSelector(getOfferInFocusId);
  const offers = useAppSelector(getFilteredOffers);
  const offersLoading = useAppSelector(getOffersLoading);
  const position = new L.LatLng(
    locationInFocus.latitude,
    locationInFocus?.longitude,
  );

  if (offersLoading) {
    return <section className="cities__map map"/>;
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <MapContainer
      className="cities__map map"
      center={position}
      zoom={locationInFocus.zoom}
      scrollWheelZoom={false}
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
