/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import theme from 'styles';

import Header from 'components/Header';
import Map from 'components/Map';

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
  handleOnClick = e => {
    console.log(e);
  };

  render() {
    return (
      <ContainerLayout>
        <Header />
        <Content>
          <Map onClick={this.handleOnClick} />
        </Content>
      </ContainerLayout>
    );
  }
}

export default HomePage;
