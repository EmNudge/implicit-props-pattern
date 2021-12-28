import React, { useEffect, useMemo } from 'react';

export const AudioContextContext = React.createContext({
  audioContext: null,
  parentNode: null
});

export default ({ children }) => {
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
