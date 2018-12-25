import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
/* eslint-disable */
import { CarNo } from 'ywen-mobile-ui';
/* eslint-enable */

import '../assets/styles/index.less';
import '../assets/styles/example.less';


document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  state = {
    value: '',
  }

  valueChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <div className="page">
        <div onClick={() => this.modal.show()}>车牌号:  {value}</div>
        <CarNo ref={(modal) => { this.modal = modal; }} onChange={this.valueChange} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
