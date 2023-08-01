<template>
  <div class="c-select-container">
    <div v-if="label" class="c-select-label">
      <svg-icon class="require-icon" icon="require" v-if="state.required"></svg-icon>
      <span class="c-select-label-txt">{{ label }}:</span>
    </div>
    <div class="c-select-box" @click.stop="onSelectClick" tabindex="-1" @blur="state.showDropDown = false">
      <div class="c-select-control" :title="selectValue" :style="{ ...inputStyle }">
        <span v-if="showSearch" class="c-search-input">
          <input id="searchInput" style="width: 100%;" type="search" @focus="onFocus" @input="onInput"
            :value="state.searchValue" autocomplete="off">
        </span>
        <span v-if="(typeof state.selectValue !== 'undefined')"
          :style="{ color: state.isSearchInputFocus ? '#999999' : '#000000', display: state.isSearchInputInput ? 'none' : 'block' }">
          {{ selectValue }}
        </span>

        <span v-else class="c-select-placeholder" :style="{ display: state.isSearchInputInput ? 'none' : 'block' }">
          {{ placeholder }}
        </span>
        <svg-icon v-if="state.isSearchInputFocus" class="c-search-icon" icon="search"></svg-icon>
        <svg-icon v-else class="c-select-icon" icon="down"></svg-icon>
      </div>
      <span v-if="state.error" class="c-input-error">{{ state.message }}</span>
      <ul class="c-select-dropdown"
        :class="{ 'c-select-dropdown-show': state.showDropDown, 'top': placement == 'top', 'bottom': placement == 'bottom' }">
        <div v-if="selectOptions && selectOptions.length">
          <li :title="item.title" class="c-select-option" v-for="(item, index) in selectOptions"
            :key="`${item.value}_${index}`" :class="{ 'c-select-active-option': value == item.value }"
            @click.stop="onOptionClick(item)">
            {{ item.title }}
          </li>
        </div>
        <div v-else class="empty-box">
          <svg t="1682302506512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4873" width="64" height="64">
            <path
              d="M85.333333 699.733333a426.666667 93.866667 0 1 0 853.333334 0 426.666667 93.866667 0 1 0-853.333334 0Z"
              fill="#F2F3F5" p-id="4874"></path>
            <path
              d="M294.459733 409.6l13.806934 77.269333A51.2 51.2 0 0 0 358.664533 529.066667H655.342933a51.2 51.2 0 0 0 50.696534-44.0576L716.654933 409.6H844.8v273.066667a42.666667 42.666667 0 0 1-40.814933 42.624L802.133333 725.333333H221.866667a42.666667 42.666667 0 0 1-42.624-40.814933L179.2 682.666667V409.6h115.259733z"
              fill="#F9F9F9" p-id="4875"></path>
            <path
              d="M618.666667 614.4h-213.333334a29.866667 29.866667 0 0 0 0 59.733333h213.333334a29.866667 29.866667 0 0 0 0-59.733333z"
              fill="#FFFFFF" p-id="4876"></path>
            <path
              d="M319.761067 272.384h371.1488L835.729067 409.6H716.654933l-21.060266 91.118933-43.7504 28.2624H362.180267l-47.3856-28.2624L294.459733 409.6H186.752z"
              fill="#FFFFFF" p-id="4877"></path>
            <path
              d="M687.402667 264.533333a25.6 25.6 0 0 1 17.5616 6.980267l137.156266 129.348267c2.619733 2.474667 3.208533 5.845333 2.295467 8.746666L844.8 409.6v273.066667a42.666667 42.666667 0 0 1-40.814933 42.624L802.133333 725.333333H221.866667a42.666667 42.666667 0 0 1-42.624-40.814933L179.2 682.666667V409.6h0.384a8.388267 8.388267 0 0 1 2.0224-8.4736L306.670933 272.298667A25.6 25.6 0 0 1 325.034667 264.533333zM196.266667 682.666667a25.6 25.6 0 0 0 24.098133 25.557333L221.866667 708.266667h580.266666a25.6 25.6 0 0 0 25.557334-24.098134L827.733333 682.666667l-0.008533-267.067734H722.858667l-10.325334 58.538667A76.8 76.8 0 0 1 636.9024 537.6h-261.802667a76.8 76.8 0 0 1-75.630933-63.4624l-10.325333-58.538667H196.258133L196.266667 682.666667z m491.136-401.066667H325.034667a8.533333 8.533333 0 0 0-6.1184 2.5856l-111.010134 114.346667h81.237334a17.066667 17.066667 0 0 1 16.512 12.765866l0.290133 1.339734 10.325333 58.538666A59.733333 59.733333 0 0 0 375.099733 520.533333h261.802667a59.733333 59.733333 0 0 0 58.820267-49.3568l10.325333-58.538666a17.066667 17.066667 0 0 1 16.810667-14.1056h91.921066l-121.5232-114.602667a8.533333 8.533333 0 0 0-4.778666-2.261333L687.402667 281.6z"
              fill="#E0E2E8" p-id="4878"></path>
            <path
              d="M618.666667 614.4h-213.333334a29.866667 29.866667 0 0 0 0 59.733333h213.333334a29.866667 29.866667 0 0 0 0-59.733333z m-213.333334 17.066667h213.333334a12.8 12.8 0 0 1 0 25.6h-213.333334a12.8 12.8 0 0 1 0-25.6z"
              fill="#E0E2E8" p-id="4879"></path>
          </svg>
          <span>暂无数据</span>
        </div>
      </ul>
    </div>

  </div>
