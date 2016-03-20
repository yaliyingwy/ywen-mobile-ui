import '../assets/less/index.less';
import React from 'react';
import ReactDOM from 'react-dom';

import Overlay from './Overlay';
import Confirm from './Confirm';
import Toast from './Toast';
import Loading from './Loading';
import Image from './Image';
import ListView from './ListView';
import LazyLoad from './LazyLoad';
import Progress from './Progress';
import Carousel from './Carousel';
import Scroller from './Scroller';
import ImageUploader from './ImageUploader';
import Raty from './Raty';

const _ID = '_ywen_mobile_ui';

const RC_OVERLAY = Symbol('Overlay');
const RC_CONFIRM = Symbol('Confirm');
const RC_TOAST = Symbol('Toast');
const RC_LOADING = Symbol('Loading');
const RC_NONE = Symbol('None');

let _modalInstance;


const Modal = React.createClass({
  displayName: 'rc-modal',

  getInitialState() {
    return {
      show: false,
      type: RC_NONE,
    };
  },

  componentDidMount() {
    _modalInstance = this;
  },

  render() {
    const { type, show, props } = this.state;

    let modal;
    switch (type) {
      case RC_OVERLAY:
        modal = <Overlay show={ show } { ...props } />;
        break;
      case RC_CONFIRM:
        const { confirmCb, cancelCb, ...reset } = props;
        const newConfirmCb = () => {
          this.setState({ show: false });
          confirmCb();
        };

        const newCancelCb = () => {
          this.setState({ show: false });
          cancelCb();
        };
        modal = <Confirm confirmCb ={ newConfirmCb } cancelCb = { newCancelCb } show={ show } { ...reset } />;
        break;
      case RC_TOAST:
        modal = <Toast show={ show } { ...props } />;
        break;
      case RC_LOADING:
        modal = <Loading show={ show } { ...props } />;
        break;
      default:
        modal = <div />;
    }
    return modal;
  },
});

let _toastTimeout = null;

let div = document.getElementById(_ID);
if (Object.is(div, null)) {
  div = document.createElement('div');
  div.id = _ID;
  document.body.appendChild(div);
}

ReactDOM.render(<Modal />, div);


function _render(type, props) {
  if (_toastTimeout) {
    clearTimeout(_toastTimeout);
  }

  if (type === RC_TOAST) {
    _toastTimeout = setTimeout(() => _modalInstance.setState({ show: false }), props.showTime || 1500);
  }
  _modalInstance.setState({ type, props, show: true });
}

function dismiss() {
  _modalInstance.setState({ show: false });
}

function showOverlay(props) {
  _render(RC_OVERLAY, props);
}

function showConfirm(props) {
  _render(RC_CONFIRM, props);
}

function showToast(props) {
  _render(RC_TOAST, props);
}

function showLoading(props) {
  _render(RC_LOADING, props);
}

export {
  showOverlay,
  showConfirm,
  showToast,
  showLoading,
  dismiss,
  Overlay,
  Confirm,
  Toast,
  Image,
  ListView,
  LazyLoad,
  Progress,
  Carousel,
  Scroller,
  ImageUploader,
  Raty,
};
