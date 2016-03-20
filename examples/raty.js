// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  Raty,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';


const Demo = React.createClass({

  getInitialState() {
    return {
      score: 4,    
    };
  },

  render() {
    const { score } = this.state;
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>

          <div className="card">
            <div className="card-header">Raty can not rate</div>
            <div className="card-content">
              <Raty score={ 7 } disable={ true } />
            </div>
          </div>
          <div className="card">
            <div className="card-header">Raty can rate</div>
            <div className="card-content">
              <p>评分: { score } </p>
              <Raty score={ score } updateScore={ (score) => this.setState({ score }) } />
            </div>
          </div>
          <div className="card">
            <div className="card-header">Raty disable half</div>
            <div className="card-content">
              <div style={{ display: 'flex' }}>
                <p>评分: { score } </p>
                <Raty score={ score } enableHalf={ false } updateScore={ (score) => this.setState({ score }) } />
              </div>
            </div>
          </div>
        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
