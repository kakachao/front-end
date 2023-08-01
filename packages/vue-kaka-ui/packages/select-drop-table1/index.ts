import type { App } from 'vue'
import SelectDropTable1 from './SelectDropTable1.vue'
 
// 使用install方法，在app.use挂载
SelectDropTable1.install = (app: App) => {
  app.component(SelectDropTable1.__name as string, SelectDropTable1)
}
 
export default SelectDropTable1