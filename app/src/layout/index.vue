<template>
  <slot></slot>

  <!-- <nut-tabbar class="bg-gray-200" bottom unactive-color="#7d7e80" active-color="#1989fa" size="25">
    <nut-tabbar-item v-for="(item,index) in tabbar" :key="item.tabTitle" :class="animate(index)"
      :tab-title="item.tabTitle" :font-class-name="fontClassName(index)" class-prefix="icon" :icon="item.icon"
      :to="item.path"></nut-tabbar-item>
     
  </nut-tabbar> -->
    <div class="tab-bar extend">
      <div class="tab-bar-item" v-for="(item,index) in tabbar" @click="doActive(index)" :style="activeColor(index)">
    <div :class="[iconIsfill(index),animate(index)]" style="font-size:25px;margin-top:2px"></div>
    <span class="text-xs mb-2"> {{item.name}} </span>

  </div>
  </div>
  

    
</template>

<script setup>
  import {
    reactive,
    watch,
    ref,
    computed
  } from 'vue';
  import {
    useRoute, useRouter
  } from "vue-router";
 
  const route = useRoute();
  const router = useRouter()
  const tabbar = reactive([
    {path:"/work",iconpath:"iconfont1 icon-shouye",iconfill:"iconfont icon-shouye",name:"首页"},
    {path:"/moments",iconpath:"iconfont1 icon-shijian",iconfill:"iconfont icon-shijian",name:"校园圈"},
    {path:"/message",iconpath:"iconfont1 icon-tishi",iconfill:"iconfont icon-tishi",name:"消息"},
    {path:"/profile",iconpath:"iconfont1 icon-wode",iconfill:"iconfont icon-wode",name:"我的"}
    // {
    //   fontClassName: 'iconfont',
    //   fontClassName1: 'iconfont1',
    //   icon: 'shouye',
    //   tabTitle: '学校',
    //   path: '/school'
    // },
    //  {
    //   fontClassName: 'iconfont',
    //   fontClassName1: 'iconfont1',
    //   icon: 'shouye',
    //   tabTitle: '首页',
    //   path: '/work'
    // },
    // {
    //   fontClassName: 'iconfont',
    //   fontClassName1: 'iconfont1',
    //   icon: 'shijian',
    //   tabTitle: '校园圈',
    //   path: '/moments'
    // },
   
    // {
    //   fontClassName: 'iconfont',
    //   fontClassName1: 'iconfont1',
    //   icon: 'tishi',
    //   tabTitle: '消息',
    //   path: '/message'
    // },
    // {
    //   fontClassName: 'iconfont',
    //   fontClassName1: 'iconfont1',
    //   icon: 'wode',
    //   tabTitle: '我的',
    //   path: '/profile'
    // },
  ])

  const animate = computed(() => {
    return (index) => {
      return route.path.indexOf(tabbar[index].path) > -1 ? 'animate__animated animate__bounceIn' : ''
    }
  })

  const fontClassName = computed(() => {
    return (index) => {
      return route.path.indexOf(tabbar[index].path) > -1 ? tabbar[index].fontClassName : tabbar[index]
        .fontClassName1
    }
  })

  const doActive = (index) => {
  if(route.path != tabbar[index].path){
    router.replace({
      path:tabbar[index].path
    })
  }
}

const iconIsfill = computed(() => {
   return (index) => { return route.path.indexOf(tabbar[index].path) > -1 ? tabbar[index].iconfill : tabbar[index].iconpath}
  }
)

const activeColor = computed(() => {
 return (index) => { return route.path.indexOf(tabbar[index].path) > -1 ? {color:'#1989fa'} : {color:'#7d7e80'}}

})
</script>

<style scoped>
  /* .icon-fenlei {
    font-size: 34px !important
  } */
.tab-bar{
    width: 100%;
    height: 48px;
    background-color: #fff;
    position: fixed !important;
    bottom:0px;
    left:0px;
    right:0px;
    z-index: 100
  }
  .extend{
    display: flex;
    align-items: center;
  }
  .tab-bar-item {
    flex:1;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    box-sizing: border-box;
    font-weight: bold;
}
</style>