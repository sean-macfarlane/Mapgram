import React from 'react';
import styled from 'styled-components';
import { Layout, Icon } from 'antd';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';

import theme from 'styles';

const { Sider: AntdSider } = Layout;

const Sider = styled(AntdSider)`
  &&& {
    background: ${theme.Sidebar.background};
    border-right: ${theme.Sidebar.borderRight};
    height: ${theme.Sidebar.height};
    left: 0;
    overflow: hidden;
    position: fixed;
    overflow-y: auto;
    z-index: 1000;
  }
`;

export class Sidebar extends React.PureComponent {
  render() {
    return (
      <Sider
        collapsed={this.props.collapsed}
        width={parseInt(theme.Sidebar.width, 10)}
        collapsedWidth={0}
      >
        Test
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  collapsed: T.bool,
  photos: T.oneOfType([IT.map, T.bool]),
};

export default Sidebar;
