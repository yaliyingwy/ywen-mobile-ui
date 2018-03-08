import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
/* eslint-disable */
import { Alert } from 'ywen-mobile-ui';
/* eslint-enable */

import '../assets/styles/index.less';
import '../assets/styles/example.less';


document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.clickShowAlert = this.clickShowAlert.bind(this);
    this.state = {
      show: false,
    };
  }

  clickShowAlert() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;

    let alert;
    if (show) {
      const btns = [
        {
          title: '取消',
          action: () => this.setState({ show: false }),
          default: false,
        },
        {
          title: '确定',
          action: () => this.setState({ show: false }),
          default: true,
        },
      ];
      alert = <Alert text="这个alert是个单纯的component,显示控制交给本例中的state负责" btns={btns} />;
    }

    return (
      <div className="page">
        <div>用户自己控制alert的显示关闭</div>
        <div className="button" onClick={this.clickShowAlert}>显示</div>
        {alert}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
