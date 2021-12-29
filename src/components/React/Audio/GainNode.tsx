import React, { useEffect, useContext, useMemo } from 'react';
import { AudioContextContext } from './AudioContext';

const GainNode: React.FC<{ volume?: number }> = ({ children, volume }) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const gainNode = useMemo(() => {
    const node = audioContext.createGain();
    node.connect(parentNode);
    node.gain.value = volume || 0.2;

    return node;
  }, []);

  const providerData = useMemo(
    () => ({
      audioContext,
      parentNode: gainNode
    }),
    [volume]
  );

  useEffect(() => {
    const endTime = audioContext.currentTime + .1;
    gainNode.gain.linearRampToValueAtTime(volume, endTime);
  }, [volume]);

  return (
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default GainNode;