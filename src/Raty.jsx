import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-raty',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    enableHalf: PropTypes.bool,
    updateScore: PropTypes.func,
    score: PropTypes.number,
    disable: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-raty',
      className: '',
      enableHalf: true,
      score: 0,
      disable: false,
    };
  },

  getInitialState() {
    return {
      score: this.props.score,
    };
  },

  _touchEnd(e) {
    if (this.props.disable) {
      return;
    }
    this._computeScore(e.changedTouches[0].clientX, e.target.offsetWidth, true);
  },

  _touchMove(e) {
    if (this.props.disable) {
      return;
    }
    this._computeScore(e.changedTouches[0].clientX, e.target.offsetWidth);
  },

  _computeScore(x, starWidth, update = false) {
    const { container } = this.refs;
    const { enableHalf, updateScore } = this.props;
    const offset = x - container.offsetLeft;
    const stars = offset / starWidth;
    let score;
    if (enableHalf) {
      const full = Math.floor(stars);
      const half = Math.round(stars - full);
      score = full * 2 + half;
    } else {
      score = Math.ceil(stars) * 2;
    }
    this.setState({ score });
    if (update) {
      updateScore(score);
    }
  },

  render() {
    const { prefixCls, className, enableHalf } = this.props;
    const cls = `${prefixCls}  ${className}`;
    const { score } = this.state;
    const scorePerStar = 2;

    const stars = [1, 2, 3, 4, 5].map((star) => {
      let starCls = `${prefixCls}-star `;
      const position = score / scorePerStar;
      if (position >= star) {
        starCls += ' full';
      } else if (enableHalf && star - position === 0.5) {
        starCls += ' half';
      } else {
        starCls += ' empty';
      }
      return <span data-star={ star } key={ star } className={ starCls }></span>;
    });

    return (<div ref="container" className={ cls } onTouchEnd={ this._touchEnd } onTouchMove={ this._touchMove }>
        { stars }
      </div>);
  },
});
