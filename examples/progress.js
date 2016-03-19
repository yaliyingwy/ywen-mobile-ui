// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  Progress,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';


const Demo = React.createClass({
  getInitialState() {
    return {
      progress: 0,
    };
  },

  componentDidMount() {
    const progressInterval = setInterval(() => {
      if (this.state.progress === 100) {
        clearInterval(progressInterval);
        return;
      }
      this.setState({
        progress: this.state.progress < 100 ? this.state.progress + 1 : 0,
      });
    }, 300);
  },


  render() {
    const { progress, images } = this.state;
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>

          <div className="card">
            <div className="card-header">show progress 78%</div>
            <div className="card-content">
              <Progress size="10rem" progress={ 78 } />
            </div>
          </div>
          <div className="card">
            <div className="card-header">show progress from 0%~100%</div>
            <div className="card-content">
              <Progress size="10rem" progress={ progress } />
            </div>
          </div>
        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
