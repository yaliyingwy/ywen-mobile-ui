import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import { getScrollParent, inViewport } from './utils/DomUtil';

// @todo: pullToRefresh
export default React.createClass({
  displayName: 'rc-listview',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    loadMore: PropTypes.func.isRequired,
    refresh: PropTypes.func,
    threshold: PropTypes.number,
    hasMore: PropTypes.bool,
    children: PropTypes.node,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-listview',
      className: '',
      threshold: 0,
      hasMore: true,
    };
  },

  componentDidMount() {
    this._attachScrollListener();
  },

  componentDidUpdate() {
    this._attachScrollListener();
  },

  componentWillUnmount() {
    this._detachScrollListener();
  },

  _attachScrollListener() {
    if (this.props.hasMore) {
      window.addEventListener('touchmove', this._onScroll);
      this._onScroll();
    }
  },

  _detachScrollListener() {
    window.removeEventListener('touchmove', this._onScroll);
  },

  _onScroll() {
    const el = ReactDom.findDOMNode(this);

    const lastEl = el.lastElementChild;
    if (!lastEl) {
      return;
    }
    const scrollParent = getScrollParent(lastEl);
    const offset = {
      top: this.props.threshold,
      left: 0,
      bottom: 0,
      right: 0,
    };
    const visible = inViewport(lastEl, scrollParent, offset);

    console.log('lastEl:', lastEl, ',scrollParent:', scrollParent);
    console.log('visible:', visible);

    if (visible) {
      this._detachScrollListener();
      this.props.loadMore();
    }
  },

  render() {
    const {prefixCls, className} = this.props;
    const cls = prefixCls + ' ' + className;
    return (<div className={ cls }>
        { this.props.children }
      </div>);
  },
});
