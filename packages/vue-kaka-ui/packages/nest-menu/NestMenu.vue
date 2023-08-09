<template>
  <div class="wrap">
    <div class="menu-wrap" :class="`menu-wrap-${depth}`">
      <div class="menu-item" :class="getActiveClass(item.id)" v-for="item in data" :key="item.id"
        @click="onMenuItemClick(item)">
        {{ item.name }}
      </div>
    </div>
    <nest-menu v-if="subMenu && subMenu.length" :depth="depth + 1" :data="subMenu" :activeIds="activeIds" :key="activeId"
      @change="onMenuChange"></nest-menu>
  </div>
</template>
<script lang="ts">
export default {
  name: 'NestMenu'
}
</script>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
// import menu from './menu';
interface IProps {
  data: any[];
  depth?: number;
  activeIds?: number[];
}
const props = withDefaults(defineProps<IProps>(), {
  depth: 0
})
const emits = defineEmits(['change'])
const activeId = ref<number>()

watch(() => props.activeIds, (newIds) => {
  if (newIds) {
    if (newIds[props.depth]) {
      activeId.value = newIds[props.depth]
    }
  }
}, {
  immediate: true,
})
watch(
  () => props.data,
  (newMenu) => {
    if (!activeId.value) {
      if (newMenu && newMenu.length) {
        activeId.value = newMenu[0].id
      }
    }
  },
  {
    immediate: true,
  }
)
const getSubMenu = () => {
  return props.data.find(({ id }) => id === activeId.value)?._child;
}
const subMenu = computed(getSubMenu)

//递归收集子菜单第一项id
const getSubIds = (child) => {
  const subIds: any[] = []
  const traverse = (data) => {
    if (data && data.length > 0) {
      subIds.push(data[0].id)
      traverse(data[0]._child)
    }
  }
  traverse(child)
  return subIds
}
const onMenuItemClick = (menuItem) => {
  const newActiveId = menuItem.id
  if (newActiveId !== activeId.value) {
    activeId.value = newActiveId
    const child = getSubMenu()
    const subIds = getSubIds(child)
    emits('change', [newActiveId, ...subIds])
  }
}
const onMenuChange = (ids) => {
  emits('change', [activeId.value, ...ids])
}
const getActiveClass = (id) => {
  if (id === activeId.value) {
    return "menu-active";
  }
  return "";
};
// const findPath = (menus, targetId) => {
//   let ids;
//   const traverse = (subMenus, prev) => {
//     if (ids) {
//       return;
//     }
//     if (!subMenus) {
//       return;
//     }
//     subMenus.forEach((subMenu) => {
//       if (subMenu.id === targetId) {
//         ids = [...prev, targetId];
//         return;
//       }
//       traverse(subMenu._child, [...prev, subMenu.id]);
//     });
//   }
//   traverse(menus, [])
//   return ids
// }
</script>

<style scoped>
.wrap {
  padding: 12px 0;
}

.menu-wrap {
  display: flex;
  flex-wrap: wrap;
}

.menu-wrap-0 {
  background: #ffccc7;
}

.menu-wrap-1 {
  background: #fff7e6;
}

.menu-wrap-2 {
  background: #fcffe6;
}

.menu-item {
  margin-left: 16px;
  cursor: pointer;
  white-space: nowrap;
}

.menu-active {
  color: #f5222d;
}
</style>