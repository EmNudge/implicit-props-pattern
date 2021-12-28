/** @jsxImportSource solid-js */
import { createContext, useContext, onCleanup } from 'solid-js'

const AudioContextContext = createContext({
  audioContext: null,
  parentNode: null
});

export const AudioContextNode = (props) => {
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

export const GainNode = (props) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const gainNode = audioContext.createGain();
  gainNode.connect(parentNode);
  gainNode.gain.value = props.volume || 0.2;

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

export const OscillatorNode = (props) => {
  const { audioContext, parentNode } = useContext(AudioContextContext);

  const oscillator = audioContext.createOscillator();
  oscillator.type = props.type || 'sine';
  oscillator.frequency.value = props.frequency || 100;
  oscillator.connect(parentNode);
  oscillator.start(0);

  return null;
};
