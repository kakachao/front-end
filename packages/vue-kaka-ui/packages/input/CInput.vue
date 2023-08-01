<template>
  <div class="c-input-container">
    <div v-if="label" class="c-input-label">
      <svg-icon class="require-icon" icon="require" v-if="state.required"></svg-icon>
      <span class="c-input-label-txt">{{ label }}: </span>
    </div>
    <div class="c-input-box">
      <input :type="type" class="c-input-control" :value="value" :placeholder="placeholder"
        :style="{ ...inputStyle }" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onEnter">
      <svg-icon class="c-input-search-icon" v-if="showSearch" icon="search"></svg-icon>
      <!-- 表单验证的提示信息 -->
      <span v-if="state.error" class="c-input-error">{{ state.message }}</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CInput'
}
</script>
<!-- <script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
interface RullProp {
  // type: "required" | "email";
  required: boolean
  message: string;
}
// TS 别名
// 定义验证规则数组的数据类型
type RulesProp = RullProp[];
export default defineComponent({
  name: 'CInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    inputStyle: {
      type: Object
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array as PropType<RulesProp>
    }
  },
  emits: ['update:value', 'focus', 'blur'],
  setup(props, { emit }) {
    const state = reactive({
      message: '',
      error: false,
      required: false,
    })

    const onInput = (e) => {
      // console.log(e.target.value)
      emit('update:value', e.target.value)
    }
    const validateInput = () => {
      // 接收从父组件传递过来的验证规则（数组类型）
      if (props.rules) {
        // 调用数组的 every 方法，判断是否符合定义的俩种表单验证规则
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
    const onBlur = () => {
      validateInput()
      emit('blur')
    }
    const onFocus = () => {
      emit('focus')
    }
    return {
      state,
      onInput,
      onFocus,
      onBlur,
      validateInput
    }
  }
})
</script> -->
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { emitter } from '../utils/eventBus'
interface RullProp {
  required?: boolean
  message: string
}
// TS 别名
// 定义验证规则数组的数据类型
type RulesProp = RullProp[];

interface InputProps {
  type?: string,
  value?: string | number
  label?: string,
  placeholder?: string,
  inputStyle?: object,
  showSearch?: boolean,
  rules?: RulesProp,
}
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  showSearch: false,
})

const emit = defineEmits(['update:value', 'focus', 'blur', 'input', 'enter'])

const state = reactive({
  message: '',
  error: false,
  required: false,
})

const onInput = (e) => {
  // console.log(e.target.value)
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
const onEnter = (e) => {
  // console.log(e.keyCode,e.target.value)
  if (e.keyCode == 13) {
    emit('enter', e.target.value)
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
// .c-input-container:has(input[required]) .c-input-label-txt:before {
//   content: '*';
//   position: absolute;
//   left: -12px;
//   top: 0px;
//   color: red;
// }

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
    text-align: right;
    margin-right: 12px;
    font-size: 15px;
    white-space: nowrap;
    .c-input-label-txt{
      position: relative;
    }
  }

  .c-input-box {
    display: inline-block;
    position: relative;
    width: 100%;

    .c-input-search-icon {
      position: absolute;
      right: 12px;
      top: 10px;
      color: #999999;
    }

    .c-input-control {
      width: 256px;
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

    .c-input-error {
      position: absolute;
      color: #ff4d4f;
      font-size: 12px;
      top: 36px;
      left: 0;
    }
  }


}
</style>