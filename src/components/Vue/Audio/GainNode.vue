<script>
import { inject, provide } from 'vue'
export default {
  props: {
    volume: Number
  },
  setup({ volume }) {
    const { audioContext, parentNode } = inject('AUDIO_CONTEXT')
    const gainNode = audioContext.createGain()
    gainNode.connect(parentNode);
    gainNode.gain.value = volume || 0.2

    provide('AUDIO_CONTEXT', {
      audioContext,
      parentNode: gainNode
    })
  }
}
</script>

<template>
  <slot/>
</template>