</template>
<script lang="ts">
export default {
  name: 'CSelect'
}
</script>
<script setup lang="ts">
import { computed, onMounted, reactive, onUnmounted, watchEffect } from 'vue';
import { emitter } from '../utils/eventBus'
// console.log(useSlots().default?.(), 'Select')
//暂时只考虑了必填规则
interface RullProp {
  required?: boolean;
  message: string;
}
// TS 别名
// 定义验证规则数组的数据类型
type RulesProp = RullProp[];
interface OptionProp {
  title: string,
  value: string | number,
}
type OptionsProp = OptionProp[]

interface SelectProps {
  placeholder?: string;
  options?: OptionsProp;
  label?: string;
  value?: string | number;
  inputStyle?: object;
  rules?: RulesProp;
  showSearch?: boolean;
  placement?: 'bottom' | 'top'
}
const props = withDefaults(defineProps<SelectProps>(), {
  showSearch: false,
  placement: 'bottom'
})
const emit = defineEmits(['update:value', 'change', 'search'])

const state = reactive({
  message: '',
  error: false,
  required: false,
  showDropDown: false,
  isSearchInputFocus: false,
  isSearchInputInput: false,
  //选中value
  selectValue: null,
  //搜索文本
  searchValue: ''
})
const selectOptions = computed(() => {
  if (props.options) {
    return props.options
  } else {
    return []
  }
})
const onSelectClick = () => {
  // console.log(document.querySelectorAll('.c-select-dropdown-show'))
  //解决div失去焦点事件无法触发 从而影响下拉选择款无法及时关闭
  let nodeList = document.querySelectorAll('.c-select-dropdown-show')
  if (nodeList && nodeList.length) {
    nodeList.forEach(node => {
      node.classList.remove('c-select-dropdown-show')
    })
  }
  state.showDropDown = !state.showDropDown
}
const onFocus = () => {
  state.isSearchInputFocus = true
  // emit('search', state.searchValue)
}
const onInput = (e) => {
  state.searchValue = e.target.value
  if (state.searchValue) {
    state.isSearchInputInput = true
  } else {
    state.isSearchInputInput = false
  }
  emit('search', state.searchValue)
  // console.log(e.target.value)
}
const onSelectBlur = () => {
  // state.isSearchInputFocus = false
  // state.isSearchInputInput = false;
  // let searchInput = document.querySelector('#searchInput') as HTMLInputElement
  // if (searchInput) {
  //   searchInput.value = ''
  // }
  validateInput()
  // setTimeout(() => {
  //   state.showDropDown = false
  // }, 100)
}
const onOptionClick = (item) => {
  state.isSearchInputFocus = false
  state.isSearchInputInput = false
  state.searchValue = ''
  state.selectValue = item.value
  emit('update:value', item.value)
  emit('change', item.value)
  closeDropDown()
}
const selectValue = computed(() => {
  return selectOptions.value.find(item => item.value == state.selectValue)?.title
})
const validateInput = (): boolean => {
  // 接收从父组件传递过来的验证规则（数组类型）
  if (props.rules) {
    // 调用数组的 every 方法，判断是否符合定义的俩种表单验证规则
    const allPassed = props.rules.every(rule => {
      //若有多种不同的规则 可封装成函数验证所有规则
      // 表单是否通过验证的标志
      let passed = true
      // 先将规则的提示信息赋值，如果表单验证失败，则会直接获得该message信息
      // 因为 every 只要有一个错误 就会返回错误，且其他数组不会再进行判断
      state.message = rule.message
      if (rule.required) {
        if (props.value || props.value == 0) {
          passed = true
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
}
const closeDropDown = () => {
  state.showDropDown = false
  state.isSearchInputFocus = false
  state.isSearchInputInput = false
  state.searchValue = ''
}
watchEffect(() => {
  state.selectValue = props.value as any
})
onMounted(() => {
  window.addEventListener('click', closeDropDown)
  if (props.rules) {
    props.rules?.every(rule => {
      if (rule.required) {
        state.required = true
      }
    })
    emitter.emit("formItemCreated", validateInput)
  }
})
onUnmounted(() => {
  window.removeEventListener('click', closeDropDown)
})
</script>

<style lang="scss" scoped>
[type=search] {
  outline-offset: -2px;
  -webkit-appearance: none;
  outline: none;
  appearance: none;
  border: none;
  background: transparent;
}

.c-select-container {
  position: relative;
  display: flex;
  align-items: center;

  .c-select-label {
    min-width: 84px;
    text-align: right;
    margin-right: 12px;
    font-size: 15px;
    white-space: nowrap;

    .c-select-label-txt {
      position: relative;
    }
  }

  .c-select-box {
    // display: inline-block;
    position: relative;
    width: 100%;

    .c-select-icon {
      position: absolute;
      right: 12px;
      top: 10px;
      // color: #999999;
    }

    .c-search-icon {
      position: absolute;
      right: 12px;
      top: 10px;
      color: #999999;
      font-size: 12px;
    }

    .c-select-dropdown {
      display: none;
      width: 100%;
      max-height: 200px;
      border: 1px solid #E2E2E2;
      box-sizing: border-box;
      text-align: center;
      background-color: #fff;
      position: absolute;
      z-index: 2002;
      overflow-y: auto;
      cursor: pointer;
      font-size: 14px;
      margin: 0;

      .c-select-option {
        text-align: left;
        padding: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background-color: #f0f0f0;
        }
      }

      .c-select-active-option {
        background-color: #e6f7ff;
      }
    }

    .top {
      bottom: 100%
    }

    .bottom {
      top: 100%
    }

    .c-select-dropdown-show {
      display: block;
    }
  }

  .c-select-control {
    display: flex;
    align-items: center;
    width: 256px;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #E2E2E2;
    align-items: center;
    font-size: 14px;
    position: relative;
    cursor: pointer;

    &:hover {
      border: 1px #2186F0 solid;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

  .c-search-input {
    position: absolute;
    right: 25px;
    left: 11px;
    height: 34px;
    color: #666666;
  }

  .c-select-placeholder {
    color: #999999;
    font-size: 12px;
  }

  .c-input-error {
    position: absolute;
    color: #ff4d4f;
    font-size: 12px;
    top: 36px;
    left: 0;
  }

  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #999999;
    font-size: 14px;
  }
}
</style>