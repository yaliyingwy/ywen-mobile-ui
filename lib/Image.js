'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _assetsImgDefaultPng = require('../assets/img/default.png');

var _assetsImgDefaultPng2 = _interopRequireDefault(_assetsImgDefaultPng);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-image',

  propTypes: {
    lazy: _react.PropTypes.bool,
    errorPic: _react.PropTypes.string,
    src: _react.PropTypes.string.isRequired,
    threshold: _react.PropTypes.number,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      lazy: true,
      threshold: 0,
      prefixCls: 'rc-image',
      className: '',
      errorPic: _assetsImgDefaultPng2['default']
    };
  },

  getInitialState: function getInitialState() {
    return {
      visible: !this.props.lazy,
      loaded: false,
      error: false
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.lazy) {
      window.addEventListener('scroll', this._onWindowScroll, true);
      window.addEventListener('resize', this._onWindowScroll);
      this._onWindowScroll();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.lazy) {
      this._onVisible();
    }
  },

  _checkVisible: function _checkVisible() {
    if (!this.state.visible) {
      this._onWindowScroll();
    }
  },

  _onWindowScroll: function _onWindowScroll() {
    var container = this.refs.container;

    var rect = container.getBoundingClientRect();

    var hVisible = rect.left <= 0 || rect.left < window.innerWidth + this.props.threshold;
    var vVisible = rect.top <= 0 || rect.top < window.innerHeight + this.props.threshold;

    if (hVisible && vVisible) {
      this._onVisible();
    }
  },

  _onVisible: function _onVisible() {
    window.removeEventListener('scroll', this._onWindowScroll, true);
    window.removeEventListener('resize', this._onWindowScroll);
    this.setState({
      visible: true
    });
  },

  _onLoad: function _onLoad() {
    this.setState({
      loaded: true
    });
  },

  _onErr: function _onErr() {
    this.setState({
      error: true
    });
  },

  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var src = _props.src;
    var errorPic = _props.errorPic;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['prefixCls', 'src', 'errorPic', 'className']);

    var _state = this.state;
    var visible = _state.visible;
    var loaded = _state.loaded;
    var error = _state.error;

    var cls = prefixCls + '  ' + className;
    var imgCls = prefixCls + (loaded ? '-loaded' : '-unload');
    if (visible) {
      props.src = error ? errorPic : src;
    }

    return _react2['default'].createElement(
      'div',
      { ref: 'container', className: cls },
      (function () {
        if (!loaded && !error) {
          return _react2['default'].createElement('div', { className: prefixCls + '-preloader' });
        }
      })(),
      _react2['default'].createElement('img', _extends({ className: imgCls, onLoad: this._onLoad, onError: this._onErr }, props))
    );
  }
});
module.exports = exports['default'];