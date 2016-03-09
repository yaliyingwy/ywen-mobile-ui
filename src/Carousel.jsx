import React, {PropTypes} from 'react';
// import ReactDom from 'react-dom';

export default React.createClass({
  displayName: 'rc-carousel',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    showPager: PropTypes.bool,
    autoPlay: PropTypes.bool,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    clickFunc: PropTypes.func.isRequired,
    images: PropTypes.array,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-carousel',
      className: '',
      showPager: true,
      autoPlay: true,
    };
  },

  getInitialState() {
    return {
      loadedIndex: 1,
      currentIndex: 0,
      offset: 0,
    };
  },

  _touchMove(e) {
    console.log(e.nativeEvent);
  },

  render() {
    const { loadedIndex, currentIndex } = this.state;
    const {
      prefixCls,
      className,
      width,
      height,
      images,
      clickFunc,
    } = this.props;

    // const transform = `translate3D(${offset}px,0,0)`;

    const cls = `${prefixCls}  ${className}`;
    const imgCells = [];
    const pageCells = [];
    images.forEach((image, index) => {
      // lazy load image
      if (index < loadedIndex) {
        imgCells.push(<img onClick={ clickFunc.bind(this, index) } key={ index } src={ image } style={{ width: '100%', height: '100%' }} />);
      } else {
        imgCells.push(<img onClick={ clickFunc.bind(this, index) } key={ index } src={ image }style={{ width: '100%', height: '100%' }} />);
      }

      const pageCls = `swiper-pagination-bullet ${index === currentIndex ? 'swiper-pagination-bullet-active' : ''}`;
      pageCells.push(<span key={ index } className={ pageCls } />);
    });

    return (<div className={ cls } style={{ width, height }}>
        <div className="swiper-wrapper" onTouchMove={ this._touchMove } style={{ width, height, overflowX: 'scroll' }}>
          { imgCells }
        </div>
        <div className="swiper-pagination">
          { pageCells }
        </div>
      </div>);
  },
});
