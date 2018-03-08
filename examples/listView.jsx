import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { ListView } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      dataList: [
        '数据1',
        '数据2',
        '数据3',
        '数据4',
        '数据5',
        '数据6',
        '数据7',
        '数据8',
        '数据9',
        '数据10',
        '数据11',
      ],
      hasMore: true,
      busy: false,
    };
  }

  loadMore() {
    console.log('load more data');
    this.setState({ busy: true });
    setTimeout(() => {
      const { dataList } = this.state;
      const length = dataList.length;
      for (let index = 0; index < 10; index += 1) {
        dataList.push(`数据${length + index}`);
      }
      console.log(dataList);
      this.setState({
        dataList: [...dataList],
        hasMore: dataList.length < 50,
        busy: false,
      });
    }, 1500);
  }

  render() {
    const { dataList, hasMore, busy } = this.state;   
    const cells = dataList.map((data, index) => {
      return (
        <div key={index} className="list-cell">
          <p>{data}</p>
        </div>
      );
    });
    return (
      <div className="page">
        <ListView 
          className="list-view"
          loadMore={this.loadMore}
          hasMore={hasMore}
          enabled={!busy}
        >
          {cells}
        </ListView>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
