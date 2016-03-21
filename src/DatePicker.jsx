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

    return {
      selectYear: startYear,
      selectMonth: startMonth,
      selectDay: startDay,
      startMonth,
      startDay,
      endMonth,
      endDay,
      years,
      months,
      days,  
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
        };
        if (months.length !== newMonths.length) {
          const minMonth = Number.parseInt(newMonths[0], 10);
          const maxMonth = Number.parseInt(newMonths[newMonths.length - 1], 10);
          state.selectMonth = valueBetween({
            max: maxMonth,
            min: minMonth,
            value: selectMonth,
          });
        }

        if (days.length !== newDays.length) {
          const minDay = Number.parseInt(newDays[0], 10);
          const maxDay = Number.parseInt(newDays[newDays.length - 1], 10);
          state.selectDay = valueBetween({
            max: maxDay,
            min: minDay,
            value: selectDay,
          });
        }

        this.setState(state);
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
    } else if (group === 2) {
      const day = Number.parseInt(days[index], 10);
      this.setState({
        selectDay: day,
      });
    }
  },

  _seletDate() {
    const { selectYear, selectMonth, selectDay } = this.state;
    this.props.selectDate({
      year: selectYear,
      month: selectMonth,
      day: selectDay,
    });
  },

  show() {
    this.refs.picker.show();
  },

  close() {
    this.refs.picker.close();
  },

  render() {
    const { years, months, days } = this.state;
    const itemGroups = [years, months, days];
    return <Picker ref="picker" confirmFunc={ this._seletDate } itemGroups={ itemGroups } selectItem={ this._selectItem } />;
  },
});
