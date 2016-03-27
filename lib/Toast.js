'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'rc-toast',

  propTypes: {
    content: _react.PropTypes.string.isRequired,
    showTime: _react.PropTypes.number,
    show: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    type: _react.PropTypes.oneOf(['error', 'success', 'info']),
    position: _react.PropTypes.oneOf(['top', 'center', 'bottom'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: 'info',
      position: 'center',
      showTime: 1500,
      show: true,
      prefixCls: 'rc-toast',
      className: ''
    };
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var show = _props.show;
    var className = _props.className;

    var cls = prefixCls + ' ' + (show ? '' : prefixCls + '-hide') + '  ' + (className || '');
    switch (this.props.position) {
      case 'top':
        cls += ' ' + prefixCls + '-top';
        break;
      case 'bottom':
        cls += ' ' + prefixCls + '-bottom';
        break;
      default:
        cls += ' ' + prefixCls + '-center';
    }
    return _react2.default.createElement(
      'div',
      { className: cls },
      function () {
        if (!(0, _is2.default)(_this.props.type, 'info')) {
          var iconCls = _this.props.prefixCls + '-icon';
          if ((0, _is2.default)(_this.props.type, 'success')) {
            iconCls += ' ' + iconCls + '-success';
          } else {
            iconCls += ' ' + iconCls + '-error';
          }
          return _react2.default.createElement('i', { className: iconCls });
        }
      }(),
      _react2.default.createElement(
        'p',
        { className: this.props.prefixCls + '-content' },
        this.props.content
      )
    );
  }
}); // export this package's api