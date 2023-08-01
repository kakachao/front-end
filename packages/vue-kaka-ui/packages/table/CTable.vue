<template>
  <div class="chc-table">
    <div class="chc-table-container" :style="{ overflow: 'auto auto', maxHeight: scroll?.y + 'px' }">
      <table style="table-layout: auto;width: 100%;border-collapse:collapse;"
        :style="{ width: scroll?.x + 'px', minWidth: '100%', tableLayout: 'fixed' }">
        <thead class="chc-table-thead">
          <tr class="chc-table-row">
            <th class="chc-table-cell chc-table-cell-fix-top" v-for="(column, ind) in columns" :key="column.dataIndex"
              :style="computedStyle(column, ind)" :class="computedTHeadClass(column, ind)">{{
                column.title }}</th>
          </tr>
        </thead>
        <tbody class="chc-table-tbody">
          <tr class="chc-table-row" v-for="(item, index) in data" :key="rowId ? item[rowId] : index">
            <td class="chc-table-cell" v-for="(column, ind) in columns" :key="column.dataIndex"
              :style="computedStyle(column, ind)" :class="computedTBodyClass(column, ind)">
              <!-- 序号列 -->
              <template v-if="column.dataIndex == 'dataIndex'">
                {{ index + 1 }}
              </template>
              <slot v-else name="bodyCell" :column="column" :record="item">
                <span :title="item[column.dataIndex]">{{ item[column.dataIndex] }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CTable'
}
</script>
<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
type ColumnType = {
  title: string,
  dataIndex: string,
  width?: string | number,
  fixed?: string
}
type ScrollObjProp = {
  x: string | number
  y: string | number
}
interface CTableProps {
  columns: ColumnType[],
  data: any[],
  rowId?: string,
  scroll?: ScrollObjProp,
  bordered?: boolean
}
const props = withDefaults(defineProps<CTableProps>(), {
  bordered: false,
})
const computedTHeadClass = computed(() => {
  return (column, ind) => {
    if (column.fixed == 'left') {
      if (!props.columns[ind + 1]?.fixed) {
        return {
          'chc-table-cell-th-fix-left': true,
          'chc-table-cell-th-fix-left-last': true
        }
      } else {
        return {
          'chc-table-cell-th-fix-left': true
        }
      }
    } else if (column.fixed == 'right') {
      if (!props.columns[ind - 1]?.fixed) {
        return {
          'chc-table-cell-th-fix-right': true,
          'chc-table-cell-th-fix-right-first': true
        }
      } else {
        return {
          'chc-table-cell-th-fix-right': true
        }
      }
    }
  }
})
const computedTBodyClass = computed(() => {
  return (column, ind) => {
    if (column.fixed == 'left') {
      if (!props.columns[ind + 1]?.fixed) {
        return {
          'chc-table-cell-fix-left': true,
          'chc-table-cell-fix-left-last': true,
        }
      } else {
        return {
          'chc-table-cell-fix-left': true
        }
      }
    } else if (column.fixed == 'right') {
      if (!props.columns[ind - 1]?.fixed) {
        return {
          'chc-table-cell-fix-right': true,
          'chc-table-cell-fix-right-first': true
        }
      } else {
        return {
          'chc-table-cell-fix-right': true
        }
      }
    }
  }
})
const computedStyle = computed(() => {
  return (column: ColumnType, ind: number): StyleValue | undefined => {
    if (column.width && !column.fixed) {
      return {
        width: column.width + 'px',
        border: props.bordered ? '1px solid #f0f0f0' : ''
      }
    } else if (column.fixed == 'left' && column.width) {
      let width = 0
      if (ind == 0) {
        width = 0
      } else {
        for (let i = 0; i < ind; i++) {
          width += parseInt(props.columns[i]?.width!.toString())
        }
      }
      return {
        position: 'sticky',
        left: width + 'px',
        width: column.width + 'px',
        maxWidth:column.width + 'px',
        border: props.bordered ? '1px solid #f0f0f0' : ''
      }

    } else if (column.fixed == 'right' && column.width) {
      let width = 0;
      if (ind == props.columns.length - 1) {
        width = 0
      } else {
        for (let i = props.columns.length - 1; i > ind; i--) {
          width += parseInt(props.columns[i]?.width!.toString())
        }
      }
      return {
        position: 'sticky',
        right: width + 'px',
        width: column.width + 'px',
        maxWidth:column.width + 'px',
        border: props.bordered ? '1px solid #f0f0f0' : ''
      }
    } else {
      return {
        border: props.bordered ? '1px solid #f0f0f0' : ''
      }
    }

  }
})
</script>

<style scoped lang="scss">
.chc-table {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  font-size: 14px;
  background: #fff;
  border-radius: 2px
}

.chc-table-container {
  position: relative;
}

// .chc-table-container:after {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   z-index: 2;
//   width: 30px;
//   content: "";
//   pointer-events: none;
// }

// .chc-table-container::before {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 2;
//   width: 30px;
//   content: "";
//   pointer-events: none;
// }
.chc-table-thead .chc-table-row {
  border-radius: 4px;
}

.chc-table-thead>tr>th {
  position: relative;
  color: #000;
  font-weight: 500;
  background: #F5F5F5;
  border-bottom: 1px solid #f0f0f0;
}

.chc-table-tbody>tr>td {
  border-bottom: 1px solid #f0f0f0;
}

.chc-table-cell {
  text-align: center;
  box-sizing: border-box;
  padding: 10px 10px;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chc-table-cell-fix-top {
  position: sticky !important;
  top: 0;
}

.chc-table-cell-th-fix-left,
.chc-table-cell-th-fix-right {
  position: sticky;
  z-index: 3;
  // background-color: #fff;
  background: #F5F5F5;
}

.chc-table-cell-fix-left,
.chc-table-cell-fix-right {
  position: sticky;
  z-index: 2;
  background-color: #fff;
}

.chc-table-cell-th-fix-left-last::after {
  position: absolute;
  top: 0;
  right: 12px;
  bottom: -1px;
  width: 30px;
  transform: translate(100%);
  transition: box-shadow .3s;
  content: "";
  pointer-events: none;
  box-shadow: inset 10px 0 8px -8px #00000026;
}



.chc-table-cell-fix-left-last::after {
  position: absolute;
  top: 0;
  right: 12px;
  bottom: -1px;
  width: 30px;
  transform: translate(100%);
  transition: box-shadow .3s;
  content: "";
  pointer-events: none;
  box-shadow: inset 10px 0 8px -8px #00000026;
}

.chc-table-cell-th-fix-right-first::after {
  position: absolute;
  top: 0;
  left: 0;
  bottom: -1px;
  width: 30px;
  transform: translate(100%);
  transition: box-shadow .3s;
  content: "";
  pointer-events: none;
  box-shadow: inset 10px 0 8px -8px #00000026;
}

.chc-table-cell-fix-right-first::after {
  position: absolute;
  top: 0;
  left: 0;
  bottom: -1px;
  width: 30px;
  transform: translate(100%);
  transition: box-shadow .3s;
  content: "";
  pointer-events: none;
  box-shadow: inset 10px 0 8px -8px #00000026;
}
</style>