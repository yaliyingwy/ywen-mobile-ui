import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

import { CARNO_MODAL } from '../utils/modalUtil';

class CarNo extends PureComponent {
  state = {
    carNo: '',
    show: false,
  }

  provinceList = [
    ['京', '沪', '津', '渝', '黑', '吉', '辽', '蒙', '冀', '新'],
    ['甘', '青', '陕', '宁', '豫', '鲁', '晋', '皖', '鄂', '湘'],
    ['苏', '川', '贵', '黔', '滇', '桂', '藏', '浙', '赣', '粤'],
    ['闽', '台', '琼', '港', '云', '使', '领', '警', '学'],
  ];

  abcList = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z'],
    ['X', 'C', 'V', 'B', 'N', 'M'],
  ];

  add = (value) => {
    const { carNo, maxLength } = this.state;
    if (carNo.length === maxLength) {
      return;
    }
    const { onChange } = this.props;
    const newNo = `${carNo}${value}`;
    this.setState({
      carNo: newNo,
    });
    onChange(newNo);
  }

  del = () => {
    const { carNo } = this.state;
    const { onChange } = this.props;
    if (carNo.length > 0) {
      const newNo = carNo.substring(0, carNo.length - 1);
      onChange(newNo);
      this.setState({
        carNo: newNo,
      });
    }
  }

  show = (maxLength = 7) => {
    this.setState({ show: true, maxLength });
  }

  close = () => {
    this.setState({ show: false });
  }

  render() {
    const { carNo, show } = this.state;
    if (!show) {
      return null;
    }
    const rows = (carNo.length > 0 ? this.abcList : this.provinceList).map((arr, index) => {
      const cells = arr.map((title, subIndex) => {
        return (
          <div className="cell" key={subIndex} onClick={() => this.add(title)}>{title}</div>
        );
      });
      return (
        <div className={`keyboard-row ${carNo.length > 0 && index === 3 ? 'small' : ''}`} key={index}>{cells}</div>
      );
    });
    return (
      <Modal className="ywen-carno-modal" type={CARNO_MODAL}>
        <div className="ywen-carno">
          <div className="header">
            <div className={`action-btn ${carNo.length > 0 ? '' : 'hide'}`} onClick={this.del}>删除</div>
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
