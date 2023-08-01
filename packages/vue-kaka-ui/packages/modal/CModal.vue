<template>
  <div class="c-modal-cover" v-if="visible">
    <div class="c-modal-container" :style="'width:' + width + 'px;height:' + height + 'px'">
      <div class="c-modal-header">
        <div class="c-modal-title">
          {{ title }}
        </div>
        <div class="c-modal-icons">
          <svg-icon icon="close" @click="closeModal"></svg-icon>
        </div>
      </div>
      <div class="c-modal-body" :class="{ 'flex-center': centered }">
        <slot></slot>
      </div>
      <div class="c-modal-footer">
        <slot name="footer">
          <div calss="c-modal-footer-btns">
            <CButton text="返回" @click="closeModal"></CButton>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name:'CModal'
}
</script>
<script lang="ts" setup>
import CButton from '../button/CButton.vue';
interface ModalProps {
  width?: number,
  height?: number,
  title?: string,
  visible: boolean,
  centered?: boolean
}
const props = withDefaults(defineProps<ModalProps>(), {
  width: 600,
  centered: false
})
const emit = defineEmits(['update:visible'])
const closeModal = () => {
  emit('update:visible', false)
}
</script>
<style scoped lang="scss">
.c-modal-cover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-modal-container {
  position: relative;
  display: flex;
  font-size: 17px;
  background: white;
  flex-direction: column;
  border-radius: 5px;
}

.c-modal-header {
  height: 44px;
  // color: white;
  line-height: 44px;
  padding: 0px 24px;
  border-radius: 5px 5px 0 0;
  // background: linear-gradient(to right, #0cd7bd, #52c5f3);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  font-weight: bold;

  .c-modal-icons {
    cursor: pointer;
  }
}

.c-modal-body {
  padding: 24px;
  flex: 1;
  margin-bottom: 44px;
}

.c-modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0 16px;
  text-align: right;
  border-top: 1px solid #e8e8e8;
}

.disabledEdit {
  pointer-events: none;
}
</style>