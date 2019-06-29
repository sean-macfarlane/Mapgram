import React from 'react';
import styled from 'styled-components';
import { Layout, Icon } from 'antd';

import theme from 'styles';

import Search from 'components/Search';
import Link from 'components/Link';

const { Header } = Layout;

const FixedHeader = styled(({ collapsed, isMobile, ...rest }) => (
  <Header {...rest} />
))`
  &&& {
    background: ${theme.GlobalHeader.background};
    border-bottom: ${theme.GlobalHeader.borderBottom};
    display: flex;
    height: ${theme.GlobalHeader.height};
    padding: 0;
    position: fixed;
    z-index: 999;
    width: 100%;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 24px;
`;

const GlobalHeader = props => (
  <FixedHeader>
    <LogoContainer to="/">
      <Icon type="compass" /> Mapgram
    </LogoContainer>
    <Search />
  </FixedHeader>
);

export default GlobalHeader;
