'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export this package's api
exports.default = _react2.default.createClass({
  displayName: 'rc-confrim',

  propTypes: {
    confirmCb: _react.PropTypes.func.isRequired,
    cancelCb: _react.PropTypes.func,
    title: _react.PropTypes.string,
    content: _react.PropTypes.string.isRequired,
    confirmBtn: _react.PropTypes.string,
    cancelBtn: _react.PropTypes.string,
    cancelOnTouch: _react.PropTypes.bool,
    show: _react.PropTypes.bool,
    withMask: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      confirmBtn: '确定',
      content: '确定执行该操作？',
      cancelOnTouch: false,
      prefixCls: 'rc-confirm',
      className: '',
      show: true
    };
  },
  _touchMask: function _touchMask() {
    if (this.props.cancelOnTouch && this.props.cancelCb) {
      this.props.cancelCb();
    }
  },
  render: function render() {
    var _props = this.props;
    var show = _props.show;
    var withMask = _props.withMask;
    var prefixCls = _props.prefixCls;
    var className = _props.className;
    var content = _props.content;
    var confirmBtn = _props.confirmBtn;
    var cancelBtn = _props.cancelBtn;
    var confirmCb = _props.confirmCb;
    var cancelCb = _props.cancelCb;
    var title = _props.title;

    var cls = prefixCls + ' ' + className;
    var modalCls = 'modal modal-' + (show ? 'in' : 'out');

    return _react2.default.createElement(
      'div',
      { className: cls },
      _react2.default.createElement(
        'div',
        { className: modalCls },
        _react2.default.createElement(
          'div',
          { className: 'modal-inner' },
          function () {
            if (title) {
              return _react2.default.createElement(
                'div',
                { className: 'modal-title' },
                title
              );
            }
          }(),
          _react2.default.createElement(
            'div',
            { className: 'modal-text' },
            content
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-buttons' },
          function () {
            if (cancelBtn) {
              return _react2.default.createElement(
                'span',
                { onClick: cancelCb, className: 'modal-button' },
                cancelBtn
              );
            }
          }(),
          _react2.default.createElement(
            'span',
            { onClick: confirmCb, className: 'modal-button' },
            confirmBtn
          )
        )
      ),
      _react2.default.createElement(_Overlay2.default, { show: show, withMask: withMask, touchMask: this._touchMask })
    );
  }
});