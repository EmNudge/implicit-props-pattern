/** @jsxImportSource solid-js */
import { createSignal, Show } from "solid-js";
import { AudioContextNode, GainNode, OscillatorNode } from './AudioContext'

export default function App() {
  const [showAudio, setShowAudio] = createSignal(false);
  
  return (
    <section>
      <button onClick={() => setShowAudio(prev => !prev)}>
        {showAudio() ? 'Stop' : 'Play'} Audio
      </button>
  
      <Show when={showAudio()}>
        <AudioContextNode>
          <GainNode volume={.2}>
            <OscillatorNode frequency={200} type='sine' />
          </GainNode>
        </AudioContextNode>
      </Show>
    </section>
  );
}
