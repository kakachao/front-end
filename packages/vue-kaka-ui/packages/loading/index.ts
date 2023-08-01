import type { App } from 'vue'
import { createVNode, render } from 'vue'
import Loading from './CLoading.vue' // 引入 loading 组件

const vLoding = {
  // dom挂载后执行。这里的el使用了v-loading的那个dom，loading组件将会被挂载在el的下面，作为el的孩子
  mounted: (el, binding) => {
    if (binding.value) {
      const vm = createVNode(Loading)
      render(vm, el)
    }
  },
  // 指令值变化时执行：比如说空数据变成了有数据
  updated: (el, binding) => {
    const vm = createVNode(Loading)
    // 数据变化时：
    if (binding.value !== binding.oldValue) {
      // 只在值变为true的时候渲染loading组件
      binding.value ? render(vm, el) : render(null, el)
    }
  }
}
export default (app: App) => {
  app.directive('loading', vLoding)
}
