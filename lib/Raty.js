'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'rc-raty',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    enableHalf: _react.PropTypes.bool,
    updateScore: _react.PropTypes.func,
    score: _react.PropTypes.number,
    disable: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-raty',
      className: '',
      enableHalf: true,
      score: 0,
      disable: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      score: this.props.score
    };
  },
  _touchEnd: function _touchEnd(e) {
    if (this.props.disable) {
      return;
    }
    this._computeScore(e.changedTouches[0].clientX, e.target.offsetWidth, true);
  },
  _touchMove: function _touchMove(e) {
    if (this.props.disable) {
      return;
    }
    this._computeScore(e.changedTouches[0].clientX, e.target.offsetWidth);
  },
  _computeScore: function _computeScore(x, starWidth) {
    var update = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var container = this.refs.container;
    var _props = this.props;
    var enableHalf = _props.enableHalf;
    var updateScore = _props.updateScore;

    var offset = x - container.getBoundingClientRect().left;
    var stars = offset / starWidth;
    var score = undefined;
    if (enableHalf) {
      var full = Math.floor(stars);
      var half = Math.round(stars - full);
      score = full * 2 + half;
    } else {
      score = Math.ceil(stars) * 2;
    }
    this.setState({ score: score });
    if (update) {
      updateScore(score);
    }
  },
  render: function render() {
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var className = _props2.className;
    var enableHalf = _props2.enableHalf;

    var cls = prefixCls + '  ' + className;
    var score = this.state.score;

    var scorePerStar = 2;

    var stars = [1, 2, 3, 4, 5].map(function (star) {
      var starCls = prefixCls + '-star ';
      var position = score / scorePerStar;
      if (position >= star) {
        starCls += ' full';
      } else if (enableHalf && star - position === 0.5) {
        starCls += ' half';
      } else {
        starCls += ' empty';
      }
      return _react2.default.createElement('span', { 'data-star': star, key: star, className: starCls });
    });

    return _react2.default.createElement(
      'div',
      { ref: 'container', className: cls, onTouchEnd: this._touchEnd, onTouchMove: this._touchMove },
      stars
    );
  }
});