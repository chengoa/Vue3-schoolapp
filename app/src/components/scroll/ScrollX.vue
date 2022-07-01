<template>
  <div class="wrapper w-full" ref="wrapper">
    <div class="content" ref="content">
      <el-row :gutter="20">
        <el-col v-for="item in data" :key="item" :span="4">
         <slot></slot>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script setup>
  import BScroll from '@better-scroll/core';
  import Pullup from '@better-scroll/pull-up'
  import {
    ref,
    onMounted,
    nextTick,
    reactive,
    watch,
    watchEffect
  } from "vue";

  const props = defineProps({
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    data: Array
  })
  const emit = defineEmits(['scroll', 'pullingUp'])
  
  const wrapper = ref(null)
  const content = ref(null)
  let bscroll;

  onMounted(() => {
    const wrapper_div = wrapper.value
    const content_div = content.value
    let width = (props.data.length + 1) * 138
    content_div.style.width = width + 'px'
    nextTick(() => {
      if(!bscroll) {
        bscroll = new BScroll(wrapper_div, {
          scrollX: true,
          probeType: 3,
          click: true,
              mouseWheel: true,
              disableMouse: false,
              disableTouch: false
        })
      } else {
        bscroll.refresh()
      }
    })
    })
    
    
    
 




  // const scrollTo = (x,y,time) => bs.scrollTo(x,y,time)
</script>
<style scoped>
  .wrapper {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    display: inline-block;
  }

  .content {
    display: inline-block;
  }
</style>