import React, {PropTypes} from 'react';
import Scroller from './Scroller';
import Image from './Image';

export default React.createClass({
  displayName: 'rc-carousel',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    showPager: PropTypes.bool,
    autoPlay: PropTypes.bool,
    playTime: PropTypes.number,
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
      playTime: 5000,
    };
  },

  getInitialState() {
    return {
      currentIndex: 0,
    };
  },

  componentDidMount() {
    const { autoPlay, playTime } = this.props;
    if (autoPlay) {
      this.interval = setInterval(() => {
        const { images } = this.props;
        const { currentIndex } = this.state;
        const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        const { container, scroller } = this.refs;

        scroller.scrollTo( nextIndex * container.clientWidth, 0, true, 1);
      }, playTime);
    }
  },

  _onScroll({ left }) {
    const { images } = this.props;
    const { container } = this.refs;
    if (!container || left <= 0 ) {
      return;
    }
    const width = container.clientWidth;
    // 当前最大的可见页
    const offset = left / width;
    const visibleIndex = Math.min(Math.ceil(offset), images.length - 1);
    const currentIndex = Math.min(Math.round(offset), images.length - 1);
    this.refs['img' + visibleIndex]._checkVisible();
    if (currentIndex !== this.state.currentIndex) {
      this.setState({ currentIndex });
    }
  },

  render() {
    const { currentIndex } = this.state;
    const {
      prefixCls,
      className,
      width,
      height,
      images,
      clickFunc,
    } = this.props;

    const options = {
      scrollingX: true,
      scrollingY: false,
      paging: true,
    };

    const cls = `${prefixCls}  ${className}`;
    const contentCls = `${prefixCls}-content`;
    const paginationCls = `${prefixCls}-pagination`;

    const imgCells = [];
    const pageCells = [];
    images.forEach((image, index) => {
      imgCells.push(<Image onClick={ clickFunc.bind(this, index) } ref={ 'img' + index } key={ index } src={ image } />);
      const paginationItemCls = `${prefixCls}-pagination-item ${currentIndex === index ? 'active' : ''}`;
      pageCells.push(<span className={ paginationItemCls } key={ index } />);
    });

    const contentWidth = width.replace(/^(\d+)*/, (num) => num * images.length);

    let sWidth;
    if (width.includes('%')) {
      sWidth = '100%';
    } else {
      sWidth = width;
    }

    return (<div ref="container" className={ cls } style={{ width, height }}>
        <div className={ contentCls }>
          <Scroller
            ref="scroller"
            options={ options }
            onScroll={ this._onScroll }
            width={ sWidth }
            height="100%"
            contentWidth={ contentWidth }
            height= { height }
          >
            { imgCells }
          </Scroller>
        </div>

        <div className={ paginationCls }>
          { pageCells }
        </div>
      </div>);
  },
});
