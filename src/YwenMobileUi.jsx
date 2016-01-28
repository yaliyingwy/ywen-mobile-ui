import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import Confirm from './Confirm';

const _ID = '_ywen_mobile_ui';

const RC_MODAL = Symbol('Modal');
const RC_CONFIRM = Symbol('Confirm');
const RC_NONE = Symbol('None');

let div = document.getElementById(_ID);
if (Object.is(div, null)) {
  div = document.createElement('div');
  div.id = _ID;
  document.body.appendChild(div);
}

function _render(type, ...props) {
  switch (type) {
    case RC_MODAL:
      ReactDOM.render(<Modal {...props} />, div);
      break;
    case RC_CONFIRM:
      ReactDOM.render(<Confirm {...props} />, div);
      break;
    default: ReactDOM.render(<div />);
  }
}

function showModal(...props) {
  _render(RC_MODAL, props);
}

function showConfirm(...props) {
  _render(RC_CONFIRM, props);
}

function dismiss() {
  _render(RC_NONE);
}


export {showModal, showConfirm, dismiss, Modal, Confirm};
