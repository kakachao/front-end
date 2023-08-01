<template>
  <div class="c-checkbox">
    <input type="checkbox" id="checkbox" :checked="checked" @input="update">
    <label for="checkbox">{{ label }}</label>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Checkbox'
}
</script>
<script lang="ts" setup>
// 属性
interface CheckboxProps {
  checked: boolean
  label?: string
}
const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false
})

// 方法
const emit = defineEmits(["update:checked"])

const update = (e: Event) => {
  const targetChecked = (e.target as HTMLInputElement).checked
  emit("update:checked", targetChecked)
}
</script>
<style lang="scss" scoped>
.c-checkbox{
  display: flex;
  align-items: center;
  color: #999;
  #checkbox{
    margin-right: 4px;
  }
}
</style>

