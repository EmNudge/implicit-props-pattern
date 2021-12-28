import React, { useContext, useMemo } from 'react';
import { AudioContextContext } from './AudioContext';

interface Props {
    frequency?: number;
    type?: string;
}

const OscillatorNode: React.FC<Props> = ({ children, frequency, type }) => {
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

export default OscillatorNode;