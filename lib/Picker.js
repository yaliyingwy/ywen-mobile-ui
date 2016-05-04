'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scroller = require('./Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'rc-picker',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    itemGroups: _react.PropTypes.array.isRequired,
    selectItem: _react.PropTypes.func.isRequired,
    confirmFunc: _react.PropTypes.func.isRequired,
    cancelFunc: _react.PropTypes.func,
    onScroll: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-picker',
      className: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      show: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.scrollerHeight = this.refs.scrollers.offsetHeight;
    this.cellHeight = this.refs.center_line.offsetHeight;
    this.scrollerPadding = (this.scrollerHeight - this.cellHeight) / 2;
    var itemGroups = this.props.itemGroups;

    itemGroups.forEach(function (group, index) {
      var scroller = _this.refs['scroller_' + index];
      scroller.setSnapSize(0, _this.cellHeight);
      scroller.updateScrollingDimensions();
    });
  },
  show: function show() {
    this.setState({ show: true });
  },
  close: function close() {
    this.setState({ show: false });
  },
  updateScrollingDimensions: function updateScrollingDimensions(group) {
    this.refs['scroller_' + group].updateScrollingDimensions();
  },
  scrollToIndex: function scrollToIndex(group, index, anim) {
    var scroller = this.refs['scroller_' + group];
    var y = index * this.cellHeight;
    if (anim) {
      scroller.scrollTo(0, y, true, 1);
    } else {
      scroller.setPosition(0, y);
    }
  },
  _onScroll: function _onScroll(group, _ref) {
    var top = _ref.top;
    var onScroll = this.props.onScroll;

    if (onScroll) {
      onScroll({ group: group, top: top });
    }
  },
  _scrollEnd: function _scrollEnd(group) {
    this._updateSelectItem(group);
  },
  _updateSelectItem: function _updateSelectItem(group) {
    var _props = this.props;
    var itemGroups = _props.itemGroups;
    var selectItem = _props.selectItem;

    var scroller = this.refs['scroller_' + group];

    var _scroller$getValues = scroller.getValues();

    var top = _scroller$getValues.top;

    var max = itemGroups[group].length - 1;
    var index = top / this.cellHeight;
    index = Math.min(max, Math.max(0, Math.floor(index)));
    selectItem({ group: group, index: index });
  },
  _confirm: function _confirm() {
    this.close();
    if (this.props.confirmFunc) {
      this.props.confirmFunc();
    }
  },
  _cancel: function _cancel() {
    this.close();
    if (this.props.cancelFunc) {
      this.props.cancelFunc();
    }
  },
  render: function render() {
    var _this2 = this;

    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var className = _props2.className;
    var itemGroups = _props2.itemGroups;

    var options = {
      scrollingX: false,
      scrollingY: true,
      snapping: true
    };

    var show = this.state.show;

    var groups = itemGroups.map(function (group, index) {
      var itemList = group.map(function (item, i) {
        var itemCls = prefixCls + '-item';
        return _react2.default.createElement(
          'p',
          { className: itemCls, key: i },
          item
        );
      });
      var contentHeight = group.length * _this2.cellHeight + 2 * _this2.scrollerPadding;

      var scroller = _react2.default.createElement(
        _Scroller2.default,
        {
          ref: 'scroller_' + index,
          key: index,
          options: options,
          onScroll: _this2._onScroll.bind(_this2, index),
          scrollingComplete: _this2._scrollEnd.bind(_this2, index),
          width: '100%',
          height: '10rem',
          contentWidth: '100%',
          contentHeight: '' + (contentHeight || 1000)
        },
        itemList
      );
      return scroller;
    });

    var cls = prefixCls + '  ' + className;
    var containerCls = prefixCls + '-container ' + (show ? 'picker-in' : '');
    var barCls = prefixCls + '-bar';
    var contentCls = prefixCls + '-content';
    var modalCls = prefixCls + '-modal ' + (show ? 'modal-in' : '');
    var lineCls = prefixCls + '-line';

    return _react2.default.createElement(
      'div',
      { className: cls },
      _react2.default.createElement(
        'div',
        { className: containerCls },
        _react2.default.createElement(
          'div',
          { className: barCls },
          _react2.default.createElement(
            'a',
            { className: 'btn', onClick: this._cancel },
            '取消'
          ),
          _react2.default.createElement(
            'a',
            { className: 'btn', onClick: this._confirm },
            '确定'
          )
        ),
        _react2.default.createElement(
          'div',
          { ref: 'scrollers', className: contentCls },
          _react2.default.createElement('div', { ref: 'center_line', className: lineCls }),
          groups
        )
      ),
      _react2.default.createElement('div', { className: modalCls })
    );
  }
});