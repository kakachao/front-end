import type { App } from 'vue'
import CBridge from './CBridge.vue'
CBridge.install = (app: App) => {
  app.component(CBridge.__name as string, CBridge)
}
export default CBridge