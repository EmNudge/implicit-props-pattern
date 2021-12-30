<template>
  <button @click="isPlaying = !isPlaying">
    {{ isPlaying ? 'Stop' : 'Play' }} Audio
  </button>

  <input 
    type="range" min="100" max="1000" step="5" 
    v-model="frequency"
  />

  <AudioContextNode v-if="isPlaying">
    <GainNode :volume=".2">
      <OscillatorNode :frequency="frequency" type="sine" />
    </GainNode>
  </AudioContextNode>
</template>

<script> 
  import { ref } from 'vue'

  import AudioContextNode from './AudioContext.vue'
  import GainNode from './GainNode.vue'
  import OscillatorNode from './OscillatorNode.vue'

  export default {
    components: {
      AudioContextNode,
      GainNode,
      OscillatorNode
    },
    setup() {
      const isPlaying = ref(false)
      const frequency = ref(300)

      return { isPlaying, frequency }
    }
  }
</script>
