/** @jsxImportSource react */
import React, { useEffect, useMemo } from 'react';

export const AudioContextContext = React.createContext({
  audioContext: null,
  parentNode: null
});

export const useUnmounted = (func: () => any) => 
  useEffect(() => () => void func(), []);

const AudioContextNode = ({ children }: { children: React.ReactNode }) => {
  const audioContext = useMemo(() => new AudioContext(), []);

  const providerData = useMemo(() => ({
    audioContext,
    parentNode: audioContext.destination
  }), []);

  // React's onUnmounted
  useUnmounted(() => audioContext.close());

  return (
    // @ts-ignore
    <AudioContextContext.Provider value={providerData}>
      {children}
    </AudioContextContext.Provider>
  );
};

export default AudioContextNode;