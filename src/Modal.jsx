import React, {PropTypes} from 'react';
import className from 'class-name';

export default React.createClass({
  displayName: 'rc-modal',

  propTypes: {
    show: PropTypes.bool,
    disableScroll: PropTypes.bool,
    cancelOnTouch: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    onDismiss: PropTypes.func,
    children: PropTypes.node,
  },


  getDefaultProps() {
    return {
      prefixCls: 'rc-modal',
      className: '',
      show: false,
      disableScroll: true,
      cancelOnTouch: true,
    };
  },

  getInitialState() {
    return {
      show: !!this.props.show,
    };
  },

  _disableScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  _touchMask(e) {
    e.stopPropagation();
    if (this.props.cancelOnTouch) {
      this.setState({
        show: false,
      });
    }
  },

  render() {
    const {prefixCls} = this.props;
    const cls = className({prefixCls});
    return (
      <div className={cls} onTouchMove={this._disableScroll}>
      {this.props.children}
      <div onTouchStart={this._touchMask} onClick={this._touchMask} className={this.props.prefixCls + '-mask'} />
      </div>
    );
  },
});
