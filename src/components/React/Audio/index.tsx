import { default as AudioContextNode } from './AudioContext';
import { default as GainNode } from './GainNode';
import { default as OscillatorNode } from './OscillatorNode';
import React, { useState } from 'react';

export default function App() {
  const [showAudio, setShowAudio] = useState(false);

  return (
    <div>
      <button onClick={() => setShowAudio(prev => !prev)}>
        {showAudio ? 'Stop Audio' : 'PlayAudio'}
      </button>

      {showAudio && (
        <AudioContextNode>
          <GainNode volume={.2}>
            <OscillatorNode frequency={300} type='sine' />
          </GainNode>
        </AudioContextNode>
      )}
    </div>
  );
}
