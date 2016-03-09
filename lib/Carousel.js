'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import ReactDom from 'react-dom';

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-carousel',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    showPager: _react.PropTypes.bool,
    autoPlay: _react.PropTypes.bool,
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
      autoPlay: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      loadedIndex: 1,
      currentIndex: 0,
      offset: 0
    };
  },

  _touchMove: function _touchMove(e) {
    console.log(e.nativeEvent);
  },

  render: function render() {
    var _this = this;

    var _state = this.state;
    var loadedIndex = _state.loadedIndex;
    var currentIndex = _state.currentIndex;
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var className = _props.className;
    var width = _props.width;
    var height = _props.height;
    var images = _props.images;
    var clickFunc = _props.clickFunc;

    // const transform = `translate3D(${offset}px,0,0)`;

    var cls = prefixCls + '  ' + className;
    var imgCells = [];
    var pageCells = [];
    images.forEach(function (image, index) {
      // lazy load image
      if (index < loadedIndex) {
        imgCells.push(_react2['default'].createElement('img', { onClick: clickFunc.bind(_this, index), key: index, src: image, style: { width: '100%', height: '100%' } }));
      } else {
        imgCells.push(_react2['default'].createElement('img', { onClick: clickFunc.bind(_this, index), key: index, src: image, style: { width: '100%', height: '100%' } }));
      }

      var pageCls = 'swiper-pagination-bullet ' + (index === currentIndex ? 'swiper-pagination-bullet-active' : '');
      pageCells.push(_react2['default'].createElement('span', { key: index, className: pageCls }));
    });

    return _react2['default'].createElement(
      'div',
      { className: cls, style: { width: width, height: height } },
      _react2['default'].createElement(
        'div',
        { className: 'swiper-wrapper', onTouchMove: this._touchMove, style: { width: width, height: height, overflowX: 'scroll' } },
        imgCells
      ),
      _react2['default'].createElement(
        'div',
        { className: 'swiper-pagination' },
        pageCells
      )
    );
  }
});
module.exports = exports['default'];