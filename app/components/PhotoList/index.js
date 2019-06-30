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
    const { photos } = this.props;
    const { list, page } = this.state;

    if (nextProps.photos !== photos) {
      if (nextProps.page > page) {
        this.setState({
          page: nextProps.page,
          list: list.concat(nextProps.photos),
        });
      } else {
        this.setState({
          list: nextProps.photos,
        });
      }
    }
  }

  render() {
    const { list } = this.state;
    return (
      <List
        itemLayout="horizontal"
        dataSource={list}
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
