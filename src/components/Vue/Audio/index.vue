<template>
  <button @click="playPause">
    {{ isPlaying ? 'Stop Audio' : 'Play Audio' }}
  </button>

  <AudioContextNode v-if="isPlaying">
    <GainNode :volume=".2">
      <OscillatorNode :frequency="300" type="sine" />
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

      const playPause = () => 
        isPlaying.value = !isPlaying.value

      return { isPlaying, playPause }
    }
  }
</script>

<style>
</style>
