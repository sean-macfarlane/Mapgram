import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import T from 'prop-types';

import theme from 'styles';

import Search from 'components/Search';
import Link from 'components/Link';

import logoImage from 'images/logo.png';

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
    z-index: 1;
    width: 100%;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 40px;
  position: absolute;
  font-size: 18px;
`;

const SearchBox = styled.div`
  margin: auto;
`;

const GlobalHeader = props => {
  const { search, onChange, onSearch } = props;
  return (
    <FixedHeader>
      <LogoContainer to="/">
        <img src={logoImage} alt="logo" height="32" />
      </LogoContainer>
      <SearchBox>
        <Search value={search} onChange={onChange} onSearch={onSearch} />
      </SearchBox>
    </FixedHeader>
  );
};

GlobalHeader.propTypes = {
  search: T.any,
  onChange: T.func,
  onSearch: T.func,
};

export default GlobalHeader;
