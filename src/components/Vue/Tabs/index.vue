<template>
  <TabContainer>
    <TabContent label="tab 1">
      <h1>Hello tab 1</h1>
      <p>This is the first tab</p>
    </TabContent>
    <TabContent label="tab 2">
      <h1>Hello tab 2</h1>
      <p>This is the second tab</p>
    </TabContent>
  </TabContainer>
</template>

<script>
import TabContainer from './TabContainer.vue'
import TabContent from './TabContent.vue'

export default {
  name: 'App',
  components: {
    TabContainer,
    TabContent,
  }
}
</script>
