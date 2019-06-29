/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import { fromJS, List, Map } from 'immutable';
import { Layout } from 'antd';
import styled from 'styled-components';

import theme from 'styles';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import GoogleMap from 'components/Map';

import { loadPhotosRequest } from 'containers/App/actions';
import { makeSelectLoading, makeSelectPhotos } from 'containers/App/selectors';
import { getCityFromGeocoder } from 'utils/geocode';

const ContainerLayout = styled(Layout)`
  &&& {
    display: flex;
  }
`;

const { Content: AntdContent } = Layout;

const Content = styled(AntdContent)`
  &&& {
    padding-top: ${theme.GlobalHeader.height};
    display: flex;
  }
`;

class HomePage extends React.PureComponent {
  static propTypes = {
    globalLoading: T.bool,
    photos: T.oneOfType([IT.map, T.bool]),
    loadPhotos: T.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      collapsed: true,
    };
  }

  handleOnChange = e => this.setState({ search: e.target.value });

  handleOnSearch = value => {
    if (value && value !== '') {
      this.props.loadPhotos(value);
      this.setState({ search: value, collapsed: false });
    }
  };

  handleOnClick = e => {
    const geocoder = new window.google.maps.Geocoder();
    const that = this;
    geocoder.geocode(
      { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
      function(results, status) {
        if (status == 'OK') {
          const city = getCityFromGeocoder(results) || '';
          that.handleOnSearch(city);
          that.setState({
            search: city,
          });
        } else {
          console.log(
            'Geocode was not successful for the following reason:',
            status,
          );
        }
      },
    );
  };

  render() {
    const { photos } = this.props;
    console.log(photos);
    return (
      <ContainerLayout>
        <Header
          search={this.state.search}
          onChange={this.handleOnChange}
          onSearch={this.handleOnSearch}
        />
        <Content>
          <Sidebar collapsed={this.state.collapsed} photos={photos} />
          <GoogleMap onClick={this.handleOnClick} />
        </Content>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalLoading: makeSelectLoading(),
  photos: makeSelectPhotos(),
});

const mapDispatchToProps = dispatch => ({
  loadPhotos: (...params) => {
    dispatch(loadPhotosRequest(...params));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
