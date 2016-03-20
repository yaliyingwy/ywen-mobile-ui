'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-overlay',

  propTypes: {
    show: _react.PropTypes.bool,
    withMask: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    touchMask: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-overlay',
      className: '',
      show: true,
      withMask: true
    };
  },

  _touchMask: function _touchMask(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.touchMask) {
      this.props.touchMask(e);
    }
  },

  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var className = _props.className;
    var show = _props.show;
    var withMask = _props.withMask;

    var cls = prefixCls + ' ' + (show ? 'modal-overlay-visible' : '') + ' ' + className;
    var opacity = withMask ? 1 : 0;

    return _react2['default'].createElement('div', { style: { opacity: opacity }, onClick: this._touchMask, className: cls });
  }
});
module.exports = exports['default'];