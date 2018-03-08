import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Overlay } from 'ywen-mobile-ui';
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
    let overlay;
    if (show) {
      overlay = <Overlay touchFunc={() => this.setState({ show: false })} />;
    }
    return (
      <div className="page">
        <div className="button" onClick={() => this.setState({ show: true })}>显示遮罩</div>
        {overlay}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
