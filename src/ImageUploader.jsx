import React, {PropTypes} from 'react';

import ImageUtil from './utils/ImageUtil';
import AjaxUtil from './utils/AjaxUtil';
import Progress from './Progress';

export default React.createClass({
  displayName: 'rc-image-uploader',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    compressSize: PropTypes.number,
    compressRate: PropTypes.number,
    showProgress: PropTypes.bool,
    selectFile: PropTypes.func,
    afterCompress: PropTypes.func,
    onUpload: PropTypes.func,
    uploadDone: PropTypes.func,
    uploadFailed: PropTypes.func,
    uploadParams: PropTypes.object,
    uploadKey: PropTypes.string.isRequired,
    uploadUrl: PropTypes.string.isRequired,
    autoUpload: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-image-uploader',
      className: '',
      showProgress: true,
      compressRate: 0.3,
      compressSize: 50000,
      otherParams: {},
      autoUpload: false,
    };
  },

  getInitialState() {
    return {
      selected: false,
      uploading: false,
      progress: 0,
    };
  },

  _selectFile(e) {
    const {
      compressSize,
      compressRate,
      selectFile,
      afterCompress,
      // uploadUrl,
      // uploadKey,
      // uploadParams,
      // onUpload,
      // uploadDone,
      // uploadFailed,
      autoUpload,
    } = this.props;
    const file = e.target.files[0];
    if (selectFile) {
      selectFile(file);
    }
    ImageUtil.compress(file, file.size > compressSize ? compressRate : 1).then((result) => {
      if (afterCompress) {
        afterCompress(result);
      }

      if (autoUpload) {
        this._upload(result);
      }

      this.setState({
        selected: true,
        uploading: autoUpload,
        progress: 0,
        dataUrl: result.dataUrl,
        blob: result.blob,
      });
    });
  },

  _upload(result) {
    const {
      uploadUrl,
      uploadKey,
      uploadParams,
      onUpload,
      uploadDone,
      uploadFailed,
    } = this.props;
    // 上传
    AjaxUtil.upload({
      url: uploadUrl,
      paramDic: { [uploadKey]: result.blob, ...uploadParams },
      success: (data) => {
        if (uploadDone) {
          uploadDone(data);
        }
        this.setState({
          uploading: false,
          progress: 100,
        });
      },
      error: (data) => {
        if (uploadFailed) {
          uploadFailed(data);
        }
        this.setState({
          uploading: false,
          progress: 0,
        });
      },
      onLoad: (progress) => {
        if (onUpload) {
          onUpload(progress);
        }
        this.setState({
          uploading: true,
          progress,
        });
      },
    });    
  },

  _clear() {
    this.setState({
      selected: false,
      progress: 0,
      dataUrl: null,
      blob: null,
    });
  },

  render() {
    const { prefixCls, className, showProgress } = this.props;
    const cls = `${prefixCls}  ${className}`;
    const inputCls = `${prefixCls}-input`;
    const imgCls = `${prefixCls}-img`;
    const iconCls = `${prefixCls}-icon`;
    const maskCls = `${prefixCls}-mask`;

    const { selected, dataUrl, progress, uploading } = this.state;
    return (<div className={ cls }>
        <input onChange={ this._selectFile } accept="image/*" className={ inputCls } type="file" />
        {(() => {
          let view;
          if (selected && dataUrl) {
            view = <img className={ imgCls } src={ dataUrl } />;
          } else {
            view = <div className={ iconCls }></div>;
          }
          return view;
        })()}
        {(() => {
          if (showProgress && uploading) {
            return (<div className={ maskCls }>
              <Progress size="70%" className="rc-image-progress" progress={ progress } />
            </div>);
          }
        })()}
      </div>);
  },
});
