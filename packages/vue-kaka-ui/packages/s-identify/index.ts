import type { App } from 'vue'
import SIdentify from './SIdentify.vue'

SIdentify.install = (app: App) => {
  app.component(SIdentify.__name as string, SIdentify)
}
export default SIdentify
