import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { GOOGLE_MAPS_URL } from 'constants/index';

const Map = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div style={{ height: `100%`, width: '100%', position: 'fixed' }} />
    ),
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45.4215, lng: -75.6972 }}
    disableDefaultUI
    onClick={props.onClick}
  />
));

export default Map;
