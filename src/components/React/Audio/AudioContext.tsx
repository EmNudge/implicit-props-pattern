import React, { useEffect, useMemo } from 'react';

export const AudioContextContext = React.createContext({
  audioContext: null,
  parentNode: null
});

const AudioContextNode: React.FC = ({ children }) => {
  const audioContext = new window.AudioContext();

  const providerData = useMemo(
    () => ({
      audioContext,
      parentNode: audioContext.destination
    }),
    []
  );

  useEffect(() => {
    return () => audioContext.close();
  });

  return (
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default AudioContextNode;