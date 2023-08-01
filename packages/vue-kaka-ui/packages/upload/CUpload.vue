<template>
  <div class="c-upload-container">
    <!-- <div class="c-upload-label">{{ label }}:</div> -->
    <div class="c-upload-box" @click="onUploadClick" @dragenter="onDragEnter" @dragover="onDragOver" @drop="onDrop">
      <div class="c-upload-select">
        <input ref="fileUploader" type="file" accept="image/*" @change.capture="onFileChange" style="display: none;">
        <svg-icon class="c-upload-icon" icon="add"></svg-icon>
        <div class="c-upload-txt">上传图片</div>
      </div>
      <div class="c-upload-preview" v-if="url">
        <img :src="imgUrl" alt="">
        <!-- <svg-icon icon="delete" class="delete-icon"></svg-icon> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CUpload'
}
</script>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
interface CUploadProps {
  label?: string,
  value?: string,
  url?: string
}
const props = withDefaults(defineProps<CUploadProps>(), {

})

const emit = defineEmits(['update:url'])
const state = reactive({
  file: null,
  fileUrl: '',
  imgUrl: ''
})
const imgUrl = computed(() => {
  return props.url
})

const fileUploader = ref<HTMLInputElement | null>(null)
const onUploadClick = () => {
  // onFileChange()
  fileUploader.value?.click()
}
const onDragEnter = (e: DragEvent) => {
  e.preventDefault()
}
const onDragOver = (e: DragEvent) => {
  e.preventDefault();
}
const onDrop = (e: DragEvent) => {
  e.preventDefault()
  // console.log(e.dataTransfer?.files)
  let file = e.dataTransfer?.files[0] as File
  handleFile(file)
}
// 将图片文件转成BASE64格式
const html5Reader = (file: File) => {
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      // console.log(e.target?.result)
      state.fileUrl = e.target?.result as string
      emit('update:url', state.fileUrl)
    }
    reader.readAsDataURL(file)
  }
}
//上传图片
const uploadImage = (file: File) => {
  // let formdata = new FormData()
  // formdata.append('image', file)
  // store.dispatch('baseData/uploadImage', formdata).then(res => {
  //   // console.log(res, 'res')
  //   let url = new URL(res)
  //   // console.log(new URL(res))
  //   if (res) {
  //     emit('update:url', url.pathname)
  //   }
  // }).catch(err => {
  //   Message.warn(err.message)
  // })
}
const handleFile = (file: File) => {
  // console.log(file)
  // uploadImage(file)
  html5Reader(file)
}
const onFileChange = (e: Event) => {
  let file = (e.target as HTMLInputElement).files![0];
  handleFile(file)
} 
</script>

<style lang="scss" scoped>
.c-upload-container {
  position: relative;
  display: flex;
  align-items: center;

  .c-upload-label {
    min-width: 64px;
    text-align: right;
    margin-right: 12px;
    font-size: 15px;
  }

  .c-upload-box {
    position: relative;
    width: 126px;
    height: 126px;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    transition: border-color .3s;
    margin-left: 10px;
    font-size: 14px;
    color: #999999;

    .c-upload-select {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .c-upload-preview {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 100%;
      }
    }

    .c-upload-icon {
      font-size: 36px;
    }

    .c-upload-txt {
      margin-top: 8px;
    }

    &:hover {
      border-color: #40a9ff;
    }
  }

  .delete-icon {
    position: absolute;
    top: 80%;
    left: 50%;
    // transform: translate(-50%,-50%);
    font-size: 24px;
    color: #40a9ff;
  }

}
</style>