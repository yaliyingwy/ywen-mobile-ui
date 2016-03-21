'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsImageUtil = require('./utils/ImageUtil');

var _utilsImageUtil2 = _interopRequireDefault(_utilsImageUtil);

var _utilsAjaxUtil = require('./utils/AjaxUtil');

var _utilsAjaxUtil2 = _interopRequireDefault(_utilsAjaxUtil);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

exports['default'] = _react2['default'].createClass({
  displayName: 'rc-image-uploader',

  propTypes: {
    className: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    compressSize: _react.PropTypes.number,
    compressRate: _react.PropTypes.number,
    showProgress: _react.PropTypes.bool,
    selectFile: _react.PropTypes.func,
    afterCompress: _react.PropTypes.func,
    onUpload: _react.PropTypes.func,
    uploadDone: _react.PropTypes.func,
    uploadFailed: _react.PropTypes.func,
    uploadParams: _react.PropTypes.object,
    uploadKey: _react.PropTypes.string.isRequired,
    uploadUrl: _react.PropTypes.string.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-image-uploader',
      className: '',
      showProgress: true,
      compressRate: 0.3,
      compressSize: 50000,
      otherParams: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      selected: false,
      uploading: false,
      progress: 0
    };
  },

  _selectFile: function _selectFile(e) {
    var _this = this;

    var _props = this.props;
    var compressSize = _props.compressSize;
    var compressRate = _props.compressRate;
    var selectFile = _props.selectFile;
    var afterCompress = _props.afterCompress;
    var uploadUrl = _props.uploadUrl;
    var uploadKey = _props.uploadKey;
    var uploadParams = _props.uploadParams;
    var onUpload = _props.onUpload;
    var uploadDone = _props.uploadDone;
    var uploadFailed = _props.uploadFailed;

    var file = e.target.files[0];
    if (selectFile) {
      selectFile(file);
    }
    _utilsImageUtil2['default'].compress(file, file.size > compressSize ? compressRate : 1).then(function (result) {
      if (afterCompress) {
        afterCompress(result);
      }
      // 上传
      _utilsAjaxUtil2['default'].upload({
        url: uploadUrl,
        paramDic: _extends(_defineProperty({}, uploadKey, result.blob), uploadParams),
        success: function success(data) {
          if (uploadDone) {
            uploadDone(data);
          }
          _this.setState({
            uploading: false,
            progress: 100
          });
        },
        error: function error(data) {
          if (uploadFailed) {
            uploadFailed(data);
          }
          _this.setState({
            uploading: false,
            progress: 0
          });
        },
        onLoad: function onLoad(progress) {
          if (onUpload) {
            onUpload(progress);
          }
          _this.setState({
            progress: progress
          });
        }
      });

      _this.setState({
        selected: true,
        uploading: true,
        progress: 0,
        dataUrl: result.dataUrl,
        blob: result.blob
      });
    });
  },

  _clear: function _clear() {
    this.setState({
      selected: false,
      progress: 0,
      dataUrl: null,
      blob: null
    });
  },

  render: function render() {
    var _props2 = this.props;
    var prefixCls = _props2.prefixCls;
    var className = _props2.className;
    var showProgress = _props2.showProgress;

    var cls = prefixCls + '  ' + className;
    var inputCls = prefixCls + '-input';
    var imgCls = prefixCls + '-img';
    var iconCls = prefixCls + '-icon';
    var maskCls = prefixCls + '-mask';

    var _state = this.state;
    var selected = _state.selected;
    var dataUrl = _state.dataUrl;
    var progress = _state.progress;
    var uploading = _state.uploading;

    return _react2['default'].createElement(
      'div',
      { className: cls },
      _react2['default'].createElement('input', { onChange: this._selectFile, accept: 'image/*', className: inputCls, type: 'file' }),
      (function () {
        var view = undefined;
        if (selected && dataUrl) {
          view = _react2['default'].createElement('img', { className: imgCls, src: dataUrl });
        } else {
          view = _react2['default'].createElement('div', { className: iconCls });
        }
        return view;
      })(),
      (function () {
        if (showProgress && uploading) {
          return _react2['default'].createElement(
            'div',
            { className: maskCls },
            _react2['default'].createElement(_Progress2['default'], { size: '70%', className: 'rc-image-progress', progress: progress })
          );
        }
      })()
    );
  }
});
module.exports = exports['default'];