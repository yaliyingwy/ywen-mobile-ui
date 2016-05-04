import React, {PropTypes} from 'react';
import Picker from './Picker';
import { valueBetween } from './utils/util';

export default React.createClass({
  displayName: 'rc-date-picker',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    selectDate: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['Date', 'DateTime'])
  },

  getDefaultProps() {
    const now = new Date();
    const end = new Date();
    end.setFullYear(now.getFullYear() + 10);
    return {
      prefixCls: 'rc-date-picker',
      className: '',
      startDate: now,
      endDate: end,
      type: 'Date',
    };
  },

  getInitialState() {
    const { startDate, endDate } = this.props;
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();

    const years = this._getYears(startYear, endYear);
    const months = this._getMonths(startMonth);
    const days = this._getDaysInMonth(startMonth, startYear, startDay);

    const hours = this._getHours();
    const minutes = this._getMinutes();

    return {
      selectYear: startYear,
      selectMonth: startMonth,
      selectDay: startDay,
      selectHour: 0,
      selectMinute: 0,
      startYear,
      startMonth,
      startDay,
      endMonth,
      endDay,
      years,
      months,
      days,
      hours,
      minutes,  
    };
  },

  _getYears(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year + '年');
    }
    return years;
  },

  _getMonths(start = 1, end = 12) {
    const months = [];
    for (let month = start; month <= end; month++) {
      months.push(month + '月');
    }
    return months;
  },

  _getDaysInMonth(month, year, start = 1, end = 31) {
    const date = new Date(year, month - 1, start);
    const days = [];
    while (date.getMonth() === month - 1 && date.getDate() <= end) {
      days.push(new Date(date).getDate() + '日');
      date.setDate(date.getDate() + 1);
    }
    return days;
  },

  _getHours() {
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      hours.push(hour + '时');
    }
    return hours;
  },

  _getMinutes() {
    const minutes = [];
    for (let minute = 0; minute < 60; minute++) {
      minutes.push(minute + '分');
    }
    return minutes;
  },

  _selectItem({ group, index }) {
    const {
      years,
      months,
      days,
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay,
      selectYear,
      selectMonth,
      selectDay,
    } = this.state;

    if (group === 0) {
      const year = Number.parseInt(years[index], 10);
      if (selectYear !== year) {
        const startM = startYear === year ? startMonth : 1;
        const endM = endYear === year ? endMonth : 12;
        const newMonths = this._getMonths(startM, endM);
        const startD = startYear === year && startM === startMonth ? startDay : 1;
        const endD = endYear === year && endM === endMonth ? endDay : 31;
        const newDays = this._getDaysInMonth(startM, year, startD, endD);
        const state = {
          months: newMonths,
          days: newDays,
          selectYear: year,
          selectMonth: parseInt(newMonths[0], 10),
          selectDay: parseInt(newDays[0], 10),
        };

        this.setState(state);
        setTimeout(() => {
          this.refs.picker.scrollToIndex(1, 0, true);
          this.refs.picker.scrollToIndex(2, 0, true);           
        }, 100);
        
      }
    } else if (group === 1) {
      const month = Number.parseInt(months[index], 10);
      const startD = startYear === selectYear && month === startMonth ? startDay : 1;
      const endD = endYear === selectYear && month === endMonth ? endDay : 31;
      const newDays = this._getDaysInMonth(month, selectYear, startD, endD);
      this.setState({
        days: newDays,
        selectMonth: month,
        selectDay: Number.parseInt(newDays[0], 10),
      });
      setTimeout(() => {
        this.refs.picker.scrollToIndex(2, 0, true);           
      }, 100);
    } else if (group === 2) {
      const day = Number.parseInt(days[index], 10);
      this.setState({
        selectDay: day,
      });
    } else if (group === 3) {
      this.setState({
        selectHour: index,
      });
    } else if (group === 4) {
      this.setState({
        selectMinute: index,
      });
    }
  },

  _seletDate() {
    const { selectYear, selectMonth, selectDay, selectHour, selectMinute } = this.state;
    this.props.selectDate({
      year: selectYear,
      month: selectMonth,
      day: selectDay,
      hour: selectHour,
      minute: selectMinute,
    });
  },

  show() {
    this.refs.picker.show();
  },

  close() {
    this.refs.picker.close();
  },

  render() {
    const { years, months, days, hours, minutes } = this.state;
    const { type } = this.props;
    const itemGroups = [years, months, days];
    if (type === 'DateTime') {
      itemGroups.push(hours);
      itemGroups.push(minutes);
    }
    return <Picker ref="picker" confirmFunc={ this._seletDate } itemGroups={ itemGroups } selectItem={ this._selectItem } />;
  },
});
