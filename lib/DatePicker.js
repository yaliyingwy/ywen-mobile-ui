'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _util = require('./utils/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'rc-date-picker',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    startDate: _react.PropTypes.instanceOf(Date),
    endDate: _react.PropTypes.instanceOf(Date),
    selectDate: _react.PropTypes.func.isRequired,
    type: _react.PropTypes.oneOf(['Date', 'DateTime'])
  },

  getDefaultProps: function getDefaultProps() {
    var now = new Date();
    var end = new Date();
    end.setFullYear(now.getFullYear() + 10);
    return {
      prefixCls: 'rc-date-picker',
      className: '',
      startDate: now,
      endDate: end,
      type: 'Date'
    };
  },
  getInitialState: function getInitialState() {
    var _props = this.props;
    var startDate = _props.startDate;
    var endDate = _props.endDate;

    var startYear = startDate.getFullYear();
    var startMonth = startDate.getMonth() + 1;
    var startDay = startDate.getDate();

    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth() + 1;
    var endDay = endDate.getDate();

    var years = this._getYears(startYear, endYear);
    var months = this._getMonths(startMonth, startYear === endYear ? endMonth : 12);
    var days = this._getDaysInMonth(startMonth, startYear, startDay, startYear === endYear && endMonth - startMonth <= 1 && endDay > startDay ? endDay : 31);

    var hours = this._getHours();
    var minutes = this._getMinutes();

    return {
      selectYear: startYear,
      selectMonth: startMonth,
      selectDay: startDay,
      selectHour: 0,
      selectMinute: 0,
      startYear: startYear,
      startMonth: startMonth,
      startDay: startDay,
      endMonth: endMonth,
      endDay: endDay,
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes
    };
  },
  _getYears: function _getYears(startYear, endYear) {
    var years = [];
    for (var year = startYear; year <= endYear; year++) {
      years.push(year + '年');
    }
    return years;
  },
  _getMonths: function _getMonths() {
    var start = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var end = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

    var months = [];
    for (var month = start; month <= end; month++) {
      months.push(month + '月');
    }
    return months;
  },
  _getDaysInMonth: function _getDaysInMonth(month, year) {
    var start = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var end = arguments.length <= 3 || arguments[3] === undefined ? 31 : arguments[3];

    var date = new Date(year, month - 1, start);
    var days = [];
    while (date.getMonth() === month - 1 && date.getDate() <= end) {
      days.push(new Date(date).getDate() + '日');
      date.setDate(date.getDate() + 1);
    }
    return days;
  },
  _getHours: function _getHours() {
    var hours = [];
    for (var hour = 0; hour < 24; hour++) {
      hours.push(hour + '时');
    }
    return hours;
  },
  _getMinutes: function _getMinutes() {
    var minutes = [];
    for (var minute = 0; minute < 60; minute++) {
      minutes.push(minute + '分');
    }
    return minutes;
  },
  _selectItem: function _selectItem(_ref) {
    var _this = this;

    var group = _ref.group;
    var index = _ref.index;
    var _state = this.state;
    var years = _state.years;
    var months = _state.months;
    var days = _state.days;
    var startYear = _state.startYear;
    var startMonth = _state.startMonth;
    var startDay = _state.startDay;
    var endYear = _state.endYear;
    var endMonth = _state.endMonth;
    var endDay = _state.endDay;
    var selectYear = _state.selectYear;
    var selectMonth = _state.selectMonth;
    var selectDay = _state.selectDay;

    if (group === 0) {
      var year = Number.parseInt(years[index], 10);
      if (selectYear !== year) {
        var startM = startYear === year ? startMonth : 1;
        var endM = endYear === year ? endMonth : 12;
        var newMonths = this._getMonths(startM, endM);
        var startD = startYear === year && startM === startMonth ? startDay : 1;
        var endD = endYear === year && endM === endMonth ? endDay : 31;
        var newDays = this._getDaysInMonth(startM, year, startD, endD);
        var state = {
          months: newMonths,
          days: newDays,
          selectYear: year,
          selectMonth: parseInt(newMonths[0], 10),
          selectDay: parseInt(newDays[0], 10)
        };

        this.setState(state);
        setTimeout(function () {
          _this.refs.picker.scrollToIndex(1, 0, true);
          _this.refs.picker.scrollToIndex(2, 0, true);
        }, 100);
      }
    } else if (group === 1) {
      var month = Number.parseInt(months[index], 10);
      var _startD = startYear === selectYear && month === startMonth ? startDay : 1;
      var _endD = endYear === selectYear && month === endMonth ? endDay : 31;
      var _newDays = this._getDaysInMonth(month, selectYear, _startD, _endD);
      this.setState({
        days: _newDays,
        selectMonth: month,
        selectDay: Number.parseInt(_newDays[0], 10)
      });
      setTimeout(function () {
        _this.refs.picker.scrollToIndex(2, 0, true);
      }, 100);
    } else if (group === 2) {
      var day = Number.parseInt(days[index], 10);
      this.setState({
        selectDay: day
      });
    } else if (group === 3) {
      this.setState({
        selectHour: index
      });
    } else if (group === 4) {
      this.setState({
        selectMinute: index
      });
    }
  },
  _seletDate: function _seletDate() {
    var _state2 = this.state;
    var selectYear = _state2.selectYear;
    var selectMonth = _state2.selectMonth;
    var selectDay = _state2.selectDay;
    var selectHour = _state2.selectHour;
    var selectMinute = _state2.selectMinute;

    this.props.selectDate({
      year: selectYear,
      month: selectMonth,
      day: selectDay,
      hour: selectHour,
      minute: selectMinute
    });
  },
  show: function show() {
    this.refs.picker.show();
  },
  close: function close() {
    this.refs.picker.close();
  },
  render: function render() {
    var _state3 = this.state;
    var years = _state3.years;
    var months = _state3.months;
    var days = _state3.days;
    var hours = _state3.hours;
    var minutes = _state3.minutes;
    var type = this.props.type;

    var itemGroups = [years, months, days];
    if (type === 'DateTime') {
      itemGroups.push(hours);
      itemGroups.push(minutes);
    }
    return _react2.default.createElement(_Picker2.default, { ref: 'picker', confirmFunc: this._seletDate, itemGroups: itemGroups, selectItem: this._selectItem });
  }
});