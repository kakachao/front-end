<template>
  <div v-if="total" class="c-pagination-container">
    <div class="left-area">
      <span class="total-text">当前显示{{ total > pageSize ? pageSize : total }}条数据</span>
      <span>共{{ totalPage }}页</span>
    </div>
    <div class="right-area">
      <div class="c-pagination">
        <div class="c-pagination-prev" :class="{ 'no-drop': current == 1 }" @click="prevPage">
          <svg t="1681108733822" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4295" width="16" height="16">
            <path
              d="M714.608 41.074L265.584 490.097c-10.963 10.963-11.993 28.099-3.083 40.21899999l0.06099999 0.07900001a31.629 31.629 0 0 0 1.55500001 1.926c0.47 0.539 0.954 1.07000001 1.468 1.584L714.608 982.927c12.098 12.097 31.71 12.097 43.808 0 12.097-12.096 12.097-31.71 0-43.807L331.296 512l427.11900001-427.12c12.097-12.096 12.097-31.71-1e-8-43.807-12.097-12.097-31.708-12.097-43.807 0.001z"
              p-id="4296" fill="#999999"></path>
          </svg>
        </div>
        <div class="c-pagination-item" :class="{ 'active': current == 1 }" @click="pageChange(1)">1</div>
        <div class="c-pagination-jump-prev" v-if="current - nums - 1 > 1 && totalPage > pageCount"
          @click="prevEllipsisClick">
          <span class="jump-dot">•••</span>
          <span class="double-left-icon">
            <svg t="1681119234578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6335" width="16" height="16">
              <path
                d="M842.666667 864c-8.533333 0-14.933333-2.133333-21.333334-8.533333l-341.333333-309.333334c-6.4-6.4-10.666667-14.933333-10.666667-23.466666 0-8.533333 4.266667-17.066667 10.666667-23.466667l341.333333-309.333333c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133333 44.8L548.266667 522.666667l315.733333 285.866666c12.8 10.666667 14.933333 32 2.133333 44.8-6.4 6.4-14.933333 10.666667-23.466666 10.666667z"
                fill="#1890ff" p-id="6336"></path>
              <path
                d="M512 864c-8.533333 0-14.933333-2.133333-21.333333-8.533333L149.333333 546.133333c-6.4-6.4-10.666667-14.933333-10.666666-23.466666 0-8.533333 4.266667-17.066667 10.666666-23.466667L490.666667 189.866667c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133334 44.8L217.6 522.666667 533.333333 808.533333c12.8 12.8 14.933333 32 2.133334 44.8-6.4 6.4-14.933333 10.666667-23.466667 10.666667z"
                fill="#1890ff" p-id="6337"></path>
            </svg>
          </span>
        </div>
        <div v-for="count in pageList" class="c-pagination-item" :key="count" :class="{ 'active': count == current }"
          @click="pageChange(count)">
          {{ count }}
        </div>
        <div class="c-pagination-jump-next" v-if="current + nums + 1 < totalPage && totalPage > pageCount"
          @click="nextEllipsisClick">
          <span class="jump-dot">•••</span>
          <span class="double-right-icon">
            <svg t="1681119704968" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="7607" id="mx_n_1681119704969" width="16" height="16">
              <path
                d="M544 522.666667c0-8.533333-4.266667-17.066667-10.666667-23.466667L192 189.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733334 285.866667L149.333333 808.533333c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666z"
                fill="#1890ff" p-id="7608"></path>
              <path
                d="M864 499.2l-341.333333-309.333333c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733333 285.866667-315.733333 285.866666c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666 0-8.533333-4.266667-17.066667-10.666667-23.466667z"
                fill="#1890ff" p-id="7609"></path>
            </svg>
          </span>
        </div>
        <div v-if="totalPage > 1" class="c-pagination-item" :class="{ 'active': current == totalPage }"
          @click="pageChange(totalPage)">{{
            totalPage }}</div>
        <div class="c-pagination-next" :class="{ 'no-drop': current == totalPage }" @click="nextPage">
          <svg t="1681108801546" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5320" width="16" height="16">
            <path
              d="M778.541176 490.706824L352.557176 64.752941a30.117647 30.117647 0 0 0-42.586352 42.586353L714.631529 512 310.061176 916.570353a30.087529 30.087529 0 0 0-0.060235 42.646588 29.967059 29.967059 0 0 0 42.646588-0.030117l425.833412-425.86353a30.087529 30.087529 0 0 0 0.030118-42.61647z"
              fill="#999999" p-id="5321"></path>
          </svg>
        </div>
        <CSelect :options="operation" :value="pageSize" @change="onPageSizeChange" :input-style="{ width: '95px' }">
        </CSelect>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name:'CPagination'
}
</script>
<script setup lang="ts">
import { computed } from 'vue';
import CSelect from '../select/CSelect.vue';
interface CPaginationProps {
  current?: number,
  pageSize?: number,
  total?: number,
  //页码按钮的数量，当总页数超过该值时会折叠
  pageCount?: number
}
const props = withDefaults(defineProps<CPaginationProps>(), {
  current: 1,
  pageSize: 20,
  total: 0,
  pageCount: 7
})
const emit = defineEmits(['change', 'update:current', 'update:pageSize'])
const operation = [
  {
    title: '10条/页',
    value: 10
  },
  {
    title: '20条/页',
    value: 20
  },
  {
    title: '50条/页',
    value: 50
  },
  {
    title: '100条/页',
    value: 100
  },
]
//总页数
const totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})
const nums = computed(() => {
  return Math.floor((props.pageCount - 3) / 2)
})
//
const pageList = computed(() => {
  const listTotal = totalPage.value;
  let count = props.pageCount;
  let list: number[] = [];
  const num = nums.value
  // console.log(num);
  if (listTotal <= count) {
    for (let i = 0; i < listTotal - 2; i++) {
      list.push(i + 2);
    }
  } else {
    if ((props.current - num - 1) <= 1) {
      // 从2开始
      for (let i = 0; i < count - num; i++) {
        list[i] = i + 2;
      }
    } else if ((props.current + num + 1) >= listTotal) {
      // 从listTotal减小
      for (let i = 0; i < count - num; i++) {
        list[i] = listTotal - (count - num - i);
      }
    } else {
      // 左边
      for (let i = 0; i < num; i++) {
        list[i] = props.current - (num - i);
        // console.log(i + 1);
      }
      // 中间数
      list[num] = props.current;
      // console.log(num + 1);
      // 右边数
      for (let i = 0; i < num; i++) {
        list[num + 1 + i] = props.current + i + 1;
        // console.log(num + 2 + i);
      }
    }
  }
  // console.log(list, 'list');
  return list
})
const prevPage = () => {
  if (props.current > 1) {
    emit('update:current', props.current - 1)
    pageChange(props.current - 1)
  }
}
const nextPage = () => {
  if (props.current < totalPage.value) {
    emit('update:current', props.current + 1)
    pageChange(props.current + 1)
  }
}
const pageChange = (count) => {
  emit('update:current', count)
  emit('change', {
    pageIndex: count,
    pageSize: props.pageSize
  })
}
const handlePage = (item) => {
  if (item === props.current) return
  emit('update:current', item);
  emit('change', {
    pageIndex: item,
    pageSize: props.pageSize
  })
}
const prevEllipsisClick = () => {
  if (props.current === totalPage.value) {
    handlePage(props.current - nums.value - 2);
  }
  else {
    handlePage(props.current - nums.value);
  }
}
const nextEllipsisClick = () => {
  if (props.current === 1) {
    handlePage(props.current + nums.value + 2);
  }
  else {
    handlePage(props.current + nums.value);
  }
}
const onPageSizeChange = (val) => {
  // console.log(val)
  emit('update:pageSize', val)
  emit('change', {
    pageIndex: props.current,
    pageSize: val
  })
}
</script>

