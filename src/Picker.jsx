import React, {PropTypes} from 'react';
import Scroller from './Scroller';

export default React.createClass({
  displayName: 'rc-picker',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    itemGroups: PropTypes.array.isRequired,
    selectItem: PropTypes.func.isRequired,
    confirmFunc: PropTypes.func.isRequired,
    cancelFunc: PropTypes.func,
    onScroll: PropTypes.func,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-picker',
      className: '',
    };
  },

  getInitialState() {
    return {
      show: false,
    };
  },

  componentDidMount() {
    this.scrollerHeight = this.refs.scrollers.offsetHeight;
    this.cellHeight = this.refs.center_line.offsetHeight;
    this.scrollerPadding = (this.scrollerHeight - this.cellHeight) / 2;
    const { itemGroups } = this.props;
    itemGroups.forEach((group, index) => {
      const scroller = this.refs['scroller_' + index];
      scroller.setSnapSize(0, this.cellHeight);
      scroller.updateScrollingDimensions();
    });
  },

  show() {
    this.setState({ show: true });
  },

  close() {
    this.setState({ show: false });
  },

  updateScrollingDimensions(group) {
    this.refs['scroller_' + group].updateScrollingDimensions();
  },

  scrollToIndex(group, index, anim) {
    const scroller = this.refs['scroller_' + group];
    const y = index * this.cellHeight;
    if (anim) {
      scroller.scrollTo(0, y, true, 1);
    } else {
      scroller.setPosition(0, y);
    }
  },

  _onScroll(group, { top }) {
    const { onScroll } = this.props;
    if (onScroll) {
      onScroll({ group, top });
    }
  },

  _scrollEnd(group) {
    this._updateSelectItem(group);
  },

  _updateSelectItem(group) {
    const { itemGroups, selectItem } = this.props;
    const scroller = this.refs['scroller_' + group];
    const { top } = scroller.getValues();

    const max = itemGroups[group].length - 1;
    let index = top  / this.cellHeight;
    index = Math.min(max, Math.max(0, Math.floor(index)));
    selectItem({ group, index });
  },

  _confirm() {
    this.close();
    if (this.props.confirmFunc) {
      this.props.confirmFunc();
    }
  },

  _cancel() {
    this.close();
    if (this.props.cancelFunc) {
      this.props.cancelFunc();
    }
  },

  render() {
    const {
      prefixCls,
      className,
      itemGroups,
    } = this.props;

    const options = {
      scrollingX: false,
      scrollingY: true,
      snapping: true,
    };

    const { show } = this.state;

    const groups = itemGroups.map((group, index) => {
      const itemList = group.map((item, i) => {
        const itemCls = prefixCls + '-item';
        return (<p className={ itemCls } key={ i }>{ item }</p>);
      });
      const contentHeight = group.length * this.cellHeight + 2 * this.scrollerPadding;

      const scroller = (<Scroller
        ref={ `scroller_${index}` }
        key={ index }
        options={ options }
        onScroll={ this._onScroll.bind(this, index) }
        scrollingComplete= { this._scrollEnd.bind(this, index) }
        width={ (100 / itemGroups.length) + '%' }
        height="10rem"
        contentWidth="100%"
        contentHeight={ '' + (contentHeight || 1000) }
        >
          { itemList }
        </Scroller>);
      return scroller;
    });

    const cls = `${prefixCls}  ${className}`;
    const containerCls = `${prefixCls}-container ${show ? 'picker-in' : ''}`;
    const barCls = prefixCls + '-bar';
    const contentCls = prefixCls + '-content';
    const modalCls = `${prefixCls}-modal ${show ? 'modal-in' : ''}`;
    const lineCls = `${prefixCls}-line`;

    return (<div className={ cls }>
        <div className={ containerCls }>
          <div className={ barCls }>
            <a className="btn" onClick={ this._cancel }>取消</a>
            <a className="btn" onClick={ this._confirm }>确定</a>
          </div>
          <div ref="scrollers" className={ contentCls }>
            <div ref="center_line" className={ lineCls }></div>
            { groups }
          </div>
        </div>
        <div className={ modalCls }></div>
      </div>);
  },
});
