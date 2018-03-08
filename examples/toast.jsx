import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Toast, showToast } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.showToastRandom = this.showToastRandom.bind(this);
    this.showToast = this.showToast.bind(this);
    this.state = {
      show: false,
      position: 'center',
    };
  }

  showToast() {
    showToast(`我是showToast函数，1.5秒后消失, now: ${Date.now()}`);
    setTimeout(() => {
      showToast(`模拟多个showToast短时间内调用, now: ${Date.now()}`);
    }, 1000);
  }

  showToastRandom() {
    const positionList = ['top', 'center', 'bottom'];
    const position = positionList[Math.floor(Math.random() * positionList.length)];
    this.setState({ show: true, position });
    setTimeout(() => {
      this.setState({ show: false });
    }, 2000);
  }


  render() {
    const { show, position } = this.state;

    let toast;
    if (show) {
      toast = <Toast text={`toast Date:${Date.now()},  2s 后消失`} position={position} />;
    }
    
    return (
      <div className="page">
        <div>用户自己控制toast，随机出现在上中下三个位置</div>
        <div className="button" onClick={this.showToastRandom}>显示toast</div>
        {toast}
        <div>直接使用showToast</div>
        <div className="button" onClick={this.showToast}>显示toast</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