<style scoped lang="scss">
.c-pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  .left-area {
    color: #999999;
    height: 32px;
    line-height: 32px;

    .total-text {
      margin-right: 20px;
    }
  }

  .right-area {
    .c-pagination {
      display: flex;
      align-items: center;

      .c-pagination-item,
      .c-pagination-prev,
      .c-pagination-next {
        display: inline-block;
        min-width: 32px;
        height: 32px;
        margin-right: 8px;
        padding: 0 6px;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        list-style: none;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        outline: 0;
        cursor: pointer;

        &:hover {
          border-color: #1890ff;
          color: #1890ff;
        }
      }

      .active {
        border-color: #1890ff;
        color: #1890ff;
      }

      .c-pagination-next,
      .c-pagination-prev {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .c-pagination-jump-prev {
        position: relative;
        margin-right: 8px;
        color: #999999;

        &:hover .jump-dot {
          display: none;
        }

        &:hover .double-left-icon {
          display: block;
        }
      }

      .c-pagination-jump-next {
        position: relative;
        margin-right: 8px;
        color: #999999;

        &:hover .jump-dot {
          display: none;
        }

        &:hover .double-right-icon {
          display: block;
        }
      }

      .jump-dot {
        display: block;
      }

      .double-left-icon {
        display: none;
      }

      .double-right-icon {
        display: none;
      }

      .no-drop {
        cursor: no-drop;

        &:hover {
          border-color: #d9d9d9;
        }
      }
    }
  }
}
</style>