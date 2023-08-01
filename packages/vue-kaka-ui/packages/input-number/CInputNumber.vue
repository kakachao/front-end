<template>
  <div class="c-input-container">
    <div v-if="label" class="c-input-label">
      <svg-icon class="require-icon" icon="require" v-if="state.required"></svg-icon>
      {{ label }}:
    </div>
    <div class="c-input-box">
      <input id="inputNumber" type="number" class="c-input-control" :style="{ ...inputStyle }" :value="value"
        :placeholder="placeholder" @input="onInput" @focus="onFocus" @blur="onBlur" :min="min" :max="max">
      <!-- 表单验证的提示信息 -->
      <div class="c-input-btn-icon">
        <span class="btn-icon" @click.stop="addNum" :class="{ 'no-drop': Number(props.value) >= props.max! }">
          <svg t="1681979626739" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="12789" width="16" height="16">
            <path
              d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
              p-id="12790" fill="#e6e6e6"></path>
          </svg>
        </span>
        <span class="btn-icon" @click.stop="subNum" :class="{ 'no-drop': Number(props.value) <= props.min! }">
          <svg t="1681979740758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2278" width="16" height="16">
            <path
              d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
              p-id="2279" fill="#e6e6e6"></path>
          </svg>
        </span>
      </div>
      <span v-if="state.error" class="c-input-error">{{ state.message }}</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CInputNumber'
}
</script>
<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { emitter } from '../utils/eventBus'
interface RullProp {
  required?: boolean
  message: string
}
// TS 别名
// 定义验证规则数组的数据类型
type RulesProp = RullProp[];

interface InputProps {
  value?: string | number
  label?: string,
  placeholder?: string,
  inputStyle?: object,
  rules?: RulesProp,
  min?: number,
  max?: number,
  step?: number,
  precision?: number
}
const props = withDefaults(defineProps<InputProps>(), {
  step: 1,
})

const emit = defineEmits(['update:value', 'focus', 'blur', 'input'])

const state = reactive({
  message: '',
  error: false,
  required: false,
})
const onInput = (e) => {
  if (typeof props.min !== 'undefined' && e.target.value < props.min) {
    e.target.value = props.min
  }
  if (typeof props.max !== 'undefined' && e.target.value > props.max) {
    e.target.value = props.max
  }
  if (props.precision == 1) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }
  emit('update:value', e.target.value)
  emit('input', e.target.value)
}
const onBlur = () => {
  validateInput()
  emit('blur')
}
const onFocus = () => {
  emit('focus')
}
const addNum = () => {
  let oldValue = Number(props.value || 0)
  let newValue = oldValue + props.step
  console.log(newValue)
  if (props.max || props.max == 0) {
    if (oldValue < props.max) {
      emit('update:value', newValue)
      emit('input', newValue)
    }
  } else {
    emit('update:value', newValue)
    emit('input', newValue)
  }

}
const subNum = () => {
  let oldValue = Number(props.value || 0)
  let newValue = oldValue - props.step
  if (props.min || props.min == 0) {
    if (oldValue > props.min) {
      emit('update:value', newValue)
      emit('input', newValue)
    }
  } else {
    emit('update:value', newValue)
    emit('input', newValue)
  }

}
const validateInput = (): boolean => {
  // 接收从父组件传递过来的验证规则（数组类型）
  if (props.rules) {
    // 调用数组的 every 方法，判断是否符合定义的表单验证规则
    const allPassed = props.rules.every(rule => {
      // 表单是否通过验证的标志
      let passed = true
      // 先将规则的提示信息赋值，如果表单验证失败，则会直接获得该message信息
      // 因为 every 只要有一个错误 就会返回错误，且其他数组不会再进行判断
      state.message = rule.message
      if (rule.required) {
        if (props.value) {
          passed = props.value?.toString().trim() !== ''
        } else {
          passed = false
        }
        // console.log(props.value)
      }
      // console.log(passed)
      return passed
    })
    // 如果表单验证失败，则 allPassed 状态为 false 但是 state 对象中的 error应为 true
    // 所以 allPassed 取反赋值
    state.error = !allPassed
    // validateInput 方法的返回结果
    return allPassed
  }
  // 如果没有 props.rules 的表单规则 则返回 true
  return true
};
onMounted(() => {
  if (props.rules) {
    props.rules?.every(rule => {
      if (rule.required) {
        state.required = true
      }
    })
    emitter.emit("formItemCreated", validateInput)
  }
})
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
}
.c-input-container {
  position: relative;
  display: flex;
  align-items: center;
  // .require-icon {
  //   position: absolute;
  //   left: 0;
  //   top: 8px;
  // }

  .c-input-label {
    position: relative;
    min-width: 84px;
    // width: auto;
    text-align: right;
    margin-right: 12px;
    font-size: 15px;
  }

  .c-input-box:hover .c-input-btn-icon {
    opacity: 1;
  }

  .c-input-box {
    display: inline-block;
    position: relative;
    width: 100%;
    // margin-right: 16px;

    .c-input-search-icon {
      position: absolute;
      right: 12px;
      top: 10px;
      color: #999999;
    }

    .c-input-control {
      width: 88px;
      height: 36px;
      // line-height: 36px;
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid #E2E2E2;
      align-items: center;
      outline: none;
      font-size: 14px;
      color: #000;

      &:focus {
        border: 1px solid #2186F0;
        // outline: 2px solid @mainColor;
      }

      &::placeholder {
        color: #999999;
        font-size: 12px;
        line-height: 36px;
      }

      &::after {
        content: '';

      }
    }

    .c-input-btn-icon {
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      // font-size: 0;
      display: flex;
      flex-direction: column;
      width: 24px;
      height: 100%;
      transition: opacity .8s;

      .btn-icon {
        height: 50%;
        flex: 1;
        border: 1px solid #E2E2E2;
        border-top: none;
        border-right: none;
        text-align: center;
        font-size: 0;

        &:last-child {
          border-bottom: none;

          &:hover {
            transform: translateY(-2px);
          }
        }

        &:first-child {

          &:hover {
            transform: translateY(2px);
          }
        }
      }
    }

    .c-input-error {
      position: absolute;
      color: #ff4d4f;
      font-size: 12px;
      top: 36px;
      left: 0;
    }
  }

  .no-drop {
    cursor: no-drop;
  }
}
</style>