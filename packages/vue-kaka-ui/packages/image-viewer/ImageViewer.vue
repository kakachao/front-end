vue
<template>
  <div class="image-viewer" :style="{ display: visible ? 'block' : 'none' }" @click="close" @mousewheel.prevent="onWheel">
    <div class="viewer">
      <img :src="currentImage" :alt="alt" @click.stop="handleClick" ref="image">
      <div class="index">{{ currentIndex + 1 }} / {{ images.length }}</div>
      <div class="close" @click="close">×</div>
    </div>
    <span class="prev-icon" :class="{ disabled: currentIndex === 0 }" @click.stop="prev">
      <svg t="1682666449507" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="10736" width="64" height="64">
        <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
          p-id="10737" fill="#e6e6e6"></path>
      </svg>
    </span>
    <span class="next-icon" :class="{ disabled: currentIndex === images.length - 1 }" @click.stop="next">
      <svg t="1682666376704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="9372" width="64" height="64">
        <path
          d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
          p-id="9373" fill="#e6e6e6"></path>
      </svg>
    </span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ImageViewer'
}
</script>
<script setup lang="ts">
import { _throttle } from '../utils/help';
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue';
interface ImageItem {
  src: string
  alt: string
}
interface ImageViewerProps {
  images: ImageItem[];
  visible: boolean;
  index?: number;
  alt?: string;
}
const props = withDefaults(defineProps<ImageViewerProps>(), {
  images: () => [],
  index: 0,
  alt: ''
})
const emit = defineEmits(['update:visible', 'click']);

const currentIndex = ref(props.index);
const currentImage = ref(props.images[currentIndex.value].src);
const handleClick = () => {
  emit('click', currentIndex.value);
};
const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentImage.value = props.images[currentIndex.value].src;
  }
};
const next = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
    currentImage.value = props.images[currentIndex.value].src;
  }
};
const close = () => {
  emit('update:visible', false);
};
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    prev();
  } else if (event.key === 'ArrowRight') {
    next();
  } else if (event.key === 'Escape') {
    close();
  }
};
const onWheel = _throttle((e: WheelEvent) => {
  console.log(e.deltaY)
  if (e.deltaY) {
    if (e.deltaY > 0) {
      next()
    } else {
      prev()
    }
  }
})
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

</script>
<style scoped>
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.viewer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
}

.viewer img {
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}

.prev-icon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
}

.next-icon {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
}

.disabled {
  cursor: no-drop;
}

.index {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 14px;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>