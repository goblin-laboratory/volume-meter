import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const VolumeMeter = ({ volume, max = 10, style = {} }) => {

  const dividerList = React.useMemo(() => {
    const list = [];
    const width = 100 / (max * 2);
    for (let i = 0; i < max; i += 1) {
      list.push(
        <div
          key={i}
          className="volumeMeterDivider"
          style={{ left: `${(2 * i + 1) * width}%`, width: `${width}%` }}
        />,
      );
    }
    return list;
  }, [max]);

  return (
    <div className="volumeMeter" style={style}>
      <div className="volumeMeterBg" />
      <div
        className="volumeMeterInner"
        style={{
          transform: `scaleX(${Math.ceil((volume * max) / 100) / max})`,
        }}
      />
      {dividerList}
    </div>
  );
};

VolumeMeter.propTypes = {
  volume: PropTypes.number,
  max: PropTypes.number,
  style: PropTypes.object,
};

VolumeMeter.defaultProps = {
  volume: null,
  max: 0,
  style: null,
};

export default React.memo(VolumeMeter, (p, n) => p.volume === n.volume && p.max === n.max && p.style === n.style);
