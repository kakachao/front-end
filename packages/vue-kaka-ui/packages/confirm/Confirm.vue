<template>
  <div class="c-confirm" :class="{ fade: fade }">
    <div class="wrapper">
      <div class="header">
        <h3>{{ props.title }}</h3>
        <svg-icon icon="close" class="pointer" style="font-size: 18px;" @click="props.cancelCallback()"></svg-icon>
      </div>

      <div class="body">
        <svg-icon style="font-size: 18px;" :icon="type"></svg-icon>
        <span>{{ props.content }}</span>
      </div>

      <div class="footer">
        <CButton @click="props.submitCallback()" type="primary" style="margin-right: 16px;">确认</CButton>
        <CButton @click="props.cancelCallback()">取消</CButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import SvgIcon from "../svg-icon/SvgIcon.vue";
import CButton from "../button/CButton.vue";

type callbackFunc = () => void
interface ConfirmProps {
  title?: string;
  content?: string;
  type: string;
  submitCallback: callbackFunc;
  cancelCallback: callbackFunc
}

// 属性
const props = withDefaults(defineProps<ConfirmProps>(), {
  title: '提示',
  content: '',
  type: 'warn',
})
// const props = defineProps({
//   // 弹框标题
//   title: {
//     type: String,
//     default: "提示"
//   },
//   // 弹框内容
//   content: {
//     type: String,
//     default: ""
//   },
//   // 弹框类型：warn error info
//   type: {
//     type: String,
//     default: "warn"
//   },
//   // 成功时的回调
//   onOk: {
//     type: Function,
//     default: () => {
//       fade.value = false
//     }
//   },
//   // 失败时的回调
//   onCancel: {
//     type: Function,
//     default: () => {
//       fade.value = false
//     }
//   }
// })

// 控制显示隐藏过渡
const fade = ref(false)
onMounted(() => {
  // 当元素渲染完毕立即过渡的动画不会触发
  setTimeout(() => {
    fade.value = true
  }, 0)
})
</script>
<style scoped lang="scss">
.c-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);

  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }

  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 1;

    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    .header {
      height: 44px;
      line-height: 44px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        cursor: default;
        font-size: 15px;
        font-weight: 600;
      }
    }

    .footer {
      padding: 0 20px;
      text-align: right;
      height: 44px;
      // border-top: 1px solid ;
    }

    .body {
      padding: 20px;
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
