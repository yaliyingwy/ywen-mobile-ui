import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Modal } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      show: false,
    };
  }


  render() {
    const { show } = this.state;
    let modal;
    if (show) {
      modal = (
        <Modal className="modal" touchFunc={() => this.setState({ show: false })}>
          <div className="content">
            我是一个自定义的弹窗，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
          </div>
        </Modal>
      );
    }
    return (
      <div className="page">
        <div>用户自己控制弹窗的显示</div>
        <div className="button" onClick={() => this.setState({ show: true })}>显示弹窗</div>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
