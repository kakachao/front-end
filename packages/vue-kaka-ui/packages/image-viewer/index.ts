import type { App } from 'vue'
import ImageViewer from './ImageViewer.vue'

ImageViewer.install = (app: App) => {
  app.component(ImageViewer.__name as string, ImageViewer)
}
export default ImageViewer