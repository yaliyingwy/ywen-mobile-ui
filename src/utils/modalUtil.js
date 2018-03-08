
export const TOAST_MODAL = 'TOAST_MODAL';
export const ALERT_MODAL = 'ALERT_MODAL';
export const LOADING_MODAL = 'LOADING_MODAL';
export const COMMON_MODAL = 'COMMON_MODAL';


export function getModalNode(type = COMMON_MODAL) {
  const nodeId = `YWEN_MODAL_${type}`;
  let node = document.getElementById(nodeId);
  if (!node) {
    node = document.createElement('div');
    node.id = nodeId;
    document.body.appendChild(node);
  }
  return node;
}

