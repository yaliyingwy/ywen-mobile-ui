// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  Picker,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';


const Demo = React.createClass({

  getInitialState() {
    return {
      item: 0,    
    };
  },

  _showPicker() {
    console.log('show picker');
    this.refs.picker.show();
  },

  _showSinglePicker() {
    console.log('show single picker');
    this.refs.single.show();
  },

  render() {
    const { score } = this.state;
    const items1 = [1, 2, 3, 4, 5, 6, 7];
    const items2 = [8, 9];
    const items3 = [10, 11, 12, 13];
    const items4 = [14, 15, 16, 17, 18, 19, 20, 21, 22];
    const itemGroups = [items1, items2, items3, items4];

    const single = [['北京', '北京', '北京', '北京', '北京', '北京', '北京']];
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>

          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showPicker}>
                    show picker
                  </div>
                </div>
              </li>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showSinglePicker}>
                    show single picker
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <Picker ref="picker" itemGroups={ itemGroups } confirmFunc={ ()=> console.log('confirm') } selectItem={ ({ group, index }) => console.log('select item', group, index) } />
        <Picker ref="single" itemGroups={ single } confirmFunc={ ()=>console.log('confirm') } selectItem={ ({ group, index }) => console.log('select item', group, index) } />
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
