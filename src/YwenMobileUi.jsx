import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import Confirm from './Confirm';
import Toast from './Toast';
import Loading from './Loading';

const _ID = '_ywen_mobile_ui';

const RC_MODAL = Symbol('Modal');
const RC_CONFIRM = Symbol('Confirm');
const RC_TOAST = Symbol('Toast');
const RC_LOADING = Symbol('Loading');
const RC_NONE = Symbol('None');

let toastTimeout = null;

let div = document.getElementById(_ID);
if (Object.is(div, null)) {
  div = document.createElement('div');
  div.id = _ID;
  document.body.appendChild(div);
}

function _render(type, props) {
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  switch (type) {
    case RC_MODAL:
      ReactDOM.render(<Modal touchMask={props.touchMask} />, div);
      break;
    case RC_CONFIRM:
      ReactDOM.render(<Confirm {...props} />, div);
      break;
    case RC_TOAST:
      const showTime = props && props.showTime ? props.showTime : 1500;
      ReactDOM.render(<Toast {...props} />, div);
      toastTimeout = setTimeout(()=> {
        ReactDOM.render(<Toast className="rc-toast-hide" {...props} />, div);
      }, showTime);
      break;
    case RC_LOADING:
      ReactDOM.render(<Loading {...props}/>, div);
      break;
    default: ReactDOM.render(<div />, div);
  }
}

function dismiss() {
  _render(RC_NONE);
}

function showModal(props) {
  _render(RC_MODAL, props);
}

function showConfirm(props) {
  const {confirmCb, cancelCb, ...others} = props;
  function newConfirmCb() {
    dismiss();
    confirmCb();
  }

  function newCancelCb() {
    dismiss();
    cancelCb();
  }
  _render(RC_CONFIRM, {confirmCb: newConfirmCb, cancelCb: newCancelCb, ...others});
}

function showToast(props) {
  _render(RC_TOAST, props);
}

function showLoading(props) {
  _render(RC_LOADING, props);
}

export {showModal, showConfirm, showToast, showLoading, dismiss, Modal, Confirm, Toast};
