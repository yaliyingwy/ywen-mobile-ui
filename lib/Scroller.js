'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scroller = require('scroller');

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
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
    onScroll: _react.PropTypes.func,
    scrollingComplete: _react.PropTypes.func
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
  componentDidUpdate: function componentDidUpdate(prevProps) {
    var _props = this.props;
    var width = _props.width;
    var height = _props.height;
    var contentWidth = _props.contentWidth;
    var contentHeight = _props.contentHeight;

    if (prevProps.contentWidth != contentWidth || prevProps.contentHeight != contentHeight) {
      this.updateScrollingDimensions();
    }
  },
  setSnapSize: function setSnapSize(width, height) {
    this.scroller.setSnapSize(width, height);
  },
  setPosition: function setPosition(left, top) {
    this.scroller.setPosition(left, top);
  },
  getValues: function getValues() {
    return this.scroller.getValues();
  },
  createScroller: function createScroller() {
    var options = this.props.options;

    var newOpt = Object.create(options);
    newOpt.scrollingComplete = this.scrollComplete;
    this.scroller = new _scroller2.default(this.handleScroll, newOpt);
  },
  updateScrollingDimensions: function updateScrollingDimensions(width, height, contentWidth, contentHeight) {
    if (width && height && contentWidth && contentHeight) {
      this.scroller.setDimensions(width, height, contentWidth, contentHeight);
    } else {
      var _refs = this.refs;
      var container = _refs.container;
      var content = _refs.content;

      this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
    }
  },
  scrollComplete: function scrollComplete() {
    var func = this.props.scrollingComplete || this.props.options.scrollingComplete;
    if (func) {
      func();
    }
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
      // if (this.props.options.snapping) {
      //   this.updateScrollingDeceleration();
      // }
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
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var className = _props2.className;
    var children = _props2.children;
    var contentWidth = _props2.contentWidth;
    var contentHeight = _props2.contentHeight;
    var width = _props2.width;
    var height = _props2.height;
    var _state = this.state;
    var scrollLeft = _state.scrollLeft;
    var scrollTop = _state.scrollTop;

    var cls = prefixCls + ' ' + className;
    var translate = 'translate3D(' + -scrollLeft + 'px, ' + -scrollTop + 'px, 0)';
    var style = {
      WebkitTransform: translate,
      MozTransform: translate,
      transform: translate,
      width: contentWidth,
      height: contentHeight
    };

    return _react2.default.createElement(
      'div',
      {
        ref: 'container',
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        className: cls,
        style: { width: width, height: height }
      },
      _react2.default.createElement(
        'div',
        { ref: 'content', className: prefixCls + '-content', style: style },
        children
      )
    );
  }
});