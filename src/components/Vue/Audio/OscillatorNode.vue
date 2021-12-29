<script>
import { inject, provide, onUpdated } from 'vue'

export default {
  props: {
    frequency: Number,
    type: String
  },
  setup (props) {
    const { audioContext, parentNode } = inject('AUDIO_CONTEXT')

    const oscillator = audioContext.createOscillator()
    oscillator.type = props.type ?? 'sine'
    oscillator.frequency.value = props.frequency ?? 100
    oscillator.connect(parentNode)
    oscillator.start(0)

    onUpdated(() => {
      oscillator.type = props.type ?? 'sine'

      const endTime = audioContext.currentTime + .2;
      oscillator.frequency.linearRampToValueAtTime(props.frequency, endTime);
    })

    provide('AUDIO_CONTEXT', {
      audioContext,
      parentNode: oscillator
    })
  }
}
</script>

<template>
  <slot/>
</template>