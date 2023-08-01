<!-- 利用select组件的dropdownRender插槽时无法渲染vxe-table的数据 -->
<template>
  <div class="select-table">
    <!-- 单选tags模式 为了解决在单选模式，搜索时，选中后还是显示搜索文本，不显示选中项label -->
    <template v-if="mode == 'tags'">
      <a-select :placeholder="placeholder" :mode="mode" :style="{ 'width': width + 'px' }" :allowClear="allowClear"
        :value="value" :open="false" :show-search="showSearch" :show-arrow="showArrow" @search="handleSearch"
        @mouseenter="handleClear" @focus="onSelectFocus" @deselect="onDeSelect">
        <a-select-option v-for="item in data" :key="item[valueKey]" :value="item[valueKey]">
          {{ item[labelKey] }}
        </a-select-option>
      </a-select>
    </template>
    <template v-if="mode == 'multiple'">
      <a-select :placeholder="placeholder" :mode="mode" :maxTagCount="3" :style="{ 'width': width + 'px' }"
        :allowClear="allowClear" :value="valueList" :open="false" :show-search="showSearch" :show-arrow="showArrow"
        @search="handleSearch" @focus="onSelectFocus" @deselect="onDeSelect">
      <!-- <template #dropdownRender>
          <div @mousedown="e => e.preventDefault()" style="cursor:pointer">
            <vxe-table Align="center" header-align="center"
              :row-config="{ isHover: true, height: 40, keyField: valueKey }" max-height="200" :scroll-y="{ gt: 100 }"
              show-overflow="title" :data="data" size="small" @cell-click="cellClickEvent">
              <vxe-column v-for="item in columns" :key="item.dataIndex" :field="item.dataIndex"
                :title="item.title"></vxe-column>
            </vxe-table>
          </div>
                    </template> -->
        <a-select-option v-for="item in data" :key="item[valueKey]" :value="item[valueKey]">
          {{ item[labelKey] }}
        </a-select-option>
      </a-select>
    </template>
    <div v-if="state.showDropTable" class="drop-table" :style="{ 'width': dropTableWidth + 'px' }"
      @click="e => e.stopPropagation()">
      <vxe-table ref="xTable" :checkbox-config="{ checkRowKeys: valueList, highlight: true, reserve: true }"
        align="center" header-align="center" :row-config="{ isHover: true, height: 40, keyField: valueKey }"
        max-height="300" :scroll-y="{ gt: 100 }" show-overflow="title" :data="data" size="small"
        @cell-click="cellClickEvent" @checkbox-change="onRowSelect" @checkbox-all="onSelectAll">
        <vxe-column v-if="mode == 'multiple'" type="checkbox" width="60"></vxe-column>
        <vxe-column v-for="item in columns" :key="item.dataIndex" :field="item.dataIndex" :title="item.title"
          :filters="item.filters" :filter-multiple="false">
          <!-- 特例 -->
          <template #default="{ row }" v-if="item.dataIndex == 'itemFlag'">
            <slot :row="row"></slot>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import type { VxeTableInstance } from 'vxe-table';
type Props = {
  placeholder?: string,
  //单选
  value?: string | number,
  //多选
  valueList?: string[] | number[]
  valueKey: string,
  labelKey: string,
  mode?: string
  width?: number,
  allowClear?: boolean,
  showSearch?: boolean,
  showArrow?: boolean,
  needRecord?: boolean
  dropdownMatchSelectWidth?: boolean | number,
  dropTableWidth?: number,
  columns: Array<any>,
  data: Array<any>,
}
const props = withDefaults(defineProps<Props>(), {
  mode: '',
  showSearch: false,
  showArrow: true,
  dropdownMatchSelectWidth: true,
  allowClear: true
})
const emit = defineEmits(['update:value', 'update:valueList', 'getRecord', 'searchData'])
const xTable = ref<VxeTableInstance>()
const state = reactive<{
  showDropTable: boolean,
}>({
  showDropTable: false,
})
let selectRowList = new Set()
const handleSearch = (val) => {
  // console.log(value)
  if (props.showSearch) {
    emit('searchData', val)
  }
}
const cellClickEvent = ({ row }) => {
  if (props.mode == 'tags') {
    emit('update:value', row[props.valueKey])
    if (props.needRecord) {
      emit('getRecord', row)
    }
    state.showDropTable = false
  }
}
const clearDomClick = () => {
  emit('update:value', undefined)
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
const closeDropTable = () => {
  state.showDropTable = false
}
const onSelectFocus = () => {
  setTimeout(() => {
    state.showDropTable = true
  }, 0)
}
const onRowSelect = ({ checked, row }) => {
  // console.log(row)
  if (checked) {
    selectRowList.add(row[props.valueKey])
  } else {
    selectRowList.delete(row[props.valueKey])
  }
  emit('update:valueList', [...selectRowList])

  // console.log(selectRowList)

}
const onSelectAll = ({ checked }) => {
  // console.log(checked,xTable.value?.getTableData().visibleData)
  let selectList = xTable.value?.getTableData().visibleData
  if (checked) {
    selectList?.forEach(item => {
      selectRowList.add(item[props.valueKey])
    })
  } else {
    selectList?.forEach(item => {
      selectRowList.delete(item[props.valueKey])
    })
  }
  emit('update:valueList', [...selectRowList])

}
const onDeSelect = (value: unknown) => {
  // console.log(value)
  if (props.mode == 'tags') {
    emit('update:value', undefined)
  } else if (props.mode == 'multiple') {
    selectRowList.delete(value)
    // console.log(selectRowList)
    emit('update:valueList', [...selectRowList])
  }
  state.showDropTable = false

  // console.log(value)
}
onMounted(() => {
  window.addEventListener('click', closeDropTable)
  if (props.mode == 'multiple') {
    props.valueList?.forEach(item => {
      selectRowList.add(item)
    })
  }
  // console.log(props.valueList,selectRowList)
})
onUnmounted(() => {
  window.removeEventListener('click', closeDropTable)
})
</script>
<style scoped>
.select-table {
  position: relative;
}

.drop-table {
  width: 100%;
  z-index: 99;
  position: absolute;
  top: 44px;
  cursor: pointer;
}
</style>
