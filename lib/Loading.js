'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'rc-loading',

  propTypes: {
    withMask: _react.PropTypes.bool,
    cancelOnTouch: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    color: _react.PropTypes.string,
    progress: _react.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-loading',
      className: '',
      color: '#fff',
      withMask: true,
      cancelOnTouch: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      show: true
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  },
  _touchMask: function _touchMask() {
    if (this.props.cancelOnTouch) {
      this.setState({ show: false });
    }
  },
  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var className = _props.className;
    var withMask = _props.withMask;
    var progress = _props.progress;

    var cls = prefixCls + ' ' + className;
    var loading = undefined;
    if (this.state.show) {
      var spinner = undefined;
      if (progress) {
        spinner = _react2.default.createElement(_Progress2.default, { size: '8rem', progress: progress });
      } else {
        spinner = _react2.default.createElement(
          'div',
          { className: prefixCls + '-spinner' },
          _react2.default.createElement('div', { className: prefixCls + '-bounce ' + prefixCls + '-bounce1', style: { backgroundColor: this.props.color } }),
          _react2.default.createElement('div', { className: prefixCls + '-bounce ' + prefixCls + '-bounce2', style: { backgroundColor: this.props.color } }),
          _react2.default.createElement('div', { className: prefixCls + '-bounce ' + prefixCls + '-bounce3', style: { backgroundColor: this.props.color } })
        );
      }
      loading = _react2.default.createElement(
        'div',
        { className: cls },
        spinner,
        _react2.default.createElement(_Overlay2.default, { withMask: withMask, touchMask: this._touchMask })
      );
    } else {
      loading = _react2.default.createElement('div', null);
    }

    return loading;
  }
}); // export this package's api