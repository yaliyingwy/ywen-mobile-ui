import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import '../assets/styles/index.less';
import '../assets/styles/example.less';

/* eslint-disable */
import { LazyImage } from 'ywen-mobile-ui';
/* eslint-enable */

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body);
}, false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
  }

  render() {
    const dataList = [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519290545860&di=bb0da691bfaba9e168567cf287006777&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201510%2F14%2F20151014163151_djfQW.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519290583923&di=d45e368075ebc36e0b9556652e8555b6&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201510%2F14%2F20151014163127_4FSQw.jpeg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=364005304,768064645&fm=27&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1770209674,3111690445&fm=27&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519290652423&di=eea5cc6e29cbb5b13db805c2e6b61ba5&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201510%2F14%2F20151014163145_QmWzv.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519885392&di=d823e77343348cd46476ba994a011387&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201510%2F17%2F20151017174925_JaSiz.png',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3910485350,46457411&fm=27&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3193655929,3608303459&fm=27&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519290723801&di=7a3e28d54fa927c36e9def5c22ba28fd&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7f7d8f685aafa40f3cc6ced59b65038c%2Fe09d27f431adcbef7a84465cacaf2edda2cc9ff2.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519290767250&di=570a3e9dca0931f5913d626ee9f2079a&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170413%2Fc5db9493b6174978b2da4aaaf78e32f1_th.jpeg',
      // 404
      'foo.jpg',
      // 高清无码大图
      'http://www.gamemei.com/background/uploads/160608/24-16060Q03450262.jpg', 
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519292880199&di=33adc5cf9833b92f7c21cc6f822ae958&imgtype=0&src=http%3A%2F%2Fimgstore.cdn.sogou.com%2Fapp%2Fa%2F100540002%2F602783.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519292933733&di=d788f470eeb78060df7afd128816052d&imgtype=0&src=http%3A%2F%2Ff2.dn.anqu.com%2Fdown%2FYzJhMQ%3D%3D%2Fallimg%2F1212%2F17-12120G01311.jpg',
    ];
    const cells = dataList.map((data, index) => <LazyImage src={data} key={`${data}-${index}`} className="lazy-image" />);
    return (
      <div className="page">
        <div className="lazy-list">{cells}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
