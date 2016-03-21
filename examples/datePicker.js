// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  DatePicker,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';


const Demo = React.createClass({

  getInitialState() {
    return {  
    };
  },

  _showDatePicker() {
    console.log('show picker');
    this.refs.picker.show();
  },


  render() {
    const { year, month, day } = this.state;
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>

          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDatePicker}>
                    show date picker 
                  </div>
                </div>
              </li>

              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title">
                    { `${year}年${month}月${day}日` } 
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <DatePicker ref="picker" selectDate={ ({ year, month, day }) => this.setState({ year, month, day }) } />
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
