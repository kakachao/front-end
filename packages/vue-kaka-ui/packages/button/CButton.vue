<template>
  <div class="c-button" :class="btnClass">
    <svg-icon v-if="icon" class="c-button-icon" :icon="icon"></svg-icon>
    <div class="c-button-txt">
      <slot> {{ text }}</slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CButton'
}
</script>
<script setup lang="ts">
import SvgIcon from '../svg-icon/SvgIcon.vue';
import { computed } from 'vue';

interface ButtonProps {
  text?: string,
  icon?: string,
  type?: string,
  size?: string,
  disabled?: boolean
}
const props = withDefaults(defineProps<ButtonProps>(), {
  text: '',
  size: 'default',
  disabled: false
})
const btnClass = computed(() => {
  return {
    'c-primary-btn': props.type == 'primary',
    'c-danger-btn': props.type == 'danger',
    'c-large-btn': props.size == 'large',
    'c-small-btn': props.size == 'small',
    'c-btn-disabled': props.disabled
  }
})
</script>

<style lang="scss" scoped>
.c-button {
  display: inline-block;
  width: auto;
  margin: 0;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  color: #999999;
  box-shadow: 0px 4px 4px 0px rgba(208, 208, 208, 0.1);
  border: 1px solid #E2E2E2;
  white-space: nowrap;
  .c-button-icon {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
  }

  .c-button-txt {
    display: inline-block;
  }
}

.c-primary-btn {
  // background-color: ;
  background: #1890ff;
  color: #fff;
  border: none;
}

.c-danger-btn {
  background: #ff4d4f;
  color: #fff;
  border: none;
}

.c-large-btn {
  height: 40px;
  line-height: 40px;
}

.c-small-btn {
  height: 24px;
  line-height: 24px;
  padding: 0 7px;
  font-size: 13px;
}

.c-btn-disabled {
  background-color: #f5f5f5;
  color: #00000040;
  // cursor: no-allowed;
  pointer-events: none;
  cursor: not-allowed;
}
</style>