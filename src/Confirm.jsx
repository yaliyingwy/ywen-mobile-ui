// export this package's api
import Modal from './Modal';
import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-confrim',

  propTypes: {
    confirmCb: PropTypes.func.isRequired,
    cancelCb: PropTypes.func.isRequired,
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
      title: '提示',
      confirmBtn: '确定',
      cancelBtn: '取消',
      content: '确定执行该操作？',
      cancelOnTouch: false,
      prefixCls: 'rc-confirm',
      className: '',
      show: true,
    };
  },

  _touchMask() {
    if (this.props.cancelOnTouch) {
      this.props.cancelCb();
    }
  },

  render() {
    const {prefixCls, className} = this.props;
    const cls = prefixCls + ' ' + className;
    return (<Modal show={this.props.show} withMask={this.props.withMask} touchMask={this._touchMask}>
      <div className={cls}>
        <h4 className={this.props.prefixCls + '-title'}>{this.props.title}</h4>
        <p className={this.props.prefixCls + '-content'}>{this.props.content}</p>
        <div className={this.props.prefixCls + '-btns'}>
          <a onClick={this.props.confirmCb}>{this.props.confirmBtn}</a>
          <a onClick={this.props.cancelCb}>{this.props.cancelBtn}</a>
        </div>
      </div>
      </Modal>
    );
  },
});
