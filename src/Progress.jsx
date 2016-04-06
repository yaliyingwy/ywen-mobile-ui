import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-progress',

  propTypes: {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    progress: PropTypes.number,
    size: PropTypes.string.isRequired,
  },


  getDefaultProps() {
    return {
      prefixCls: 'rc-progress',
      className: '',
      progress: 0,
    };
  },

  _computeStyle() {
    const progress = Math.floor(this.props.progress);
    const style = {
      s0_25: {},
      s25_50: {},
      s50_75: {},
      s75_100: {},
    };

    const transforms = ['WebkitTransform', 'MozTransform', 'transform'];

    if (progress < 25) {
      const angle = -90 + (progress / 100) * 360;
      transforms.forEach((transform) => {
        style.s0_25[transform] = `rotate(${angle}deg)`;
      });   
    } else if (progress >= 25 && progress < 50) {
      const angle = -90 + ((progress - 25) / 100) * 360;
      transforms.forEach((transform) => {
        style.s0_25[transform] = 'rotate(0deg)';
        style.s25_50[transform] = `rotate(${angle}deg)`;
      });
    } else if (progress >= 50 && progress < 75) {
      const angle = -90 + ((progress - 50) / 100) * 360;
      transforms.forEach((transform) => {
        style.s0_25[transform] = 'rotate(0deg)';
        style.s25_50[transform] = 'rotate(0deg)';
        style.s50_75[transform] = `rotate(${angle}deg)`;
      });      
    } else if (progress >= 75 && progress <= 100) {
      const angle = -90 + ((progress - 75) / 100) * 360;
      transforms.forEach((transform) => {
        style.s0_25[transform] = 'rotate(0deg)';
        style.s25_50[transform] = 'rotate(0deg)';
        style.s50_75[transform] = 'rotate(0deg)';
        style.s75_100[transform] = `rotate(${angle}deg)`;
      });
    }
    return style;
  },

  render() {
    const {prefixCls, className, progress, size} = this.props;
    const cls = `${prefixCls}  ${className}`;
    const style = this._computeStyle();

    return (<div className={ cls } style={{ width: size, height: size }}>
        <div className="loader-bg">
          <div className="text">{ progress + '%' }</div>
        </div>
        <div className="spiner-holder-one animate-0-25-a">
          <div style={ style.s0_25 } className="spiner-holder-two animate-0-25-b">
            <div className="loader-spiner" ></div>
          </div>
        </div>
        <div className="spiner-holder-one animate-25-50-a">
          <div style={ style.s25_50 } className="spiner-holder-two animate-25-50-b">
            <div className="loader-spiner"></div>
          </div>
        </div>
        <div className="spiner-holder-one animate-50-75-a">
          <div style={ style.s50_75 } className="spiner-holder-two animate-50-75-b">
            <div className="loader-spiner"></div>
          </div>
        </div>
        <div className="spiner-holder-one animate-75-100-a">
          <div style={ style.s75_100 } className="spiner-holder-two animate-75-100-b">
            <div className="loader-spiner"></div>
          </div>
        </div>
      </div>);
  },
});
