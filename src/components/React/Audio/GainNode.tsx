/** @jsxImportSource react */
import React, { useEffect, useContext, useMemo } from 'react';
import { AudioContextContext, useUnmounted } from './AudioContext';

interface Props {
  children: React.ReactNode;
  volume?: number;
}

const GainNode = ({ children, volume }: Props) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const gainNode = useMemo(() => {
    const node = audioContext.createGain();
    node.connect(parentNode);
    node.gain.value = volume || 0.2;

    return node;
  }, []);

  const providerData = useMemo(() => ({
    audioContext,
    parentNode: gainNode
  }), []);

  useEffect(() => {
    const endTime = audioContext.currentTime + .1;
    gainNode.gain.linearRampToValueAtTime(volume, endTime);
  }, [volume]);

  useUnmounted(() => gainNode.disconnect(parentNode));

  return (
    // @ts-ignore
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default GainNode;