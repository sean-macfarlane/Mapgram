import React, { PureComponent } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Card as AntdCard } from 'antd';
import Carousel, { Modal, ModalGateway } from 'react-images';

const Card = styled(AntdCard)`
  &&& {
    :hover {
      opacity: 0.8;
    }
  }
`;

class Photo extends PureComponent {
  state = {
    lightboxIsOpen: false,
  };

  toggleLightbox = () => {
    console.log('test');
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
    }));
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        <Card
          onClick={this.toggleLightbox}
          cover={<img src={data.get('urls').get('small')} />}
          hoverable
        />
        <ModalGateway>
          {this.state.lightboxIsOpen ? (
            <Modal onClose={this.toggleLightbox} closeOnBackdropClick>
              <Carousel views={[{ src: data.get('urls').get('regular') }]} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

Photo.propTypes = {
  data: T.object,
};

export default Photo;
