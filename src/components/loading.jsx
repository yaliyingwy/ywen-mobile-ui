import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';
import { TOAST_MODAL } from '../utils/modalUtil';

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'Loading';
  }

  render() {
    const { className } = this.props;
    return (
      <Modal type={TOAST_MODAL}>
        <div className={`ywen-loading ${className}`}>
          <div className="ywen-loading-spinner" />
        </div>
      </Modal>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: '',
};

export default Loading;
