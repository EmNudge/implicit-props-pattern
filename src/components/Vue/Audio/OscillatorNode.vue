<script>
import { inject, provide } from 'vue'

export default {
  props: {
    frequency: Number,
    type: String
  },
  setup ({ frequency, type }) {
    const { audioContext,parentNode } = inject('AUDIO_CONTEXT')

    const oscillator = audioContext.createOscillator()
    oscillator.type = type ?? 'sine'
    oscillator.frequency.value = frequency || 100
    oscillator.connect(parentNode)
    oscillator.start(0)

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