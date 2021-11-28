import React, { useEffect } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import pin from '../../assets/pin.svg';
import activePin from '../../assets/pin-active.svg';
import IOffer, { OfferId } from '../../models/IOffer';

const ICON_SIZE_X = 40;
const ICON_SIZE_Y = 50;
const ICON_ANCHOR_X = 40;
const ICON_ANCHOR_Y = 25;

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
            alt="leaflet-marker"
            icon={
              new L.Icon({
                iconUrl: id === offerInFocusId ? activePin : pin,
                iconSize: new L.Point(ICON_SIZE_X, ICON_SIZE_Y),
                iconAnchor: new L.Point(ICON_ANCHOR_X, ICON_ANCHOR_Y),
                zoom: location.zoom,
              })
            }
            position={
              new L.LatLng(
                location.latitude,
                location.longitude,
              )
            }
          />
        ))
      }
    </>
  );
}

export default Leaflet;
