<template>
  <div class="select-table">
    <a-select :placeholder="placeholder" :style="{ 'width': width + 'px' }" allowClear :value="label"
      :open="state.showDropTable" @dropdownVisibleChange="openDropTable" @blur="state.showDropTable = false"
      :show-search="showSearch" :show-arrow="showArrow" :filter-option="filterOption" @search="handleSearch"
      :dropdownMatchSelectWidth="dropdownMatchSelectWidth" @mouseenter="handleClear">
      <template #dropdownRender>
        <div @mousedown="e => e.preventDefault()" style="cursor:pointer">
          <a-table size="small" :row-key="record => record[valueKey]" :columns="columns" :data-source="data"
            :pagination="false" :customRow="handleClickRow" :scroll="{ x: 240, y: 240 }">
          </a-table>

        </div>
      </template>
    </a-select>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

type Props = {
  width?: number,
  placeholder?: string,
  label?: string,
  value: string | number,
  //table表中作为select选中项value的key
  valueKey: string,
  //table表中作为select选中项label的key
  labelKey: string,
  showSearch?: boolean,
  showArrow?: boolean,
  dropdownMatchSelectWidth?: boolean | number,
  filterOption?: boolean | Function,
  needRecord?: boolean,
  columns?: Array<any>,
  data?: Array<any>,
}
const props = withDefaults(defineProps<Props>(), {
  showSearch: false,
  showArrow: true,
  dropdownMatchSelectWidth: true,
  allowClear: true
})
const emit = defineEmits(['update:label', 'update:value', 'getRecord', 'searchData'])
const state = reactive({
  showDropTable: false
})

//因为在父盒子上加了阻止默认行为，所以不会自动展开关闭下拉框，需手动
const openDropTable = () => {
  state.showDropTable = true
}

const handleClickRow = (record) => {
  return {
    onClick: () => {
      // console.log(record[this.valueKey])
      // console.log(record[this.labelKey])
      emit('update:value', record[props.valueKey])
      emit('update:label', record[props.labelKey])
      if (props.needRecord) {
        emit('getRecord', record)
      }
      state.showDropTable = false;
    }
  }
}

const handleSearch = (value) => {
  if (props.showSearch) {
    emit('searchData', value)
  }
}
const clearDomClick = () => {
  emit('update:value', '')
  emit('update:label', '')
}
const handleClear = (e) => {
  // 获取到dom元素
  // console.log(e)
  let clearDom = e.target.children[2]
  // console.log(clearDom)
  // 添加点击事件
  // const clearDomClick = () => {
  //   emit('update:value', '')
  //   emit('update:label', '')
  // }
  clearDom?.removeEventListener("click", clearDomClick)

  clearDom?.addEventListener("click", clearDomClick)
}
</script>
<style>
/* .select-table .ant-select-selection-item {
  text-align: left;
}

.select-table {
  text-align: left;
} */
</style>
