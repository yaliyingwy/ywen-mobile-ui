// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import './assets/example.less';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  Image,
  Scroller,
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
    const xOptions = {
      scrollingX: true,
      scrollingY: false,
      snapping: false,
      paging: false,
    };

    const yOptions = {
      scrollingX: false,
      scrollingY: true,
      snapping: false,
      paging: false,
    };
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>
          <div className="card">
            <div className="card-header">scroller x with lazy image, image will not show unless you scroll the document</div>
            <div className="card-content">
              <div style={{ position:'relative', top: '0', left: '0', width: '100%', height: '10rem' }}>
                <Scroller
                  options={ xOptions }
                  className="scroller-horizontal"
                  contentWidth={ images.length * 20 + 'rem' }
                >
                  {(() => {
                    return images.map((image, index) => {
                      return (<div key={ index } style={{ width: '20rem', height: '10rem', background: '#333' }} className="rc-scroller-cell-horizontal">
                          <Image src={ image } />
                        </div>);
                    });
                  })()}
                </Scroller>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">scroller y with normal img</div>
            <div className="card-content">
              <div style={{ position:'relative', top: '0', left: '0', width: '100%', height: '10rem' }}>
                <Scroller
                  options={ yOptions }
                  contentHeight={ images.length * 10 + 'rem' }
                >
                  {(() => {
                    return images.map((image, index) => {
                      return <div key={ index } style={{ width: '20rem', height: '10rem', background: 'red' }} >
                      <img src={ image } />
                      </div>
                    });
                  })()}
                </Scroller>
              </div>
            </div>
          </div>

        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
