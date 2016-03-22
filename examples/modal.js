// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  showOverlay,
  showConfirm,
  showToast,
  showLoading,
  dismiss,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';


const SHOW_OVERLAY = Symbol('SHOW_OVERLAY');
const SHOW_CONFIRM = Symbol('SHOW_CONFIRM');
const SHOW_TOAST_INFO = Symbol('SHOW_TOAST_INFO');
const SHOW_TOAST_SUCCESS = Symbol('SHOW_TOAST_SUCCESS');
const SHOW_TOAST_ERROR = Symbol('SHOW_TOAST_ERROR');
const SHOW_LOADING_WITH_MASK = Symbol('SHOW_LOADING_WITH_MASK');
const SHOW_LOADING_WITHOUT_MASK = Symbol('SHOW_LOADING_WITHOUT_MASK');
const SHOW_LOADING_WITH_PROGRESS = Symbol('SHOW_LOADING_WITHOUT_PROGRESS');

const Demo = React.createClass({
  getInitialState() {
    return {
      demo: 'none',
    };
  },

  _showDemo(type) {
    switch (type) {
      case SHOW_OVERLAY:
        showOverlay({touchMask: ()=> dismiss()});
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
      case SHOW_LOADING_WITH_MASK:
        showLoading({cancelOnTouch: true});
        break;
      case SHOW_LOADING_WITHOUT_MASK:
        showLoading({withMask: false, cancelOnTouch: true, color: 'yellow'});
        break;
      case SHOW_LOADING_WITH_PROGRESS:
        showLoading({cancelOnTouch: true, progress: 63});
        break;
      default :
        break;
    }
  },

  render() {
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>
          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_OVERLAY)}>
                    show Overlay
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_CONFIRM)}>
                    show Confirm
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_TOAST_INFO)}>
                    show toast
                  </div>
                </div>
              </li>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_TOAST_SUCCESS)}>
                    show success on top
                  </div>
                </div>
              </li>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_TOAST_ERROR)}>
                    show error on bottom
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_LOADING_WITH_MASK)}>
                    show loading with mask
                  </div>
                </div>
              </li>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_LOADING_WITH_PROGRESS)}>
                    show loading with progress
                  </div>
                </div>
              </li>
              <li className="item-content">
                <div className="item-inner">
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_LOADING_WITHOUT_MASK)}>
                    show loading without mask
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
