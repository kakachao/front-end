<template>
  <transition name="fade">
    <div :class="['c-message', type]" v-if="isShow">
      <!--可参考下面的icon组件-->
      <slot name="prefix">
        <svg-icon class="c-message-icon" :icon="type"></svg-icon>
      </slot>
      <span class="text">{{ props.text }}</span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import SvgIcon from "../svg-icon/SvgIcon.vue";
import { ref, onMounted } from "vue"
const MESSAGE_TIMEOUT = 2000;
interface CMessageProps {
  text?: string
  type?: string
  timeout?: number
}
const props = withDefaults(defineProps<CMessageProps>(), {
  type: 'success',
  timeout: MESSAGE_TIMEOUT
})


const isShow = ref<boolean>(false)
onMounted(() => {
  isShow.value = true
  setTimeout(() => {
    isShow.value = false
  }, props.timeout)
})
</script>

<style scoped lang="scss">
.fade-enter-active {
  animation: fade .5s;
}

.fade-leave-active {
  animation: fade .5s reverse;
}

/* 定义帧动画 */
@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
  }
}

.c-message {
  min-width: 120px;
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  border-radius: 4px;

  .c-message-icon {
    font-size: 18px;
  }

  .text {
    vertical-align: middle;
    margin-left: 8px;
  }

  &.warn {
    background: #fff7e6;
    border-color: #ffe7ba;
  }

  &.error {
    background: #fff1f0;
    border-color: #ffccc7;
  }

  &.success {
    background: #f6ffed;
    border-color: #d9f7be;
  }

  &.info {
    background: #e6f7ff;
    border-color: #bae7ff;
  }
}
</style>

