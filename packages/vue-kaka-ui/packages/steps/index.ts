import type { App } from 'vue'
import CSteps from './CSteps.vue'

CSteps.install = (app: App) => {
  app.component(CSteps.__name as string, CSteps)
}
export default CSteps