import type { App } from 'vue'
import CTabs from './CTabs.vue'
import CTabPane from './CTabPane.vue'


CTabs.install = (app: App) => {
  app.component(CTabs.__name as string, CTabs)
}
CTabPane.install = (app: App) => {
  app.component(CTabPane.__name as string, CTabPane)
}

export { CTabs, CTabPane }
