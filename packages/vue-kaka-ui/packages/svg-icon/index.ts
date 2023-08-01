import type { App } from 'vue'
import SvgIcon from './SvgIcon.vue'

SvgIcon.install = (app: App) => {
  app.component(SvgIcon.__name as string, SvgIcon)
}
export default SvgIcon