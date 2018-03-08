import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Tab, SwitchableContent } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.data = [
      { title: '标签页1', content: '页面1' },
      { title: '标签页2', content: '页面2' },
      { title: '标签页3', content: '页面3' },
    ];
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    const { activeIndex } = this.state;
    const tabs = this.data.map(tab => tab.title);
    const list = this.data.map((tab, index) => {
      return (
        <div key={index}>{tab.content}</div>
      );
    });
    return (
      <div className="switch-list">
        <Tab 
          tabs={tabs} 
          cellWidth="2rem"
          activeIndex={activeIndex} 
          clickTab={index => this.setState({ activeIndex: index })} 
        />
        <div className="list">
          <SwitchableContent activeIndex={activeIndex}>
            {list}
          </SwitchableContent>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
