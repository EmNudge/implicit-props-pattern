<script>
import { inject, provide, onUpdated } from 'vue'
import { key } from './AudioContext.vue'

export default {
  props: {
    volume: Number
  },
  setup(props) {
    const { audioContext, parentNode } = inject(key)

    const gainNode = audioContext.createGain()
    gainNode.connect(parentNode)
    gainNode.gain.value = props.volume ?? 0.2

    onUpdated(() => {
      const endTime = audioContext.currentTime + .1
      gainNode.gain.linearRampToValueAtTime(props.volume, endTime)
    })

    provide(key, {
      audioContext,
      parentNode: gainNode
    })
  }
}
</script>

<template>
  <slot/>
</template>