import type { App } from 'vue'
import NestMenu from './NestMenu.vue'

NestMenu.install = (app: App) => {
  app.component(NestMenu.__name as string, NestMenu)
}
export default NestMenu