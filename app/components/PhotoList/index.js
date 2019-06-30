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
      page: props.page || 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { list } = this.state;

    if (nextProps.photos !== this.props.photos) {
      if (nextProps.page > this.state.page) {
        console.log('test');
        this.setState({
          page: nextProps.page,
          list: this.state.list.concat(nextProps.photos),
        });
      } else {
        console.log('test2');
        this.setState({
          list: nextProps.photos,
        });
      }
    }
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.state.list}
        renderItem={item => <Photo key={item.get('id')} data={item} />}
      />
    );
  }
}

PhotoList.propTypes = {
  photos: T.oneOfType([IT.list, T.array, T.bool]),
  page: T.any,
};

export default PhotoList;
