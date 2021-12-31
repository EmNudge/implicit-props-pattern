import React, { useEffect, useMemo } from 'react';

export const AudioContextContext = React.createContext({
  audioContext: null,
  parentNode: null
});

const AudioContextNode = ({ children }: { children: React.ReactNode }) => {
  const audioContext = useMemo(() => new window.AudioContext(), []);

  const providerData = useMemo(
    () => ({
      audioContext,
      parentNode: audioContext.destination
    }),
    []
  );

  // React's onUnmounted
  useEffect(() => () => void audioContext.close(), []);

  return (
    // @ts-ignore
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default AudioContextNode;