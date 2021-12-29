<script>
import { inject, provide, onUpdated } from 'vue'

export default {
  props: {
    volume: Number
  },
  setup(props) {
    const { audioContext, parentNode } = inject('AUDIO_CONTEXT')

    const gainNode = audioContext.createGain()
    gainNode.connect(parentNode);
    gainNode.gain.value = props.volume ?? 0.2

    onUpdated(() => {
      const endTime = audioContext.currentTime + .1;
      gainNode.gain.linearRampToValueAtTime(props.volume, endTime);
    })

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