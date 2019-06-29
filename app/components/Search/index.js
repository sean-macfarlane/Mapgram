import React from 'react';
import { Input } from 'antd';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import { GOOGLE_MAPS_URL } from 'constants/index';
import { getCityFromGeocoder } from 'utils/geocode';

const { Search } = Input;

const SearchBox = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.props.onSearch(getCityFromGeocoder(places));
          this.setState({
            places,
          });
        },
      });
    },
  }),
  withScriptjs,
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
      style={{
          margin: 'auto'
      }}
    >
      <Search value={props.value} onChange={props.onChange} placeholder="Search..." style={{ width: 400 }} />
    </StandaloneSearchBox>
  </div>
));

export default SearchBox;
