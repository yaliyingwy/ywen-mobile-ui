// use jsx to render html, do not modify simple.html
import './assets/mobile-util.js';
import 'rc-ywen-mobile-ui/assets/less/lib/sm.less';

import {
  ImageUploader,
} from 'rc-ywen-mobile-ui';
import React from 'react';
import ReactDOM from 'react-dom';

const Demo = React.createClass({

  _clear() {
    const { uploader } = this.refs;
    alert('上传失败！');
    uploader._clear();
  },

  render() {
    return (<div className="page page-current">
        <div className="content" style={{ paddingBottom: '80px' }}>
          <div className="card">
            <div className="card-header">Image uploader</div>
            <div className="card-content">
              <div style={{ width: '7rem', height: '7rem', background: 'yellow', position: 'relative' }}>
                <ImageUploader 
                  uploadUrl="/upload"
                  uploadKey="file"
                  selectFile={ (file) => console.log('file', file) }
                  compressSize={ 1000000 }
                  afterCompress={ (result) => { console.log('compress---', result); this.setState({ dataUrl: result.dataUrl })} } 
                  autoUpload={ false }
                />
              </div>
              <p> reset on error </p>
              <div style={{ width: '7rem', height: '7rem', background: 'red', position: 'relative' }}>
                <ImageUploader 
                  ref="uploader"
                  uploadUrl="/upload"
                  uploadKey="file"
                  selectFile={ (file) => console.log('file', file) }
                  compressSize={ 1000000 }
                  onUpload={ (progress) => { console.log('progress---', progress)} }
                  uploadFailed={ this._clear }
                  autoUpload={ true }
                />
              </div>

              <p> set dataUrl  </p>
              <div style={{ width: '7rem', height: '7rem', background: 'red', position: 'relative' }}>
                <ImageUploader 
                  ref="uploader"
                  uploadUrl="/upload"
                  uploadKey="file"
                  selectFile={ (file) => console.log('file', file) }
                  compressSize={ 1000000 }
                  onUpload={ (progress) => { console.log('progress---', progress)} }
                  uploadFailed={ this._clear }
                  autoUpload={ flase }
                  dataUrl={ this.state.dataUrl }
                />
              </div>
            </div>
          </div>
        </div>
      </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('content'));
