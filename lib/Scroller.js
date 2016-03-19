'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scroller = require('scroller');

var _scroller2 = _interopRequireDefault(_scroller);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-scroller',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    children: _react.PropTypes.node,
    options: _react.PropTypes.object,
    width: _react.PropTypes.string,
    height: _react.PropTypes.string,
    contentWidth: _react.PropTypes.string,
    contentHeight: _react.PropTypes.string,
    onScroll: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-scroller',
      contentWidth: '100%',
      contentHeight: '100%',
      options: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      scrollLeft: 0,
      scrollTop: 0
    };
  },

  componentDidMount: function componentDidMount() {
    this.createScroller();
    this.updateScrollingDimensions();
  },

  createScroller: function createScroller() {
    this.scroller = new _scroller2['default'](this.handleScroll, this.props.options);
  },

  updateScrollingDimensions: function updateScrollingDimensions() {
    var _refs = this.refs;
    var container = _refs.container;
    var content = _refs.content;

    this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
  },

  handleTouchStart: function handleTouchStart(e) {
    if (this.scroller) {
      this.scroller.doTouchStart(e.touches, e.timeStamp);
    }
  },

  handleTouchMove: function handleTouchMove(e) {
    if (this.scroller) {
      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }
  },

  handleTouchEnd: function handleTouchEnd(e) {
    if (this.scroller) {
      this.scroller.doTouchEnd(e.timeStamp);
      if (this.props.snapping) {
        this.updateScrollingDeceleration();
      }
    }
  },

  handleScroll: function handleScroll(left, top) {
    this.setState({ scrollTop: top, scrollLeft: left });
    if (this.props.onScroll) {
      this.props.onScroll({ left: left, top: top });
    }
  },

  scrollTo: function scrollTo(left, top, animate, zoom) {
    this.scroller.scrollTo(left, top, animate, zoom);
  },

  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var className = _props.className;
    var children = _props.children;
    var contentWidth = _props.contentWidth;
    var contentHeight = _props.contentHeight;
    var width = _props.width;
    var height = _props.height;
    var _state = this.state;
    var scrollLeft = _state.scrollLeft;
    var scrollTop = _state.scrollTop;

    var cls = prefixCls + ' ' + className;

    return _react2['default'].createElement(
      'div',
      {
        ref: 'container',
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        className: cls,
        style: { width: width, height: height }
      },
      _react2['default'].createElement(
        'div',
        { ref: 'content', className: prefixCls + '-content', style: { width: contentWidth, height: contentHeight, transform: 'translate3D(' + -scrollLeft + 'px, ' + -scrollTop + 'px, 0)' } },
        children
      )
    );
  }
});
module.exports = exports['default'];