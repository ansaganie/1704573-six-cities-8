import React, { useEffect } from 'react';
import { LatLng, Icon, Point } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import pin from '../../assets/pin.svg';
import activePin from '../../assets/pin-active.svg';
import IOffer, { OfferId } from '../../models/IOffer';
import ILocation from '../../models/ILocation';

const ICON_SIZE_X = 40;
const ICON_SIZE_Y = 50;
const ICON_ANCHOR_X = 40;
const ICON_ANCHOR_Y = 25;
const MAP_FLY_OPTION = {
  duration: 1,
};

type LeafletProps = {
  offers: IOffer[],
  offerInFocusId: OfferId,
  locationInFocus: ILocation,
}

function Leaflet(props: LeafletProps): JSX.Element {
  const { offers, offerInFocusId, locationInFocus  } = props;
  const map = useMap();

  useEffect(() => {
    const position = new LatLng(
      locationInFocus.latitude,
      locationInFocus.longitude,
    );

    map.flyTo(position, locationInFocus.zoom, MAP_FLY_OPTION);
  }, [ locationInFocus, map ]);

  return (
    <>
      {
        offers.map(({ id, location }) => (
          <Marker
            key={id}
            alt="leaflet-marker"
            icon={
              new Icon({
                iconUrl: id === offerInFocusId ? activePin : pin,
                iconSize: new Point(ICON_SIZE_X, ICON_SIZE_Y),
                iconAnchor: new Point(ICON_ANCHOR_X, ICON_ANCHOR_Y),
                zoom: location.zoom,
              })
            }
            position={
              new LatLng(
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
