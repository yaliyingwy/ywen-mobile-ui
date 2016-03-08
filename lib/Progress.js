'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-progress',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    progress: _react.PropTypes.number,
    size: _react.PropTypes.string.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-progress',
      className: '',
      progress: 0
    };
  },

  _computeStyle: function _computeStyle() {
    var progress = Math.floor(this.props.progress);
    var style = {
      s0_25: {},
      s25_50: {},
      s50_75: {},
      s75_100: {}
    };

    if (progress < 25) {
      var angle = -90 + progress / 100 * 360;
      style.s0_25.transform = 'rotate(' + angle + 'deg)';
    } else if (progress >= 25 && progress < 50) {
      var angle = -90 + (progress - 25) / 100 * 360;
      style.s0_25.transform = 'rotate(0deg)';
      style.s25_50.transform = 'rotate(' + angle + 'deg)';
    } else if (progress >= 50 && progress < 75) {
      var angle = -90 + (progress - 50) / 100 * 360;
      style.s0_25.transform = 'rotate(0deg)';
      style.s25_50.transform = 'rotate(0deg)';
      style.s50_75.transform = 'rotate(' + angle + 'deg)';
    } else if (progress >= 75 && progress <= 100) {
      var angle = -90 + (progress - 75) / 100 * 360;
      style.s0_25.transform = 'rotate(0deg)';
      style.s25_50.transform = 'rotate(0deg)';
      style.s50_75.transform = 'rotate(0deg)';
      style.s75_100.transform = 'rotate(' + angle + 'deg)';
    }
    return style;
  },

  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var className = _props.className;
    var progress = _props.progress;
    var size = _props.size;

    var cls = prefixCls + '  ' + className;
    var style = this._computeStyle();

    return _react2['default'].createElement(
      'div',
      { className: cls, style: { width: size, height: size } },
      _react2['default'].createElement(
        'div',
        { className: 'loader-bg' },
        _react2['default'].createElement(
          'div',
          { style: { lineHeight: size }, className: 'text' },
          progress + '%'
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'spiner-holder-one animate-0-25-a' },
        _react2['default'].createElement(
          'div',
          { style: style.s0_25, className: 'spiner-holder-two animate-0-25-b' },
          _react2['default'].createElement('div', { className: 'loader-spiner' })
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'spiner-holder-one animate-25-50-a' },
        _react2['default'].createElement(
          'div',
          { style: style.s25_50, className: 'spiner-holder-two animate-25-50-b' },
          _react2['default'].createElement('div', { className: 'loader-spiner' })
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'spiner-holder-one animate-50-75-a' },
        _react2['default'].createElement(
          'div',
          { style: style.s50_75, className: 'spiner-holder-two animate-50-75-b' },
          _react2['default'].createElement('div', { className: 'loader-spiner' })
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'spiner-holder-one animate-75-100-a' },
        _react2['default'].createElement(
          'div',
          { style: style.s75_100, className: 'spiner-holder-two animate-75-100-b' },
          _react2['default'].createElement('div', { className: 'loader-spiner' })
        )
      )
    );
  }
});
module.exports = exports['default'];