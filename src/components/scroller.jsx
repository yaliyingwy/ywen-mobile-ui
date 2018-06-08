import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PureScroller from 'scroller';

class Scroller extends PureComponent {
  constructor(props) {
    super(props);
    this.scroller = new PureScroller(this.handleScroll, props.options);
  }

  state = {
    scrollLeft: 0,
    scrollTop: 0,
  }
  

  componentDidMount() {
    this.updateScrollingDimensions();
  }

  componentDidUpdate(preProps) {
    if (
      preProps.contentWidth !== this.props.contentWidth || 
      preProps.contentHeight !== this.props.contentHeight
    ) {
      this.updateScrollingDimensions();
    }
  }

  getScroller = () => this.scroller

  handleScroll = (left, top) => {
    this.setState({
      scrollLeft: left,
      scrollTop: top,
    });

    if (this.props.onScroll) {
      this.props.onScroll({ left, top });
    }
  }

  isTouching = () => this.busy

  handleTouchStart = (e) => {
    this.scroller.doTouchStart(e.touches, e.timeStamp);
    this.busy = true;
  }

  handleTouchMove = (e) => {
    e.preventDefault();
    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
  }

  handleTouchEnd = (e) => {
    this.scroller.doTouchEnd(e.timeStamp);
    this.busy = false;
  }

  updateScrollingDimensions = () => {
    const { container, content, scroller } = this;
    scroller.setDimensions(
      container.clientWidth, 
      container.clientHeight, 
      content.offsetWidth, 
      content.offsetHeight,
    );
  }

  render() {
    const { 
      className, 
      children, 
      contentWidth, 
      contentHeight,
    } = this.props;

    const { scrollLeft, scrollTop } = this.state;
    const translate = `translate3D(${-scrollLeft}px, ${-scrollTop}px, 0)`;
    const style = {
      WebkitTransform: translate,
      MozTransform: translate,
      transform: translate,
    };

    if (contentWidth) {
      style.width = contentWidth;
    }

    if (contentHeight) {
      style.height = contentHeight;
    }
    
    return (
      <div 
        className={`ywen-scroller ${className}`} 
        ref={(container) => { this.container = container; }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div className="scroller-content" style={style} ref={(content) => { this.content = content; }}>
          {children}
        </div>
      </div>
    );
  }
}

Scroller.propTypes = {
  className: PropTypes.string,
  onScroll: PropTypes.func,
  options: PropTypes.shape({ // https://github.com/mjohnston/scroller
    scrollingX: PropTypes.bool,
    scrollingY: PropTypes.bool,
    animating: PropTypes.bool,
    animationDuration: PropTypes.number,
    decelerationRate: PropTypes.number,
    bouncing: PropTypes.bool,
    locking: PropTypes.bool,
    paging: PropTypes.bool,
    snapping: PropTypes.bool,
    zooming: PropTypes.bool,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    scrollingComplete: PropTypes.func,
  }),
  children: PropTypes.node,
  contentWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  contentHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Scroller.defaultProps = {
  className: '',
  onScroll: null,
  options: {},
  children: null,
  contentWidth: null,
  contentHeight: null,
};

export default Scroller;
