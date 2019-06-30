import React, { PureComponent } from 'react';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import { List } from 'antd';

import Photo from 'components/Photo';

export class PhotoList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: props.photos || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    let { list } = this.state;

    if(nextProps.page > this.props.page){
        
    }
    if (nextProps.photos !== this.props.photos) {
        list = nextProps.data.map(r => this.formatRecommendation(r));
    }
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.state.list}
        renderItem={item => <Photo data={item} />}
      />
    );
  }
}

PhotoList.propTypes = {
  photos: T.oneOfType([IT.list, T.array, T.bool]),
  page: T.any,
};

export default PhotoList;
