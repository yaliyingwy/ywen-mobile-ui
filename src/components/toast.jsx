import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from './modal';
import { getModalNode, TOAST_MODAL } from '../utils/modalUtil';

let timestamp = Date.now();

class Toast extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'Toast';
  }

  render() {
    const { text, position, className } = this.props;
    return (
      <Modal type={TOAST_MODAL}>
        <div className={`ywen-toast ${position} ${className}`}>{text}</div>
      </Modal>
    );
  }
}

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  className: PropTypes.string,
};

Toast.defaultProps = {
  position: 'center',
  className: '',
};

export function showToast(text, position = 'center', time = 1500, props) {
  const node = getModalNode(TOAST_MODAL);
  ReactDOM.render(<Toast text={text} position={position} {...props} />, node);
  const now = Date.now();
  timestamp = now;
  setTimeout(() => {
    if (timestamp === now) {
      ReactDOM.unmountComponentAtNode(node);
    }
  }, time);
}

export default Toast;
