import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inViewport } from '../utils/domUtil';
import { debounce } from '../utils/funcUtil';


class ListView extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'ListView';
    this.onScroll = this.onScroll.bind(this);
    this.loadMore = debounce(this.loadMore.bind(this), 800); // 下拉刷新触发间隔800毫秒，防抖动
    this.y = 0;
  }

  onScroll(e) {
    const { loadMore, hasMore, enabled } = this.props;
    if (!loadMore || !hasMore || !enabled) {
      return;
    }
    const lastChild = e.target.lastElementChild;
    if (inViewport(lastChild, e.target) && this.y < e.target.scrollTop) {
      this.loadMore();
    }
    this.y = e.target.scrollTop;
  }

  loadMore() {
    const { loadMore } = this.props;
    if (loadMore) {
      loadMore();
    }
  }

  render() {
    const { 
      className,
      loadMore,
      hasMore,
      renderFooter,
      children,
      empty,
      enabled,
      ...rest
    } = this.props;
    return (
      <div className={className} {...rest} onScroll={this.onScroll}>
        {children.length === 0 && !hasMore ? empty : children}
        {loadMore && children.length > 0 && renderFooter ? renderFooter(hasMore) : null}
      </div>
    );
  }
}

ListView.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  renderFooter: PropTypes.func,
  empty: PropTypes.element,
  enabled: PropTypes.bool,
};

ListView.defaultProps = {
  className: '',
  children: null,
  loadMore: null,
  hasMore: true,
  enabled: true,
  renderFooter: hasMore => <div className="ywen-listview-footer">{hasMore ? '正在加载。。。' : '没有更多数据了'}</div>,
  empty: <div className="ywen-listview-empty"><p>没有相关数据</p></div>,
};

export default ListView;
