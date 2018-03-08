import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Lazyload } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.loadCell = this.loadCell.bind(this);
    this.state = {};
  }

  loadCell(data) {
    console.log('load cell', data);
    const newState = {
      ...this.state,
    };
    newState[data] = true;
    setTimeout(() => {
      this.setState(newState);
    }, 1000);
  }

  render() {
    const dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const cells = dataList.map((data) => {
      const isLoad = this.state[data];
      return (
        <Lazyload 
          lazyload={() => this.loadCell(data)} 
          className="lazy-cell" 
          key={data}
          threshold={-100}
        >
          <p>数据项{isLoad ? data : '加载中'}</p>
        </Lazyload>
      );
    });
    return (
      <div className="page">
        <div className="lazy-list">{cells}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
