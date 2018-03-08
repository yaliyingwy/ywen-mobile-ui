import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

import { ALERT_MODAL } from '../utils/modalUtil';

class Alert extends PureComponent {
  render() {
    const { 
      className, 
      title, 
      text, 
      btns,
    } = this.props;
    const btnCells = btns.map((btn) => {
      const cls = `alert-btn ${btn.default ? 'default' : ''}`;
      return (
        <div key={btn.title} className={cls} onClick={btn.action}>{btn.title}</div>
      );
    });

    const alert = (
      <Modal className="ywen-alert-modal" type={ALERT_MODAL}>
        <div className={`ywen-alert ${className}`}>
          <div className="alert-header">
            <div className="alert-title">
              {title}
            </div>
          </div>
          <div className="alert-content">
            <p>{text}</p>
          </div>
          <div className="alert-footer">
            {btnCells}
          </div>
        </div>
      </Modal>
    );

    return alert;
  }
}

Alert.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  btns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    default: PropTypes.bool,
  })).isRequired,
};

Alert.defaultProps = {
  className: '',
  title: '提示',
};

export default Alert;
