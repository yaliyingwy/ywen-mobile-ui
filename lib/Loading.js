// export this package's api
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-loading',

  propTypes: {
    withMask: _react.PropTypes.bool,
    cancelOnTouch: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    color: _react.PropTypes.string
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

  componentWillReceiveProps: function componentWillReceiveProps() {
    this.setState({ show: true });
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

    var cls = prefixCls + ' ' + className;
    var loading = undefined;
    if (this.state.show) {
      loading = _react2['default'].createElement(
        'div',
        { className: cls },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-spinner' },
          _react2['default'].createElement('div', { className: prefixCls + '-bounce ' + prefixCls + '-bounce1', style: { backgroundColor: this.props.color } }),
          _react2['default'].createElement('div', { className: prefixCls + '-bounce ' + prefixCls + '-bounce2', style: { backgroundColor: this.props.color } }),
          _react2['default'].createElement('div', { className: prefixCls + '-bounce ' + prefixCls + '-bounce3', style: { backgroundColor: this.props.color } })
        ),
        _react2['default'].createElement(_Overlay2['default'], { withMask: withMask, touchMask: this._touchMask })
      );
    } else {
      loading = _react2['default'].createElement('div', null);
    }

    return loading;
  }
});
module.exports = exports['default'];