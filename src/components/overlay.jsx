import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Overlay extends PureComponent {
  render() {
    const { touchFunc, className } = this.props;
    return (
      <div onClick={touchFunc} className={`ywen-overlay ${className}`} />
    );
  }
}

Overlay.propTypes = {
  touchFunc: PropTypes.func,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  touchFunc: () => console.log('touch overlay'),
  className: '',
};

export default Overlay;
