<template>
  <div class="c-tabs">
    <div class="c-tabs-nav-wrap" ref="navWrap">
      <div class="c-tabs-inv-bar" :style="barStyle"></div>
      <div class="c-tab-nav" v-for="item in navList" :key="item.name"
        :class="{ 'active-c-tab-nav': activeKey == item.name }" @click="onTabClick(item)">
        {{ item.title }}
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<!-- <script lang="ts" setup>
import { ref, getCurrentInstance, provide, useSlots, nextTick, computed, watch, onMounted } from 'vue';

type NavType = {
  name: string,
  title: string
}
const props = defineProps<{
  activeKey: string,
}>()
const emit = defineEmits(['update:activeKey'])

let activeKey = ref(props.activeKey)
let navList = ref<NavType[]>([])
let barWidth = ref(0)
let barOffset = ref(0)
const currentCmp = getCurrentInstance()
provide('TabsInstance', currentCmp)
provide('activeKey', activeKey)

const initTabs = () => {
  updateNav()
  updateBar()
}
const getTabs = () => {
  const slots = useSlots()
  //script setup 这里会报错
  console.log(slots.default!())
  return slots.default!()
}
const updateNav = () => {
  navList.value = []
  // console.log(getTabs())
  getTabs().forEach(item => {
    navList.value.push({
      name: item.props!.name,
      title: item.props!.title,
    })
  });
}
const updateBar = () => {
  nextTick(() => {
    // console.log(getTabs())
    //当前选中的activeKey下标
    const index = getTabs().findIndex(nav => nav.props!.name === activeKey.value)
    //获取navWrap元素下的所有tab的元素
    const elemTabs = document.querySelectorAll('.c-tab-nav')
    //获取当前选中的元素
    // console.log(index,elemTabs)
    const elemTab = elemTabs[index] as HTMLDivElement
    barWidth.value = elemTab ? elemTab.offsetWidth : 0
    //计算需要移动的距离,当index > 0时进行累加
    if (index > 0) {
      let offset = 0
      for (let i = 0; i < index; i++) {
        let tempElemTab = elemTabs[i] as HTMLDivElement
        offset += tempElemTab.offsetWidth + 24
      }
      barOffset.value = offset
    } else {
      barOffset.value = 0
    }
  })
}
const onTabClick = (item) => {
  emit('update:activeKey', item.name)
  activeKey.value = item.name
}
defineExpose({
  initTabs,
})
const barStyle = computed(() => {
  return {
    width: `${barWidth.value}px`,
    transform: `translate3d(${barOffset.value}px,0px,0px)`
  }
})
watch(activeKey, () => {
  updateBar()
})
</script> -->
<script lang="ts">
import { ref, getCurrentInstance, watch, defineComponent, provide, computed, nextTick } from 'vue';
type NavType = {
  name: string,
  title: string
}
export default defineComponent({
  name: 'CTabs',
  props: {
    activeKey: {
      type: String,
    }
  },
  emits: ['update:activeKey', 'change'],
  setup(props, context) {
    let activeKey = ref(props.activeKey)
    let barWidth = ref(0)
    let barOffset = ref(0)
    const currentCmp = getCurrentInstance()
    const navList = ref<NavType[]>([])
    function initTabs() {
      updateNav()
      updateBar()
    }
    function getTabs() {
      return context.slots.default?.()
    }
    function updateNav() {
      navList.value = []
      // console.log(getTabs(), 'getTabs')
      getTabs()?.forEach(item => {
        // if (item.children !== "v-if") {
        if (item.props) {
          navList.value.push({
            name: item.props.name,
            title: item.props.title,
          })
        }
        // }
      });
    }
    function updateBar() {
      nextTick(() => {
        // console.log(getTabs())
        //当前选中的activeKey下标
        const index = navList.value.findIndex(nav => nav.name === activeKey.value)
        //获取navWrap元素下的所有tab的元素
        const elemTabs = document.querySelectorAll('.c-tab-nav')
        //获取当前选中的元素
        // console.log(index,elemTabs)
        const elemTab = elemTabs[index] as HTMLDivElement
        barWidth.value = elemTab ? elemTab.offsetWidth : 0
        //计算需要移动的距离,当index > 0时进行累加
        if (index > 0) {
          let offset = 0
          for (let i = 0; i < index; i++) {
            let tempElemTab = elemTabs[i] as HTMLDivElement
            offset += tempElemTab.offsetWidth + 24
          }
          barOffset.value = offset
        } else {
          barOffset.value = 0
        }
      })
    }
    function onTabClick(item) {
      // activeKey.value = tab.props.actKey;
      activeKey.value = item.name
      context.emit('update:activeKey', item.name)
      context.emit('change', item.name)
    }
    // console.log(currentCmp, 'currentCmp')
    // provide('TabsInstance', currentCmp)
    provide('ininTabs', initTabs)
    provide('activeKey', activeKey)
    const barStyle = computed(() => {
      return {
        width: `${barWidth.value}px`,
        transform: `translate3d(${barOffset.value}px,0px,0px)`
      }
    })
    
    watch(() => props.activeKey, () => {
      activeKey.value = props.activeKey
      updateBar()
    })
    // console.log(navList, 'navList')
    return {
      navList,
      onTabClick,
      initTabs,
      barStyle,
    }
  },
}) 
</script>

<style scoped lang="scss">
.c-tabs-nav-wrap {
  position: relative;
  border-bottom: 1px solid #E2E2E2;
  margin-bottom: 16px;
}

.c-tab-nav {
  display: inline-block;
  margin-right: 24px;
  padding: 16px 16px;
  font-size: 16px;
  cursor: pointer;
}

.active-c-tab-nav {
  color: #2186F0;
  // border-bottom-color: #2f5cd5;
}

.c-tabs-inv-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #2186F0;
  height: 3px;
  transition: transform 300ms ease-in-out;
}
</style>