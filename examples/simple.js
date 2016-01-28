// use jsx to render html, do not modify simple.html

import 'rc-ywen-mobile-ui/assets/index.less';
import {Modal, Confirm} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width';
document.getElementsByTagName('head')[0].appendChild(meta);

const Demo = React.createClass({
  getInitialState() {
    return {
      demo: 'none',
    };
  },

  _showDemo(type) {
    this.setState({demo: type});
  },

  render() {
    return (<div>
      <h1 onClick={this._showDemo.bind(this, 'Modal')}>show Modal</h1>
      <h1 onClick={this._showDemo.bind(this, 'Confirm')}>show Confirm</h1>
      {(()=> {
        switch (this.state.demo) {
          case 'Modal': return (<Modal touchMask={this._showDemo.bind(this, 'none')}/>);
          case 'Confirm': return (<Confirm />);
          default: return (<p>please select which demo to show</p>);
        }
      })()}
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
