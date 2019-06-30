import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import theme from 'styles';

export default styled(({ active, ...rest }) => <Link {...rest} />)`
  &&& {
    color: ${props =>
      props.active ? theme.Link.props.active.color : theme.Link.color};

    &:hover {
      color: ${theme.Link.hoverColor};
    }
  }
`;
