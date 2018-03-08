import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from './lazyload';

class LazyImage extends PureComponent {
  constructor(props) {
    super(props);
    this.imageLoad = this.imageLoad.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.state = {
      loaded: false,
      visible: false,
    };
  }

  imageLoad() {
    this.setState({ loaded: true });
  }

  loadImage() {
    this.setState({ visible: true });
  }

  render() {
    const { 
      className, 
      src, 
      spinner, 
      ...rest 
    } = this.props;
    const { loaded, visible } = this.state;
    let result;
    if (loaded) {
      result = <img className={className} src={src} alt="" {...rest} />;
    } else {
      result = (
        <LazyLoad lazyload={this.loadImage} className={`ywen-image-loading ${className}`} {...rest}>
          {spinner}
          <img className="ywen-image" alt="" src={visible ? src : ''} onLoad={this.imageLoad} />
        </LazyLoad>
      );
    }
    return result;
  }
}

LazyImage.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  spinner: PropTypes.node,
};

LazyImage.defaultProps = {
  spinner: <div className="ywen-image-spinner" />,
};

export default LazyImage;
