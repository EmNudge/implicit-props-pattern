/** @jsxImportSource solid-js */
import { createContext, useContext, onCleanup, createEffect } from 'solid-js'

const AudioContextContext = createContext({
  audioContext: null,
  parentNode: null
});

export const AudioContextNode = (props: { children: unknown }) => {
  const audioContext = new AudioContext();

  const providerData = {
    audioContext,
    parentNode: audioContext.destination
  };

  onCleanup(() => audioContext.close());

  return (
    <AudioContextContext.Provider value={providerData}>
      {props.children}
    </AudioContextContext.Provider>
  );
};

export const GainNode = (props: { volume: number, children: unknown }) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const gainNode = audioContext.createGain();
  gainNode.connect(parentNode);
  gainNode.gain.value = props.volume || 0.2;

  createEffect(() => {
    const endTime = audioContext.currentTime + .2;
		gainNode.gain.linearRampToValueAtTime(props.volume, endTime);
  });

  const providerData = {
    audioContext,
    parentNode: gainNode
  };

  return (
    <AudioContextContext.Provider value={providerData}>
      {props.children}
    </AudioContextContext.Provider>
  );
};

export const OscillatorNode = (props: { type: string, frequency: number }) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const oscillator = audioContext.createOscillator();
  oscillator.type = props.type || 'sine';
  oscillator.frequency.value = props.frequency || 100;
  oscillator.connect(parentNode);
  oscillator.start(0);

  createEffect(() => {
    oscillator.type = props.type;
  });
  createEffect(() => {
		const endTime = audioContext.currentTime + .2;
		oscillator.frequency.linearRampToValueAtTime(props.frequency, endTime);
  });
  

  return null;
};
