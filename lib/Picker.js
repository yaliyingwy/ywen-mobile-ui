'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scroller = require('./Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

exports['default'] = _react2['default'].createClass({
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

    var itemGroups = this.props.itemGroups;

    this.rem = document.documentElement.style.fontSize.replace('px', '');
    itemGroups.forEach(function (group, index) {
      var scroller = _this.refs['scroller_' + index];
      scroller.setSnapSize(0, 2 * _this.rem);
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var itemGroups = this.props.itemGroups;

    itemGroups.forEach(function (group, index) {
      if (group.length !== nextProps.itemGroups[index].length) {
        setTimeout(_this2.updateScrollingDimensions.bind(_this2, index), 100);
      }
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

    var height = scroller.refs.content.offsetHeight;
    var max = itemGroups[group].length - 1;
    var index = max - (height - top - 10 * this.rem) / (2 * this.rem);
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
    var _this3 = this;

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
        return _react2['default'].createElement(
          'p',
          { ref: 'item_' + i, className: itemCls, key: i },
          item
        );
      });
      var contentHeight = 2 * group.length + 8 + 'rem';

      var scroller = _react2['default'].createElement(
        _Scroller2['default'],
        {
          ref: 'scroller_' + index,
          key: index,
          options: options,
          onScroll: _this3._onScroll.bind(_this3, index),
          scrollingComplete: _this3._scrollEnd.bind(_this3, index),
          width: '100%',
          height: '10rem',
          contentWidth: '100%',
          contentHeight: contentHeight
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

    return _react2['default'].createElement(
      'div',
      { className: cls },
      _react2['default'].createElement(
        'div',
        { className: containerCls },
        _react2['default'].createElement(
          'div',
          { className: barCls },
          _react2['default'].createElement(
            'a',
            { className: 'btn', onClick: this._cancel },
            '取消'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'btn', onClick: this._confirm },
            '确定'
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: contentCls },
          _react2['default'].createElement('div', { className: lineCls }),
          groups
        )
      ),
      _react2['default'].createElement('div', { className: modalCls })
    );
  }
});
module.exports = exports['default'];