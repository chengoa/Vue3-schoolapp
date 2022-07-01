<template>
  <ImageCropUpload
    v-model="show"
    :field="field"
    :url="url"
    :width="width"
    :height="height"
    :params="params"
    :headers="headers"
    :with-credentials="true"
    img-format="png"
    @src-file-set="srcFileSet"
    @crop-success="cropSuccess"
    @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
  />
</template>

<script>
import { computed, defineComponent } from 'vue'
import ImageCropUpload from 'vue-image-crop-upload'
export default defineComponent({
  components: {
    ImageCropUpload
  },
  props: {
    value: {
      type!: Array,
      required: true
    },
    url: {
      type!: String,
      required: true
    },
    field: {
      type!: String,
      required: true
    },
    width: {
      type!: Number,
      default: 300
    },
    height: {
      type!: Number,
      default: 300
    },
    params: {
      type!: Object,
      default: () => null
    },
    headers: {
      type!: Object,
      default: () => null
    }
  },
  emits: ['input', 'src-file-set', 'crop-success', 'crop-upload-success', 'crop-upload-fail'],
  setup(props, contex) {
    const show = computed({
      get: () => {
        return props.value
      },
      set: (value) => {
        contex.emit('input', [...value])
      }
    })
    const srcFileSet = (fileName, fileType, fileSize) => {
      contex.emit('src-file-set', fileName, fileType, fileSize)
    }
    const cropSuccess = (imgDataUrl, field) => {
      contex.emit('crop-success', imgDataUrl, field)
    }
    const cropUploadSuccess = (jsonData, field) => {
      contex.emit('crop-upload-success', jsonData, field)
    }
    const cropUploadFail = (status, field) => {
      contex.emit('crop-upload-fail', status, field)
    }
    return {
      show,
      language,
      srcFileSet,
      cropSuccess,
      cropUploadSuccess,
      cropUploadFail
    }
  }
})
</script>