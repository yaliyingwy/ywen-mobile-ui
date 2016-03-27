'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsDomUtil = require('./utils/DomUtil');

// @todo: pullToRefresh
exports['default'] = _react2['default'].createClass({
  displayName: 'rc-listview',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    loadMore: _react.PropTypes.func.isRequired,
    refresh: _react.PropTypes.func,
    threshold: _react.PropTypes.number,
    hasMore: _react.PropTypes.bool,
    children: _react.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-listview',
      className: '',
      threshold: 0,
      hasMore: true
    };
  },

  componentDidMount: function componentDidMount() {
    this._attachScrollListener();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._attachScrollListener();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._detachScrollListener();
  },

  _attachScrollListener: function _attachScrollListener() {
    if (this.props.hasMore) {
      window.addEventListener('touchmove', this._onScroll);
      this._onScroll();
    }
  },

  _detachScrollListener: function _detachScrollListener() {
    window.removeEventListener('touchmove', this._onScroll);
  },

  _onScroll: function _onScroll() {
    var el = _reactDom2['default'].findDOMNode(this);

    var lastEl = el.lastElementChild;
    if (!lastEl) {
      return;
    }
    var scrollParent = (0, _utilsDomUtil.getScrollParent)(lastEl);
    var offset = {
      top: this.props.threshold,
      left: 0,
      bottom: 0,
      right: 0
    };
    var visible = (0, _utilsDomUtil.inViewport)(lastEl, scrollParent, offset);

    if (visible) {
      this._detachScrollListener();
      this.props.loadMore();
    }
  },

  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var className = _props.className;

    var cls = prefixCls + ' ' + className;
    return _react2['default'].createElement(
      'div',
      { className: cls },
      this.props.children
    );
  }
});
module.exports = exports['default'];