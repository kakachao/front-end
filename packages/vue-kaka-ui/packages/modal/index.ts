import type { App } from 'vue'
import CModal from './CModal.vue'

CModal.install = (app: App) => {
  app.component(CModal.__name as string, CModal)
}
export default CModal