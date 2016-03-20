'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require('../assets/less/index.less');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Confirm = require('./Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

var _Toast = require('./Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _ListView = require('./ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _LazyLoad = require('./LazyLoad');

var _LazyLoad2 = _interopRequireDefault(_LazyLoad);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _Scroller = require('./Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _ImageUploader = require('./ImageUploader');

var _ImageUploader2 = _interopRequireDefault(_ImageUploader);

var _Raty = require('./Raty');

var _Raty2 = _interopRequireDefault(_Raty);

var _ID = '_ywen_mobile_ui';

var RC_OVERLAY = Symbol('Overlay');
var RC_CONFIRM = Symbol('Confirm');
var RC_TOAST = Symbol('Toast');
var RC_LOADING = Symbol('Loading');
var RC_NONE = Symbol('None');

var _modalInstance = undefined;

var Modal = _react2['default'].createClass({
  displayName: 'rc-modal',

  getInitialState: function getInitialState() {
    return {
      show: false,
      type: RC_NONE
    };
  },

  componentDidMount: function componentDidMount() {
    _modalInstance = this;
  },

  render: function render() {
    var _this = this;

    var _state = this.state;
    var type = _state.type;
    var show = _state.show;
    var props = _state.props;

    var modal = undefined;
    switch (type) {
      case RC_OVERLAY:
        modal = _react2['default'].createElement(_Overlay2['default'], _extends({ show: show }, props));
        break;
      case RC_CONFIRM:
        var confirmCb = props.confirmCb,
            cancelCb = props.cancelCb,
            reset = _objectWithoutProperties(props, ['confirmCb', 'cancelCb']);

        var newConfirmCb = function newConfirmCb() {
          _this.setState({ show: false });
          confirmCb();
        };

        var newCancelCb = function newCancelCb() {
          _this.setState({ show: false });
          cancelCb();
        };
        modal = _react2['default'].createElement(_Confirm2['default'], _extends({ confirmCb: newConfirmCb, cancelCb: newCancelCb, show: show }, reset));
        break;
      case RC_TOAST:
        modal = _react2['default'].createElement(_Toast2['default'], _extends({ show: show }, props));
        break;
      case RC_LOADING:
        modal = _react2['default'].createElement(_Loading2['default'], _extends({ show: show }, props));
        break;
      default:
        modal = _react2['default'].createElement('div', null);
    }
    return modal;
  }
});

var _toastTimeout = null;

var div = document.getElementById(_ID);
if (Object.is(div, null)) {
  div = document.createElement('div');
  div.id = _ID;
  document.body.appendChild(div);
}

_reactDom2['default'].render(_react2['default'].createElement(Modal, null), div);

function _render(type, props) {
  if (_toastTimeout) {
    clearTimeout(_toastTimeout);
  }

  if (type === RC_TOAST) {
    _toastTimeout = setTimeout(function () {
      return _modalInstance.setState({ show: false });
    }, props.showTime || 1500);
  }
  _modalInstance.setState({ type: type, props: props, show: true });
}

function dismiss() {
  _modalInstance.setState({ show: false });
}

function showOverlay(props) {
  _render(RC_OVERLAY, props);
}

function showConfirm(props) {
  _render(RC_CONFIRM, props);
}

function showToast(props) {
  _render(RC_TOAST, props);
}

function showLoading(props) {
  _render(RC_LOADING, props);
}

exports.showOverlay = showOverlay;
exports.showConfirm = showConfirm;
exports.showToast = showToast;
exports.showLoading = showLoading;
exports.dismiss = dismiss;
exports.Overlay = _Overlay2['default'];
exports.Confirm = _Confirm2['default'];
exports.Toast = _Toast2['default'];
exports.Image = _Image2['default'];
exports.ListView = _ListView2['default'];
exports.LazyLoad = _LazyLoad2['default'];
exports.Progress = _Progress2['default'];
exports.Carousel = _Carousel2['default'];
exports.Scroller = _Scroller2['default'];
exports.ImageUploader = _ImageUploader2['default'];
exports.Raty = _Raty2['default'];