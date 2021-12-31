import React, { useEffect, useContext, useMemo } from 'react';
import { AudioContextContext } from './AudioContext';

interface Props {
  children?: React.ReactNode
  frequency?: number;
  type?: string;
}

const OscillatorNode = ({ children, frequency, type }: Props) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const oscillator = useMemo(() => {
    const node = audioContext.createOscillator();
    node.type = type || 'sine';
    node.frequency.value = frequency || 100;
    node.connect(parentNode);
    node.start(0);

    return node;
  }, []);

  const providerData = useMemo(
    () => ({
      audioContext,
      parentNode: oscillator
    }),
    [frequency, type]
  );

  useEffect(() => {
    oscillator.type = type ?? 'sine';
  }, [type]);
  
  useEffect(() => {
    const endTime = audioContext.currentTime + .2;
    oscillator.frequency.linearRampToValueAtTime(frequency, endTime);
  }, [frequency]);

  return (
    // @ts-ignore
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default OscillatorNode;