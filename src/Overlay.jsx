import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-overlay',

  propTypes: {
    show: PropTypes.bool,
    withMask: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    touchMask: PropTypes.func,
  },


  getDefaultProps() {
    return {
      prefixCls: 'rc-overlay',
      className: '',
      show: true,
      withMask: true,
    };
  },

  _touchMask(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.touchMask) {
      this.props.touchMask(e);
    }
  },

  render() {
    const {prefixCls, className, show, withMask} = this.props;
    const cls = `${prefixCls} ${show ? 'modal-overlay-visible' : ''} ${className}`;
    const opacity = withMask ? 1 : 0;

    return (<div style={{ opacity }} onClick={ this._touchMask } className={ cls }></div>);
  },
});
