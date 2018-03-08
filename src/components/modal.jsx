import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { COMMON_MODAL, getModalNode } from '../utils/modalUtil';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.modal = getModalNode(props.type);
  }

  render() {
    const { touchFunc, className, children } = this.props;
    const modal = (
      <div onClick={touchFunc} className={`ywen-modal ${className}`}>
        {children}
      </div>
    );
    return ReactDOM.createPortal(modal, this.modal);
  }
}

Modal.propTypes = {
  touchFunc: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  touchFunc: () => console.log('touch Modal'),
  type: COMMON_MODAL,
  className: '',
};

export default Modal;
