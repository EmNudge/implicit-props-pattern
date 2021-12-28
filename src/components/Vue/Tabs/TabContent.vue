<template>
  <slot v-if="activeTab === label" />
</template>

<script>
import { inject, onUnmounted, watchEffect } from 'vue'

export default {
  props: {
    label: String,
  },

  setup ({ label }) {
    const { addTab, removeTab, activeTab } = inject('TAB_CONTAINER')

    addTab(label)
    onUnmounted(() => {
      removeTab(label)
    })

    return { activeTab }
  }
}
</script>