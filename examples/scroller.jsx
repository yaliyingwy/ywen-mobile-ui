import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Scroller } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  state = {
    data: Array(40).fill(1),
  }
  render() {
    const cells = this.state.data.map((item, index) => {
      return (
        <div key={index} className="scroller-cell">
          数据{index}
        </div>
      );
    });
    return (
      <div className="page">
        <Scroller className="scroller">
          {cells}
        </Scroller>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
