import React, { PureComponent } from 'react';
import T from 'prop-types';
import { Card } from 'antd';

class Photo extends PureComponent {
  render() {
    const { data } = this.props;
    return <Card cover={<img src={data.get('urls').get('small')} />} />;
  }
}

Photo.propTypes = {
  data: T.object,
};

export default Photo;
