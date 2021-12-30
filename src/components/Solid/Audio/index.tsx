/** @jsxImportSource solid-js */
import { createSignal, Show } from "solid-js";
import { AudioContextNode, GainNode, OscillatorNode } from './AudioContext'

export default function App() {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [frequency, setFrequency] = createSignal(300);
  const changeFrequency = (e) =>
    setFrequency(Number(e.currentTarget.value));

  return (
    <>
      <button onClick={() => setIsPlaying(prev => !prev)}>
        {isPlaying() ? 'Stop' : 'Play'} Audio
      </button>

      <input 
        type="range" min="100" max="1000" step="5" 
        value={frequency()}
        onInput={changeFrequency}
      />
  
      <Show when={isPlaying()}>
        <AudioContextNode>
          <GainNode volume={.2}>
            <OscillatorNode frequency={frequency()} type='sine' />
          </GainNode>
        </AudioContextNode>
      </Show>
    </>
  );
}
