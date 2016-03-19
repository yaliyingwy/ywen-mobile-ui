// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import './assets/example.less';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  Carousel,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';

const Demo = React.createClass({
  getInitialState() {
    return {
      images: [
        'http://a.hiphotos.baidu.com/zhidao/pic/item/18d8bc3eb13533fafae9926cabd3fd1f41345b10.jpg',
        'http://img2.imgtn.bdimg.com/it/u=3494980167,4088219007&fm=21&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=1015159903,1160255847&fm=21&gp=0.jpg',
        'http://img5.imgtn.bdimg.com/it/u=2292555668,1147946895&fm=21&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=2247491008,298062800&fm=21&gp=0.jpg',
      ],
    };
  },

  render() {
    const { images } = this.state;

    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>
          <div className="card">
            <div className="card-header">Carousel auto play</div>
            <div className="card-content">
              <Carousel width="100%" height="10rem" images={ images } clickFunc={ (index)=> console.log('click', index) } />
            </div>
          </div>

          <div className="card">
            <div className="card-header">Carousel no play</div>
            <div className="card-content">
              <Carousel width="100%" height="10rem" autoPlay={ false } images={ images } clickFunc={ (index)=> console.log('click', index) } />
            </div>
          </div>
        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
