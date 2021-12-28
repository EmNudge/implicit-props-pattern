import { default as AudioContextNode } from './AudioContext';
import { default as GainNode } from './GainNode';
import { default as OscillatorNode } from './OscillatorNode';
import { useState } from 'react';

export default function App() {
  const [showAudio, setShowAudio] = useState(false);

  return (
    <div>
      <h1>Implicit Props Audio Context API</h1>
      <button onClick={() => setShowAudio(prev => !prev)}>
        {showAudio ? 'Stop' : 'Play'} Audio
      </button>

      {showAudio && (
        <AudioContextNode>
          <GainNode volume={1}>
            <OscillatorNode />
          </GainNode>
        </AudioContextNode>
      )}
    </div>
  );
}
