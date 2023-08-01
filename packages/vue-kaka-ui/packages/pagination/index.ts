import type { App } from 'vue'
import CPagination from './CPagination.vue'

CPagination.install = (app: App) => {
  app.component(CPagination.__name as string, CPagination)
}
export default CPagination