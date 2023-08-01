<template>
  <form class="validate-form-container">
    <slot></slot>
  </form>
</template>
<script lang="ts">
export default {
  name:'CForm'
}
</script>
<script lang="ts" setup>
import { emitter } from '../utils/eventBus';
import { onUnmounted } from 'vue';
type ValidateFunc = () => boolean

// 准备一个储存验证
let funcArr: ValidateFunc[] = []

//验证函数
const submitForm = () => {
  // 先通过 map 调用函数数组funcArr中的每一个函数，并把每个函数的结果（都是boolean类型）存入 result 数组
  // 然后再对装满了 boolean类型的数组 result 调用every方法，就知道表单是否都通过了
  const result = funcArr.map(func => func()).every(res => res)
  // return result
  //通过回调验证后发送请求
  // callback && callback(result)
  return Promise.resolve(result)
};
// 全局事件总线 form-item-cerated 的回调函数
const callback = (func: ValidateFunc) => {
  // console.log('form-item-cerated的回调执行了');
  // 将接收到的函数都推入funcArr 数组中
  funcArr.push(func)
}
emitter.on('formItemCreated', callback)

onUnmounted(() => {
  emitter.off('formItemCreated', callback);
  funcArr = []
});
//暴露验证方法
defineExpose({
  submitForm
})
</script>

<style scoped></style>