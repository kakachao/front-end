import type { App } from 'vue'
import CInputNumber from './CInputNumber.vue'

CInputNumber.install = (app: App) => {
  app.component(CInputNumber.__name as string, CInputNumber)
}
export default CInputNumber