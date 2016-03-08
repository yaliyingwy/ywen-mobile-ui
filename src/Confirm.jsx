// export this package's api
import Overlay from './Overlay';
import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-confrim',

  propTypes: {
    confirmCb: PropTypes.func.isRequired,
    cancelCb: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    confirmBtn: PropTypes.string,
    cancelBtn: PropTypes.string,
    cancelOnTouch: PropTypes.bool,
    show: PropTypes.bool,
    withMask: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
  },

  getDefaultProps() {
    return {
      confirmBtn: '确定',
      content: '确定执行该操作？',
      cancelOnTouch: false,
      prefixCls: 'rc-confirm',
      className: '',
      show: true,
    };
  },

  _touchMask() {
    if (this.props.cancelOnTouch && this.props.cancelCb) {
      this.props.cancelCb();
    }
  },


  render() {
    const {
      show,
      withMask,
      prefixCls,
      className,
      content,
      confirmBtn,
      cancelBtn,
      confirmCb,
      cancelCb,
      title,
    } = this.props;

    const cls = `${prefixCls} ${className}`;
    const modalCls = `modal modal-${show ? 'in' : 'out'}`;

    return (<div className={ cls }>
        <div className={ modalCls }>
          <div className="modal-inner">
            {(() => {
              if (title) {
                return <div className="modal-title">{ title }</div>;
              }
            })()}
            <div className="modal-text">{ content }</div>
          </div>
          <div className="modal-buttons">
            {(() => {
              if (cancelBtn) {
                return <span onClick={ cancelCb } className="modal-button">{ cancelBtn }</span>;
              }
            })()}
            <span onClick={ confirmCb } className="modal-button">{ confirmBtn }</span>
          </div>
        </div>

        <Overlay show={ show } withMask={ withMask } touchMask={ this._touchMask } />
      </div>
    );
  },
});
