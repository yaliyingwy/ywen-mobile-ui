import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Tab } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.tabs3 = ['标签1', '标签', '标签3'];
    this.tabs4 = ['标签1', '标签', '标签3', '标签4'];
    this.tabs10 = ['标签1', '标签', '标签3', '标签4', '标签5', '标签6', '标签7', '标签8', '标签9', '标签10'];
    this.state = {
      tabIndex3: 0,
      tabIndex4: 0,
      tabIndex10: 0,
    };
  }

  render() {
    const { tabIndex4, tabIndex10, tabIndex3 } = this.state;
    return (
      <div className="page">
        <div>默认tab</div>
        <Tab 
          tabs={this.tabs4} 
          activeIndex={tabIndex4} 
          clickTab={index => this.setState({ tabIndex4: index })} 
        />
        <div className="space" />
        <div>自定义cell宽度</div>
        <Tab tabs={this.tabs3} cellWidth="2rem" activeIndex={tabIndex3} clickTab={index => this.setState({ tabIndex3: index })} />
        <div className="space" />
        <div>滑动tab</div>
        <Tab tabs={this.tabs10} cellWidth="3rem" activeIndex={tabIndex10} clickTab={index => this.setState({ tabIndex10: index })} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
