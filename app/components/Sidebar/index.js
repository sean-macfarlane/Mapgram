import React from 'react';
import styled from 'styled-components';
import { Layout, Spin as AntdSpin } from 'antd';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import InfiniteScroll from 'react-infinite-scroller';

import theme from 'styles';

import PhotoList from 'components/PhotoList';

const { Sider: AntdSider } = Layout;

const Spin = styled(AntdSpin)`
  &&& {
    width: 100%;
    padding: 20px;
  }
`;

const Sider = styled(AntdSider)`
  &&& {
    background: ${theme.Sidebar.background};
    border-right: ${theme.Sidebar.borderRight};
    left: 0;
    overflow: hidden;
    position: fixed;
    overflow-y: auto;
    z-index: 1;
    height: calc(100% - 64px);
  }
`;

const ListContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

export class Sidebar extends React.PureComponent {
  render() {
    const {
      collapsed,
      handleInfiniteOnLoad,
      loading,
      hasMore,
      page,
      photos,
    } = this.props;
    return (
      <Sider
        collapsed={collapsed}
        width={parseInt(theme.Sidebar.width, 10)}
        collapsedWidth={0}
      >
        <ListContainer>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={!loading && hasMore}
            useWindow={false}
          >
            {loading && page === 1 ? (
              <Spin />
            ) : (
              <PhotoList photos={photos && photos.get('results')} page={page} />
            )}
          </InfiniteScroll>
        </ListContainer>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  collapsed: T.bool,
  loading: T.bool,
  hasMore: T.bool,
  photos: T.oneOfType([IT.map, T.bool]),
  page: T.any,
  handleInfiniteOnLoad: T.func,
};

export default Sidebar;
