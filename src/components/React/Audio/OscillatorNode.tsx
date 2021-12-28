import React, { useContext, useMemo } from 'react';
import { AudioContextContext } from './AudioContext';

interface Props {
    children?: any[];
    frequency?: number;
    type?: string;
}
export default ({ children, frequency, type }: Props) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const oscillator = audioContext.createOscillator();
  oscillator.type = type || 'sine';
  oscillator.frequency.value = frequency || 100;
  oscillator.connect(parentNode);
  oscillator.start(0);

  const providerData = useMemo(
    () => ({
      audioContext,
      parentNode: oscillator
    }),
    [frequency, type]
  );

  return (
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};
