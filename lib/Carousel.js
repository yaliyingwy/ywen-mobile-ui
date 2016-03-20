'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scroller = require('./Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-carousel',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    showPager: _react.PropTypes.bool,
    autoPlay: _react.PropTypes.bool,
    playTime: _react.PropTypes.number,
    width: _react.PropTypes.string.isRequired,
    height: _react.PropTypes.string.isRequired,
    clickFunc: _react.PropTypes.func.isRequired,
    images: _react.PropTypes.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-carousel',
      className: '',
      showPager: true,
      autoPlay: true,
      playTime: 5000
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentIndex: 0
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    var _props = this.props;
    var autoPlay = _props.autoPlay;
    var playTime = _props.playTime;

    if (autoPlay) {
      this.interval = setInterval(function () {
        var images = _this.props.images;
        var currentIndex = _this.state.currentIndex;

        var nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        var _refs = _this.refs;
        var container = _refs.container;
        var scroller = _refs.scroller;

        if (images.length === 0 || !scroller) {
          throw new Error('images数组里必须有东西，异步网络请求请做判断');
        }
        scroller.scrollTo(nextIndex * container.clientWidth, 0, true, 1);
      }, playTime);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },

  _onScroll: function _onScroll(_ref) {
    var left = _ref.left;
    var images = this.props.images;
    var container = this.refs.container;

    if (!container || left <= 0) {
      return;
    }
    var width = container.clientWidth;
    // 当前最大的可见页
    var offset = left / width;
    var visibleIndex = Math.min(Math.ceil(offset), images.length - 1);
    var currentIndex = Math.min(Math.round(offset), images.length - 1);
    this.refs['img' + visibleIndex]._checkVisible();
    if (currentIndex !== this.state.currentIndex) {
      this.setState({ currentIndex: currentIndex });
    }
  },

  render: function render() {
    var _this2 = this;

    var currentIndex = this.state.currentIndex;
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var className = _props2.className;
    var width = _props2.width;
    var height = _props2.height;
    var images = _props2.images;
    var clickFunc = _props2.clickFunc;

    var options = {
      scrollingX: true,
      scrollingY: false,
      paging: true
    };

    var cls = prefixCls + '  ' + className;
    var contentCls = prefixCls + '-content';
    var paginationCls = prefixCls + '-pagination';

    var imgCells = [];
    var pageCells = [];
    images.forEach(function (image, index) {
      imgCells.push(_react2['default'].createElement(_Image2['default'], { onClick: clickFunc.bind(_this2, index), ref: 'img' + index, key: index, src: image }));
      var paginationItemCls = prefixCls + '-pagination-item ' + (currentIndex === index ? 'active' : '');
      pageCells.push(_react2['default'].createElement('span', { className: paginationItemCls, key: index }));
    });

    var contentWidth = width.replace(/^(\d+)*/, function (num) {
      return num * images.length;
    });

    var sWidth = undefined;
    if (width.includes('%')) {
      sWidth = '100%';
    } else {
      sWidth = width;
    }

    return _react2['default'].createElement(
      'div',
      { ref: 'container', className: cls, style: { width: width, height: height } },
      _react2['default'].createElement(
        'div',
        { className: contentCls },
        _react2['default'].createElement(
          _Scroller2['default'],
          {
            ref: 'scroller',
            options: options,
            onScroll: this._onScroll,
            width: sWidth,
            height: '100%',
            contentWidth: contentWidth,
            height: height
          },
          imgCells
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: paginationCls },
        pageCells
      )
    );
  }
});
module.exports = exports['default'];