<template>
  <div :class="['c-radio-group', props.layout]">
    <div v-if="label" class="c-radio-label">{{ label }}:</div>
    <div class="c-radio" v-for="(item, index) in props.options" :key="item.value" @click="onChange">
      <input type="radio" :id="`radio_${index}`" :value="item.value" :checked="props.value === item.value" />
      <label :for="`radio_${index}`" :data-value="item.value">{{ item.label }}</label>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CRadioGroup'
}
</script>
<script lang="ts" setup>
type RadioOption = {
  label?: string
  value?: string | number
}
type RadioOptions = RadioOption[]
interface Props {
  options: RadioOptions;
  label?: string;
  value?: string | number;
  layout?: string;
}
const props = withDefaults(defineProps<Props>(), {
  layout: "row"
})

const emit = defineEmits(["update:value"])
const onChange = (e: Event) => {
  const target = (e.target as HTMLInputElement)
  if (target.tagName === "LABEL") {
    emit("update:value", target.dataset.value)
  } else if (target.tagName === "INPUT") {
    emit("update:value", target.value)
  }
}
</script>
<style lang="scss" scoped>
.c-radio-group {
  .c-radio-label {
    line-height: 32px;
    margin-right: 12px;
    font-size: 15px;
    white-space: nowrap;
  }

  &.column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &.row {
    display: flex;
    align-items: center;
  }

  .c-radio {

    input,
    label {
      cursor: pointer;
    }

    line-height: 32px;
    height: 32px;
    margin-right: 10px;
    white-space: nowrap;
  }
}
</style>

