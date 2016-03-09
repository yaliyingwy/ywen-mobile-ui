// use jsx to render html, do not modify simple.html

import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  showOverlay,
  showConfirm,
  showToast,
  showLoading,
  dismiss,
  // Image,
  Progress,
  Carousel,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * we use lib-flexible
 * @link https://github.com/amfe/lib-flexible
 */

// const flexible = document.createElement('script');
// flexible.src = 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js';
// document.getElementsByTagName('head')[0].appendChild(flexible);


const SHOW_OVERLAY = Symbol('SHOW_OVERLAY');
const SHOW_CONFIRM = Symbol('SHOW_CONFIRM');
const SHOW_TOAST_INFO = Symbol('SHOW_TOAST_INFO');
const SHOW_TOAST_SUCCESS = Symbol('SHOW_TOAST_SUCCESS');
const SHOW_TOAST_ERROR = Symbol('SHOW_TOAST_ERROR');
const SHOW_LOADING_WITH_MASK = Symbol('SHOW_LOADING_WITH_MASK');
const SHOW_LOADING_WITHOUT_MASK = Symbol('SHOW_LOADING_WITHOUT_MASK');

const Demo = React.createClass({
  getInitialState() {
    return {
      demo: 'none',
      progress: 0,
      images: [
        'http://a.hiphotos.baidu.com/zhidao/pic/item/18d8bc3eb13533fafae9926cabd3fd1f41345b10.jpg',
        'http://img2.imgtn.bdimg.com/it/u=3494980167,4088219007&fm=21&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=1015159903,1160255847&fm=21&gp=0.jpg',
        'http://img5.imgtn.bdimg.com/it/u=2292555668,1147946895&fm=21&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=2247491008,298062800&fm=21&gp=0.jpg',
      ],
    };
  },

  componentDidMount() {
    setInterval(() => this.setState({
      progress: this.state.progress < 100 ? this.state.progress + 1 : 0,
    }), 300);
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
      default :
        break;
    }
  },

  render() {
    const { progress, images } = this.state;
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
                  <div className="item-title" onClick={this._showDemo.bind(this, SHOW_LOADING_WITHOUT_MASK)}>
                    show loading without mask
                  </div>
                </div>
              </li>
            </ul>
          </div>

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

          <div className="card">
            <div className="card-header">Carousel</div>
            <div className="card-content">
              <Carousel width="100%" height="10rem" images={ images } clickFunc={ (index) => alert('click index ', index) } />
            </div>
          </div>
        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
