<script>
import { provide, onUnmounted } from 'vue'

export const key = Symbol();

export default {
  setup () {
    const audioContext = new AudioContext()

    onUnmounted(() => audioContext.close())

    provide(key, {
      audioContext,
      parentNode: audioContext.destination
    })
  }
}
</script>

<template>
  <slot/>
</template>