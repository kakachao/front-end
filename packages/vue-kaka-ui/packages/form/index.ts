import type { App } from 'vue'
import CForm from './CForm.vue'

CForm.install = (app: App) => {
  app.component(CForm.__name as string, CForm)
}
export default CForm