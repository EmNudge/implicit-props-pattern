<script>
import { provide, onUnmounted } from 'vue'
export default {
  setup () {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    onUnmounted(() => audioContext.close())

    provide('AUDIO_CONTEXT', { audioContext, parentNode: audioContext.destination })
  }
}
</script>

<template>
  <slot/>
</template>