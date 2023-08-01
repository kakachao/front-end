import type { App } from 'vue'
import CRadioGroup from './CRadioGroup.vue'

CRadioGroup.install = (app: App) => {
  app.component(CRadioGroup.__name as string, CRadioGroup)
}
export default CRadioGroup