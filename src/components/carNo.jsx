import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

import { CARNO_MODAL } from '../utils/modalUtil';

const HANZI = 'HANZI';
const SPECIAL = 'SPECIAL';
const ABC = 'ABC';

class CarNo extends PureComponent {
  static propTypes = {
    carNo: PropTypes.string,
  }
  static defaultProps ={
    carNo: '',
  }
  state = {
    carNo: this.props.carNo,
    show: false,
    type: this.props.carNo.length > 0 ? ABC : HANZI,
  }

  specialList = [['使', '领', '警', '学', '挂']]

  provinceList = [
    ['京', '沪', '津', '渝', '黑', '吉', '辽', '蒙', '冀', '新'],
    ['甘', '青', '陕', '宁', '豫', '鲁', '晋', '皖', '鄂', '湘'],
    ['苏', '川', '贵', '黔', '滇', '桂', '藏', '浙', '赣', '粤'],
    ['闽', '台', '琼', '港', '云'],
  ];

  abcList = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z'],
    ['X', 'C', 'V', 'B', 'N', 'M'],
  ];

  add = (value, e) => {
    e.stopPropagation();
    const { carNo, maxLength } = this.state;
    if (carNo.length === maxLength) {
      return;
    }
    const { onChange } = this.props;
    const newNo = `${carNo}${value}`;
    this.setState({
      carNo: newNo,
      type: ABC,
    });
    onChange(newNo);
  }

  del = (e) => {
    e.stopPropagation();
    const { carNo } = this.state;
    const { onChange } = this.props;
    if (carNo.length > 0) {
      const newNo = carNo.substring(0, carNo.length - 1);
      onChange(newNo);
      this.setState({
        carNo: newNo,
        type: newNo.length === 0 ? HANZI : ABC,
      });
    }
  }

  show = (maxLength = 7) => {
    this.setState({ show: true, maxLength });
  }

  close = () => {
    this.setState({ show: false });
  }

  toggleType = (e) => {
    e.stopPropagation();
    const { type, preType } = this.state;
    if (type === SPECIAL) {
      this.setState({ type: preType });
    } else {
      this.setState({ type: SPECIAL, preType: type });
    }
  }

  render() {
    const { carNo, show, type } = this.state;
    if (!show) {
      return null;
    }
    let list;
    switch (type) {
      case HANZI:
        list = this.provinceList;
        break;
      case SPECIAL:
        list = this.specialList;
        break;
      case ABC:
      default:
        list = this.abcList;
        break;
    }
    const rows = list.map((arr, index) => {
      const cells = arr.map((title, subIndex) => {
        return (
          <div className="cell" key={subIndex} onClick={e => this.add(title, e)}>{title}</div>
        );
      });

      let cls;
      if (type === ABC && index === 3) {
        cls = 'keyboard-row small';
      } else if (type === SPECIAL) {
        cls = 'keyboard-row center';
      } else if (type === HANZI && index === 3) {
        cls = 'keyboard-row small5';
      } else {
        cls = 'keyboard-row';
      }
      return (
        <div className={cls} key={index}>{cells}</div>
      );
    });
    return (
      <Modal className="ywen-carno-modal" type={CARNO_MODAL} touchFunc={this.close}>
        <div className="ywen-carno">
          <div className="header">
            <div className={`action-btn ${carNo.length > 0 ? '' : 'hide'}`} onClick={this.del}>删除</div>
            <div className="action-btn" onClick={this.toggleType}>{type === SPECIAL ? '返回' : '特殊'}</div>
            <div className="action-btn" onClick={this.close}>完成</div>
          </div>
          <div className="keyboard">
            {rows}
          </div>
        </div>
      </Modal>
    );
  }
}

CarNo.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CarNo;
