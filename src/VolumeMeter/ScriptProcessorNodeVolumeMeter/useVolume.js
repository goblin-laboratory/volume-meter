import React from 'react';

function useVolume(stream) {
  const [volume, setVolume] = React.useState(0);

  const ref = React.useRef({});

  const onaudioprocess = React.useCallback((event) => {
    if (!ref.current.scriptProcessor) {
      return;
    }
    const input = event.inputBuffer.getChannelData(0);
    let sum = 0.0;
    for (let i = 0; i < input.length; i += 1) {
      sum += input[i] * input[i];
    }
    setVolume(Math.round(Math.sqrt(sum / input.length) * 100));
  }, []);

  const disconnectAudioContext = React.useCallback((mediaStream) => {
    if (ref.current.gainNode) {
      try {
        ref.current.gainNode.disconnect();
      } catch (errMsg) {}
    }
    if (ref.current.scriptProcessor) {
      try {
        ref.current.scriptProcessor.disconnect();
      } catch (errMsg) {}
    }
    if (ref.current.mediaStreamSource) {
      try {
        ref.current.mediaStreamSource.disconnect();
      } catch (errMsg) {}
    }
    ref.current.gainNode = null;
    ref.current.scriptProcessor = null;
    ref.current.mediaStreamSource = null;
    ref.current.audioContext = null;
    setVolume(0);
  }, []);

  const connectAudioContext = React.useCallback(
    (mediaStream) => {
      try {
        ref.current.audioContext = new AudioContext();
        ref.current.mediaStreamSource = ref.current.audioContext.createMediaStreamSource(mediaStream);
        ref.current.scriptProcessor = ref.current.audioContext.createScriptProcessor(2048, 1, 1);

        ref.current.scriptProcessor.onaudioprocess = onaudioprocess;
        ref.current.scriptProcessor.connect(ref.current.audioContext.destination);
        ref.current.mediaStreamSource.connect(ref.current.scriptProcessor);
      } catch (errMsg) {
        disconnectAudioContext();
      }
    },
    [disconnectAudioContext, onaudioprocess],
  );

  React.useEffect(() => {
    setVolume(0);
    if (!stream) {
      return () => {};
    }
    connectAudioContext(stream);
    return () => {
      disconnectAudioContext(stream);
    };
  }, [stream, connectAudioContext, disconnectAudioContext]);

  return volume;
}

export default useVolume;
