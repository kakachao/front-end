<template>
  <div class="c-checkbox-group">
    <div class="-checkbox-group__option" v-for="item in state.options" :key="item.key">
      <input type="checkbox" :id="item.key" :checked="item.checked" @input="(e) => { update(e, item) }">
      <label :for="item.key">{{ item.label }}</label>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CheckboxGroup'
}
</script>
<script lang="ts" setup>
import { computed, reactive } from "vue"
import type { PropType } from "vue"
// 单个选项
type CheckboxOption = {
  label: string,	// 显示的label
  value: string | number, // 对应的值
  key?: string,
  checked?: boolean // 是否选中
}

// 组件属性
type CheckboxGroupProp = {
  value: Array<string | number>, // 选中的值数组
  options: CheckboxOption[] // 可选列表
}
const emit = defineEmits(["update:value"])

// 组件属性
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array as PropType<CheckboxOption[]>,
    default: () => []
  }
})

// 初始化选项:加入key属性和checked属性
function initOptions() {
  return props.options.length
    ? props.options.map(op => {
      if (!op.key) {
        op.key = op.value.toString()
      }
      if (props.value.length) {
        op.checked = !!props.value.includes(op.value)
      } else {
        op.checked = false
      }
      return op
    })
    : []
}

// 响应式状态
const state = reactive({
  options: initOptions()
})

// 选中的选项
const selectedOptions = computed(() => state.options.filter(op => op.checked))

// 更新与传递
const update = (e: Event, item: CheckboxOption) => {
  const targetChecked = (e.target as HTMLInputElement).checked
  const target = state.options.find(op => op.key === item.key)
  if (target) {
    target.checked = targetChecked
    emit("update:value", selectedOptions.value.map(op => op.value), selectedOptions)
  }
}
</script>
