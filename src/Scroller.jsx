import React, {PropTypes} from 'react';
import Scroller from 'scroller';

export default React.createClass({
  displayName: 'rc-scroller',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    children: PropTypes.node,
    options: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    contentWidth: PropTypes.string,
    contentHeight: PropTypes.string,
    onScroll: PropTypes.func,
    scrollingComplete: PropTypes.func,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-scroller',
      contentWidth: '100%',
      contentHeight: '100%',
      options: {},
    };
  },

  getInitialState() {
    return {
      scrollLeft: 0,
      scrollTop: 0,
    };
  },

  componentDidMount() {
    this.createScroller();
    this.updateScrollingDimensions();
  },

  setSnapSize(width, height) {
    this.scroller.setSnapSize(width, height);
  },

  getValues() {
    return this.scroller.getValues();
  },

  createScroller() {
    const { options } = this.props;
    options.scrollingComplete = this.scrollComplete;
    this.scroller = new Scroller(this.handleScroll, options);
  },

  updateScrollingDimensions() {
    const { container, content } = this.refs;

    this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
  },

  scrollComplete() {
    const func = this.props.scrollingComplete || this.props.options.scrollingComplete;
    if (func) {
      func();
    }
  },

  handleTouchStart(e) {
    if (this.scroller) {
      this.scroller.doTouchStart(e.touches, e.timeStamp);
    }
  },

  handleTouchMove(e) {
    if (this.scroller) {
      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }
  },

  handleTouchEnd(e) {
    if (this.scroller) {
      this.scroller.doTouchEnd(e.timeStamp);
      // if (this.props.options.snapping) {
      //   this.updateScrollingDeceleration();
      // }
    }
  },

  handleScroll(left, top) {
    this.setState({ scrollTop: top, scrollLeft: left });
    if (this.props.onScroll) {
      this.props.onScroll({ left, top });
    }
  },

  scrollTo(left, top, animate, zoom) {
    this.scroller.scrollTo(left, top, animate, zoom);
  },

  render() {
    const {
      prefixCls,
      className,
      children,
      contentWidth,
      contentHeight,
      width,
      height,
    } = this.props;
    const { scrollLeft, scrollTop } = this.state;
    const cls = `${prefixCls} ${className}`;

    return (<div
      ref="container"
      onTouchStart={ this.handleTouchStart }
      onTouchMove={ this.handleTouchMove }
      onTouchEnd={ this.handleTouchEnd }
      className={ cls }
      style={{ width, height }}
      >
        <div ref="content" className={ `${prefixCls}-content` } style={{ width: contentWidth, height: contentHeight, transform: `translate3D(${-scrollLeft}px, ${-scrollTop}px, 0)` }}>
          { children }
        </div>
      </div>);
  },
});
