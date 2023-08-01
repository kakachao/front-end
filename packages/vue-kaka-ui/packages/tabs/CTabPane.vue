<template>
  <template v-if="keepAlive">
    <div v-show="name == activeKey" class="c-tabs-tab">
      <slot></slot>
    </div>
  </template>
  <template v-else>
    <div v-if="name == activeKey" class="c-tabs-tab">
      <slot></slot>
    </div>
  </template>
</template>
<script lang="ts">
export default {
  name: 'CTabPane'
}
</script>
<script lang="ts" setup>
import { inject, onMounted, ref, watch, } from 'vue';

const props = defineProps<{
  name: string,
  title: string,
  keepAlive?: boolean
}>()
// const TabsInstance = inject('TabsInstance') as any
const ininTabs = inject('ininTabs', Function, true)
const activeKey = inject('activeKey');
onMounted(() => {
  // console.log(TabsInstance, 'TabsInstance')
  ininTabs()
})
watch(() => props.name, () => {
  // TabsInstance.ctx.initTabs()
  ininTabs()
})
watch(() => props.title, () => {
  // TabsInstance.ctx.initTabs()
  ininTabs()
})
</script>


<style scoped></style>