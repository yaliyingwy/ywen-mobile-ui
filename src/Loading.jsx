// export this package's api
import React, {PropTypes} from 'react';
import Overlay from './Overlay';

export default React.createClass({
  displayName: 'rc-loading',

  propTypes: {
    withMask: PropTypes.bool,
    cancelOnTouch: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    color: PropTypes.string,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-loading',
      className: '',
      color: '#fff',
      withMask: true,
      cancelOnTouch: false,
    };
  },

  getInitialState() {
    return {
      show: true,
    };
  },

  componentWillReceiveProps() {
    this.setState({show: true});
  },

  _touchMask() {
    if (this.props.cancelOnTouch) {
      this.setState({show: false});
    }
  },

  render() {
    const {prefixCls, className, withMask} = this.props;
    const cls = prefixCls + ' ' + className;
    let loading;
    if (this.state.show) {
      loading = (<div className={cls}>
          <div className={ `${prefixCls}-spinner` }>
            <div className={`${prefixCls}-bounce ${prefixCls}-bounce1`} style={{backgroundColor: this.props.color}} />
            <div className={`${prefixCls}-bounce ${prefixCls}-bounce2`} style={{backgroundColor: this.props.color}} />
            <div className={`${prefixCls}-bounce ${prefixCls}-bounce3`} style={{backgroundColor: this.props.color}} />
          </div>
          <Overlay withMask={ withMask } touchMask={ this._touchMask } />
        </div>);
    } else {
      loading = <div />;
    }

    return loading;
  },
});
