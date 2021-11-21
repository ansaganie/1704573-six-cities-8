import React, { useEffect } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import pin from '../../assets/pin.svg';
import activePin from '../../assets/pin-active.svg';
import IOffer, { OfferId } from '../../models/IOffer';

type LeafletProps = {
  offers: IOffer[],
  offerInFocusId: OfferId,
  position: LatLng,
}

function Leaflet(props: LeafletProps): JSX.Element {
  const { offers, offerInFocusId, position } = props;
  const map = useMap();

  useEffect(() => {
    map.flyTo(position);
  }, [ map, position, offerInFocusId ]);

  return (
    <>
      {
        offers.map(({ id, location }) => (
          <Marker
            key={id}
            icon={
              new L.Icon({
                iconUrl: id === offerInFocusId ? activePin : pin,
                iconSize: new L.Point(40, 50),
                iconAnchor: new L.Point(40, 25),
                zoom: location.zoom,
              })
            }
            position={
              new L.LatLng(
                location.latitude, location.longitude,
              )
            }
          />
        ))
      }
    </>
  );
}

export default Leaflet;
