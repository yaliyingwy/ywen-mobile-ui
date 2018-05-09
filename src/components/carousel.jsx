import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Scroller from './scroller';

class Carousel extends PureComponent {
  state = {
    page: 0,
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (this.timer && nextProps.autoPlayInterval <= 0) {
      this.clearTimer();
    }

    if (!this.timer && nextProps.autoPlayInterval > 0) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }


  setPage = () => {
    const scroller = this.scroller.getScroller();
    const { left } = scroller.getValues();
    const width = this.scroller.container.clientWidth;
    const page = Math.round(left / width);
    this.setState({ page });
  }

  startTimer = () => {
    const { autoPlayInterval } = this.props;
    if (autoPlayInterval > 0) {
      this.timer = setInterval(() => {
        if (!this.scroller.isTouching() && this.props.imageList.length > 0) {
          const scroller = this.scroller.getScroller();
          const { left } = scroller.getValues();
          const width = this.scroller.container.clientWidth;
          const page = Math.round(left / width);
          const max = this.props.imageList.length - 1;
          let nextPage;
          if (page === max) {
            nextPage = 0;
          } else {
            nextPage = page + 1;
          }
          console.log('nextPage', nextPage);
          scroller.scrollTo(nextPage * width, 0, true);
        }
      }, autoPlayInterval);
    }
  }

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  options = {
    scrollingX: true,
    scrollingY: false,
    paging: true,
    bouncing: false,
    scrollingComplete: this.setPage,
  }

  renderPager = () => {
    const { page } = this.state;
    const { imageList, renderPager } = this.props;
    if (imageList.length > 0 && renderPager) {
      return renderPager(page, imageList.length);
    }
    return null;
  }


  render() {
    const { 
      imageList, 
      className, 
      empty,
      clickFunc,
    } = this.props;
    let cells;
    if (imageList.length === 0) {
      cells = empty;
    } else {
      cells = imageList.map((image, index) => {
        return (
          <div className="carousel-cell" key={index} onClick={() => clickFunc(index)}>
            <img src={image} alt="" className="carousel-image" />
          </div>
        );
      });
    }
    
    return (
      <div className={`ywen-carousel ${className}`}>
        {this.renderPager()}
        <Scroller
          ref={(scroller) => { this.scroller = scroller; }}
          options={this.options}
          contentWidth={`${100 * Math.max(1, imageList.length)}%`}
        >
          {cells} 
        </Scroller>
      </div>
    );
  }
}

Carousel.propTypes = {
  className: PropTypes.string.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  empty: PropTypes.element,
  autoPlayInterval: PropTypes.number,
  renderPager: PropTypes.func,
  clickFunc: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  empty: (
    <div className="carousel-cell">
      <div className="ywen-image-spinner" />
    </div>
  ),
  autoPlayInterval: 0,
  renderPager: (page, total) => {
    const cells = [];
    for (let index = 0; index < total; index += 1) {
      cells.push(<div key={index} className={`pager-dot ${index === page ? 'active' : ''}`} />);
    }
    return (
      <div className="carousel-pager">
        {cells}
      </div>
    );
  },
};

export default Carousel;
