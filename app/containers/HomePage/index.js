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
    photos: T.oneOfType([IT.map, T.bool]),
    loadPhotos: T.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      collapsed: true,
      page: 1,
    };
  }

  handleOnChange = e => this.setState({ search: e.target.value });

  handleOnSearch = value => {
    const { loadPhotos } = this.props;
    if (value && value !== '') {
      loadPhotos(value, 1);
      this.setState({ search: value, collapsed: false, page: 1 });
    }
  };

  handleOnClick = e => {
    const geocoder = new window.google.maps.Geocoder();
    const that = this;
    geocoder.geocode(
      { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
      (results, status) => {
        if (status === 'OK') {
          const city = getCityFromGeocoder(results) || '';
          that.handleOnSearch(city);
          that.setState({
            search: city,
          });
        } else {
          // eslint-disable-next-line no-console
          console.log(
            'Geocode was not successful for the following reason:',
            status
          );
        }
      }
    );
  };

  handleInfiniteOnLoad = () => {
    const { photos, loadPhotos } = this.props;
    const { page, search } = this.state;
    if (
      photos &&
      !photos.get('loading') &&
      photos.get('data') &&
      photos.get('data').get('total_pages') !== page
    ) {
      loadPhotos(search, page + 1);
      this.setState({ page: page + 1 });
    }
  };

  render() {
    const { photos } = this.props;
    const { page, search, collapsed } = this.state;

    return (
      <ContainerLayout>
        <Header
          search={search}
          onChange={this.handleOnChange}
          onSearch={this.handleOnSearch}
        />
        <Content>
          <Sidebar
            collapsed={collapsed}
            photos={photos && photos.get('data')}
            loading={photos && photos.get('loading')}
            page={page}
            handleInfiniteOnLoad={this.handleInfiniteOnLoad}
            hasMore={
              photos &&
              photos.get('data') &&
              photos.get('data').get('total_pages') &&
              photos.get('data').get('total_pages') !== page
            }
          />
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
  mapDispatchToProps
);

export default compose(withConnect)(HomePage);
