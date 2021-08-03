import React from 'react';
import PropTypes from 'prop-types';
import useVolume from './useVolume';
import VolumeMeter from '../VolumeMeter';

const ScriptProcessorNodeVolumeMeter = ({ stream, max, style }) => {
  const volume = useVolume(stream);
  return <VolumeMeter volume={volume} max={max} style={style} />;
};

ScriptProcessorNodeVolumeMeter.propTypes = {
  stream: PropTypes.object,
  max: PropTypes.number,
  style: PropTypes.object,
};

ScriptProcessorNodeVolumeMeter.defaultProps = {
  stream: null,
  max: 0,
  style: null,
};

export default React.memo(ScriptProcessorNodeVolumeMeter, (p, n) => p.stream === n.stream && p.max === n.max && p.style === n.style);;
