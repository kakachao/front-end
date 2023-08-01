import type { App } from 'vue'
import SelectDropTable2 from './SelectDropTable2.vue'
 
// 使用install方法，在app.use挂载
SelectDropTable2.install = (app: App) => {
  app.component(SelectDropTable2.__name as string, SelectDropTable2)
}
 
export default SelectDropTable2