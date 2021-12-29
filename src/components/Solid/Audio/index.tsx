/** @jsxImportSource solid-js */
import { createSignal, Show } from "solid-js";
import { AudioContextNode, GainNode, OscillatorNode } from './AudioContext'

export default function App() {
  const [showAudio, setShowAudio] = createSignal(false);
  const [frequency, setFrequency] = createSignal(300);
  const changeFrequency = (e) =>
    setFrequency(Number(e.currentTarget.value));

  return (
    <section>
      <button onClick={() => setShowAudio(prev => !prev)}>
        {showAudio() ? 'Stop' : 'Play'} Audio
      </button>

      <input 
        type="range" min="100" max="1000" step="5" 
        value={frequency()}
        onInput={changeFrequency}
      />
  
      <Show when={showAudio()}>
        <AudioContextNode>
          <GainNode volume={.2}>
            <OscillatorNode frequency={frequency()} type='sine' />
          </GainNode>
        </AudioContextNode>
      </Show>
    </section>
  );
}
