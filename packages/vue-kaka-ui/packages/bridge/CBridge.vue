<template>
  <div class="bridge-container">
    <slot><svg-icon icon="bell" style="font-size: 24px;"></svg-icon></slot>
    <div class="bridge-content">{{ props.count }}</div>
  </div>
</template>
<script lang="ts">
export default {
  name:'CBridge'
}
</script>
<script lang="ts" setup>
const props = defineProps<{
  count: number
}>()
</script>
<style scoped lang="scss">
.bridge-container {
  position: relative;
  width:fit-content;
  .bridge-content {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #F44B2A;
    top: -4px;
    right: -4px;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    color: #fff;
  }
}
</style>