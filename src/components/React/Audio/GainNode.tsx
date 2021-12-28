import React, { useContext, useMemo } from 'react';
import { AudioContextContext } from './AudioContext';

export default ({ children, volume }: { children: JSX.Element, volume?: number }) => {
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
