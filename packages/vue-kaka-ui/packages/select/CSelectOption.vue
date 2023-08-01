<template>
  <div class="c-select-option">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CSelectOption'
}
</script>
<script lang="ts" setup>
const props = defineProps<{
  value: string | number,
  title: string
}>()
</script>
<style lang="scss">
.c-select-option {
  text-align: left;
  padding: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>