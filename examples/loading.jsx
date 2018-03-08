import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { Loading } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.clickShowLoading = this.clickShowLoading.bind(this);
    this.state = {
      show: false,
    };
  }

  clickShowLoading() {
    this.setState({
      show: true,
    });
    setTimeout(() => {
      this.setState({ show: false });
    }, 4000);
  }

  render() {
    const { show } = this.state;

    let loading;
    if (show) {
      loading = <Loading />;
    }

    return (
      <div className="page">
        <div>用户自己控制loading，4秒后消失</div>
        <div className="button" onClick={this.clickShowLoading}>显示loading</div>
        {loading}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
