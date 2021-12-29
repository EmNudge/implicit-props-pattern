<script>
import { inject, provide, onUpdated } from 'vue'
import { key } from './AudioContext.vue'

export default {
  props: {
    frequency: Number,
    type: String
  },
  setup (props) {
    const { audioContext, parentNode } = inject(key)

    const oscillator = audioContext.createOscillator()
    oscillator.type = props.type ?? 'sine'
    oscillator.frequency.value = props.frequency ?? 100
    oscillator.connect(parentNode)
    oscillator.start(0)

    onUpdated(() => {
      oscillator.type = props.type ?? 'sine'

      const endTime = audioContext.currentTime + .2
      oscillator.frequency.linearRampToValueAtTime(props.frequency, endTime)
    })

    provide(key, {
      audioContext,
      parentNode: oscillator
    })
  }
}
</script>

<template>
  <slot/>
</template>