import React, { useContext, useMemo } from 'react';
import { AudioContextContext } from './AudioContext';

const GainNode: React.FC<{ volume?: number }> = ({ children, volume }) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const gainNode = audioContext.createGain();
  gainNode.connect(parentNode);
  gainNode.gain.value = volume || 0.2;

  const providerData = useMemo(
    () => ({
      audioContext,
      parentNode: gainNode
    }),
    [volume]
  );

  return (
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default GainNode;