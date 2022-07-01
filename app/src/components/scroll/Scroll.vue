<template>
<div class="core-container">
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</div>

</template>
<script setup>
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import PullDown from '@better-scroll/pull-down';
import { ref,onMounted,nextTick,reactive,watch, watchEffect } from "vue";
import { useStore } from 'vuex'

BScroll.use(Pullup);
BScroll.use(PullDown);

const store = useStore();

const wrapper = ref(null);
const wrapper_bs = ref(null);
const props = defineProps({
  probeType:{
    type:Number,
    default:0
  },
  pullUpLoad:{
    type:Boolean,
    default:false
  }
})
const emit = defineEmits(['scroll','pullingUp']);
let bscroll = reactive({});

onMounted(() => {
  const wrapper_div = wrapper.value; 
  bscroll = new BScroll(wrapper_div, {
    scrollY: true,
    probeType: 3,
    click: true,
    pullUpLoad: true,
    pullDownRefresh: {
      threshold: 50,
      stop: 50
    },
    mouseWheel: true,
    disableMouse: false,
    disableTouch: false
  })
  bscroll.on('scroll',(p) => emit('scroll',p.y))
  bscroll.on('pullingUp',() => {
    emit('pullingUp')
    bscroll.refresh()
  })
  bscroll.on('pullingDown', () => {
    store.commit("load/updateLoad", true);
    setTimeout(() => {
      bscroll.finishPullDown();
      store.commit("load/updateLoad", false);
    },1000)
  })
  
  
})
watchEffect(() => {
  nextTick(() => {
    bscroll && bscroll.refresh()
  })
})
 


// const scrollTo = (x,y,time) => bs.scrollTo(x,y,time)

 
    
</script>
<style scoped>
/* .core-container{
  height: 100%;
} */
.wrapper{
  overflow: hidden;
  height: 100%;
}
.content{
  width: 100%;
  overflow: hidden;
}
</style>
