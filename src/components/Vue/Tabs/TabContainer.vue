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
import { provide, ref } from 'vue'

export const key = Symbol()

export default {
  setup() {
    const tabs = ref([])
    const activeTab = ref('')

    provide(key, {
      addTab(label) {
        if (!tabs.value.length) activeTab.value = label
        tabs.value.push(label)
      },
      removeTab(label) {
        tabs.value = tabs.value.filter(tab => tab !== label)
      },
      activeTab
    })

    return { tabs, activeTab }
  }
}
</script>