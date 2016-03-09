"use strict";

// import React, {PropTypes} from 'react';
// import ReactDom from 'react-dom';

// export default React.createClass({
//   displayName: 'rc-scroller',

//   propTypes: {
//     className: PropTypes.string,
//     prefixCls: PropTypes.string,
//     zoomable: PropTypes.bool,
//     scrollDirection: PropTypes.oneOf(['x', 'y']).isRequired,
//     children: PropTypes.node,
//     options: PropTypes.object,
//   },

//   getDefaultProps() {
//     return {
//       prefixCls: 'rc-overlay',
//       zoomable: true,
//     };
//   },

//   componentDidMount() {
//     const container = ReactDom.findDOMNode(this);
//     const content = container.lastElementChild;
//     const options = this.props.options || {};
//     if (this.props.scrollDirection === 'x') {
//       options.scrollingX = true;
//     } else {
//       options.scrollingY = true;
//     }
//     options.zooming = this.props.zoomable;

//     const scroller = new Scroller((left, top, zoom) => this._renderFactory(content)(left, top, zoom), options);

//     this.setState({ scroller });
//     this._reflow(container, content, scroller);
//   },

//   _renderFactory(content) {
//     const docStyle = document.documentElement.style;
//     let prefix;
//     if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
//       prefix = 'O';
//     } else if ('MozAppearance' in docStyle) {
//       prefix = 'Moz';
//     } else if ('WebkitAppearance' in docStyle) {
//       prefix = 'Webkit';
//     } else if (typeof navigator.cpuClass === 'string') {
//       prefix = 'ms';
//     }

//     content.style[prefix + 'TransformOrigin'] = 'left top';

//     const perspectiveProperty = `${prefix}Perspective`;
//     const transformProperty = `{prefix}Transform`;
//     const helperElem = document.createElement('div');
//     let renderFunc;
//     if (helperElem.style[perspectiveProperty] !== undefined) {
//       renderFunc = (left, top, zoom) => content.style[transformProperty] = `translate3d(${-left}px,${-top}px,0) scale(${zoom})`;
//     } else if (helperElem.style[transformProperty] !== undefined) {
//       renderFunc = (left, top, zoom) => content.style[transformProperty] = `translate(${-left}px,${-top}px scale(${zoom}))`;
//     } else {
//       renderFunc = (left, top, zoom) => {
//         content.style.marginLeft = left ? (-left / zoom) + 'px' : '';
//         content.style.marginTop = top ? (-top / zoom) + 'px' : '';
//         content.style.zoom = zoom || '';
//       };
//     }

//     return renderFunc;
//   },

//   _reflow(container, content, scroller) {
//     scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
//     const rect = container.getBoundingClientRect();
//     scroller.setPosition(rect.left, container.clientLeft, rect.top, container.clientTop);
//   },

//   _bindEvents(container, content, scroller) {
//     const reflow = this._reflow.bind(this, container, content, scroller);
//     window.addEventListener('resize', function() {
//       reflow();
//     }, false);
//   },

//   _touchStart(e) {
//     if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
//       return;
//     }
//     this.state.scroller.doTouchStart(e.touches, e.timeStamp);
//     e.preventDefault();
//   },

//   _touchMove(e) {
//     this.state.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
//   },

//   _touchEnd(e) {
//     this.state.scroller.doTouchEnd(e.timeStamp);
//   },

//   _touchCancel(e) {
//     this.state.scroller.doTouchCancel(e.timeStamp);
//   },

//   render() {
//     const { prefixCls, className, children } = this.props;
//     const cls = `${prefixCls} ${className}`;

//     return (<div onTouchStart={ this._touchStart } onTouchMove={ this._touchMove } onTouchEnd={ this._touchEnd } onTouchCancel={ this._touchCancel } className={ cls }>
//         <div className={ `${prefixCls}-content` }>
//           { children }
//         </div>
//       </div>);
//   },
// });