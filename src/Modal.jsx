import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-modal',

  propTypes: {
    show: PropTypes.bool,
    withMask: PropTypes.bool,
    disableScroll: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    touchMask: PropTypes.func,
    children: PropTypes.node,
  },


  getDefaultProps() {
    return {
      prefixCls: 'rc-modal',
      className: '',
      show: true,
      withMask: true,
      disableScroll: true,
    };
  },

  _disableScroll(e) {
    e.preventDefault();
  },

  _touchMask(e) {
    if (this.props.touchMask) {
      this.props.touchMask(e);
    }
  },

  render() {
    const {prefixCls, className} = this.props;
    const cls = prefixCls + ' ' + className;
    let modal = null;
    if (this.props.show) {
      modal = (<div className={cls} onTouchMove={this._disableScroll}>
        {this.props.children}
        {(()=> {
          if (this.props.withMask) {
            return <div onTouchStart={this._touchMask} onClick={this._touchMask} className={this.props.prefixCls + '-mask'} />;
          }
        })()}
        </div>
      );
    } else {
      modal = <div />;
    }

    return modal;
  },
});
