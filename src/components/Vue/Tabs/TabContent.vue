<template>
  <slot v-if="activeTab === label" />
</template>

<script>
import { inject, onUnmounted } from 'vue'
import { key } from './TabContainer.vue'

export default {
  props: {
    label: String,
  },

  setup({ label }) {
    const { addTab, removeTab, activeTab } = inject(key)

    addTab(label)
    onUnmounted(() => removeTab(label))

    return { activeTab }
  }
}
</script>