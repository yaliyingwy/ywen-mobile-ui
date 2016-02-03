// use jsx to render html, do not modify simple.html

import 'rc-ywen-mobile-ui/assets/index.less';
import {showModal, showConfirm, showToast, dismiss} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * we use lib-flexible
 * @link https://github.com/amfe/lib-flexible
 */

const flexible = document.createElement('script');
flexible.src = 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js';
document.getElementsByTagName('head')[0].appendChild(flexible);


const SHOW_MODAL = Symbol('SHOW_MODAL');
const SHOW_CONFIRM = Symbol('SHOW_CONFIRM');
const SHOW_TOAST_INFO = Symbol('SHOW_TOAST_INFO');
const SHOW_TOAST_SUCCESS = Symbol('SHOW_TOAST_SUCCESS');
const SHOW_TOAST_ERROR = Symbol('SHOW_TOAST_ERROR');

const Demo = React.createClass({
  getInitialState() {
    return {
      demo: 'none',
    };
  },

  _showDemo(type) {
    switch (type) {
      case SHOW_MODAL:
        showModal({touchMask: ()=> dismiss()});
        break;
      case SHOW_CONFIRM:
        showConfirm({
          title: 'just a test',
          content: 'test '.repeat(20),
          confirmBtn: 'ok',
          cancelBtn: 'cancel',
          confirmCb: ()=> alert('you clicked ok!'),
          cancelCb: ()=> alert('you clicked cancel!'),
        });
        break;
      case SHOW_TOAST_INFO:
        showToast({content: 'toast info with default 1500ms'});
        break;
      case SHOW_TOAST_SUCCESS:
        showToast({type: 'success', content: 'show success on top with 10000ms', showTime: 10000, position: 'top'});
        break;
      case SHOW_TOAST_ERROR:
        showToast({type: 'error', content: 'show error on bottom with a lot of words:' + 'test'.repeat(20), position: 'bottom'});
        break;
      default :
        break;
    }
  },

  render() {
    return (<div>
      <h1 onClick={this._showDemo.bind(this, SHOW_MODAL)}>show Modal</h1>
      <h1 onClick={this._showDemo.bind(this, SHOW_CONFIRM)}>show Confirm</h1>
      <h1 onClick={this._showDemo.bind(this, SHOW_TOAST_INFO)}>show toast</h1>
      <h1 onClick={this._showDemo.bind(this, SHOW_TOAST_SUCCESS)}>show success on top</h1>
      <h1 onClick={this._showDemo.bind(this, SHOW_TOAST_ERROR)}>show error on bottom</h1>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
