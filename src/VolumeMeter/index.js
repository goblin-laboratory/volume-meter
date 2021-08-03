import React from 'react';
import PropTypes from 'prop-types';
import AudioWorkletNodeVolumeMeter from './AudioWorkletNodeVolumeMeter';
import ScriptProcessorNodeVolumeMeter from './ScriptProcessorNodeVolumeMeter';
import './index.css';

const VolumeMeter = ({ stream, max = 10, style = {}, type='AudioWorkletNode' }) => {
  return 'AudioWorkletNode' === type ? <AudioWorkletNodeVolumeMeter stream={stream} max={max} style={style} />  :  <ScriptProcessorNodeVolumeMeter stream={stream} max={max} style={style} />;
};

VolumeMeter.propTypes = {
  type: PropTypes.oneOf(['AudioWorkletNode', 'ScriptProcessorNode']),
  stream: PropTypes.object,
  max: PropTypes.number,
  style: PropTypes.object,
};

VolumeMeter.defaultProps = {
  type: 'AudioWorkletNode',
  stream: null,
  max: 0,
  style: null,
};

export default React.memo(VolumeMeter, (p, n) => p.type === n.type && p.stream === n.stream && p.max === n.max && p.style === n.style);
