'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'rc-lazyload',

  propTypes: {
    children: _react.PropTypes.node.isRequired,
    threshold: _react.PropTypes.number,
    height: _react.PropTypes.string.isRequired,
    width: _react.PropTypes.string.isRequired,
    loadFunc: _react.PropTypes.func,
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      threshold: 0,
      width: '100%',
      prefixCls: 'rc-lazy',
      className: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('scroll', this._onWindowScroll, true);
    window.addEventListener('resize', this._onWindowScroll);
    this._onWindowScroll();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._onVisible();
  },
  _onWindowScroll: function _onWindowScroll() {
    var el = _reactDom2.default.findDOMNode(this);
    var rect = el.getBoundingClientRect();

    var hVisible = rect.left <= 0 || rect.left < window.innerWidth + this.props.threshold;
    var vVisible = rect.top <= 0 || rect.top < window.innerHeight + this.props.threshold;

    if (hVisible && vVisible) {
      this._onVisible();
      this.props.loadFunc();
    }
  },
  _onVisible: function _onVisible() {
    window.removeEventListener('scroll', this._onWindowScroll, true);
    window.removeEventListener('resize', this._onWindowScroll);
    this.setState({
      visible: true
    });
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var height = _props.height;
    var width = _props.width;
    var prefixCls = _props.prefixCls;
    var className = _props.className;

    var cls = prefixCls + ' ' + (this.state.visible ? prefixCls + '-loaded' : '') + ' ' + className;
    var view = undefined;
    if (this.state.visible) {
      view = _react2.default.createElement(
        'div',
        { className: cls },
        ' ',
        children,
        ' '
      );
    } else {
      view = _react2.default.createElement('div', { className: cls, style: { height: height, width: width } });
    }
    return view;
  }
});