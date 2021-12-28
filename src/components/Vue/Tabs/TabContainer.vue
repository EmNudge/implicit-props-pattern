<template>
  <section class="tabs-container">
    <div class="tabs">
      <span 
        v-for="tab in tabs" 
        :key="tab" 
        :class="{ selected: tab === activeTab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </span>
    </div>
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<script>
import { provide, onUnmounted, ref } from 'vue'

export default {
  setup() {
    const tabs = ref([])
    const activeTab = ref('')

    const addTab = (label) => {
      if (!tabs.value.length) activeTab.value = label
      tabs.value.push(label)
    }
    const removeTab = (label) => {
      tabs.value = tabs.value.filter(tab => tab !== label)
    }

    provide('TAB_CONTAINER', {
      addTab, removeTab, activeTab
    })

    return { tabs, activeTab }
  }
}
</script>