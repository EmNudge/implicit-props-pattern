/** @jsxImportSource react */
import { default as AudioContextNode } from './AudioContext';
import { default as GainNode } from './GainNode';
import { default as OscillatorNode } from './OscillatorNode';
import React, { useState } from 'react';

export default function App() {
  const [showAudio, setShowAudio] = useState(false);

  const [frequency, setFrequency] = useState(300);
  const changeFrequency = (e: React.SyntheticEvent<{ value: string }>) =>
    setFrequency(Number(e.currentTarget.value));

  return (
    <div>
      <button onClick={() => setShowAudio(prev => !prev)}>
        {showAudio ? 'Stop Audio' : 'PlayAudio'}
      </button>

      <input 
        type="range" min="100" max="1000" step="5" 
        value={frequency}
        onInput={changeFrequency}
      />

      {showAudio && (
        <AudioContextNode>
          <GainNode volume={.2}>
            <OscillatorNode frequency={frequency} type='sine' />
          </GainNode>
        </AudioContextNode>
      )}
    </div>
  );
}
