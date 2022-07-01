<template>
  <div class="h-screen">
    <div class="w-full relative" style="height: 92%">
      <nut-video :source="state.source" :options="state.options">
      </nut-video>
      <div class="absolute top-0 left-0 w-full bg-transparent text-white">
        <nut-navbar style="background-color:transparent" @on-click-back="back" :title="coursetitle">
          <template #right>
            <nut-icon class="right" name="share-n"></nut-icon>
          </template>
        </nut-navbar>
        <!-- <navbar style="background-color:transparent">
          <template #left>
            1
          </template>
          <template #right>
            1
          </template>
        </navbar> -->
      </div>

      <div class="absolute top-44 left-0 w-full h-1/3">
        <nut-barrage class="bg-transparent" speeds=4000 ref="danmu" :danmu="list"></nut-barrage>
      </div>

    </div>
    <div class="flex rounded bg-white" style="height: 8%">
      <input type="text"
        class="w-5/6 border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
        placeholder="输入弹幕内容" v-model="send"/>

      <button type="button" class="m-2 rounded px-1 py-2 font-semibold text-gray-100"
        :class="send ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'"
        :disabled="send == 0"
        @click="addDanmu">
        发送
      </button>
    </div>
   

  </div>
</template>

<script setup>
  import navbar from "@/components/Navbar.vue"

  import {
    Gql,
    Http
  } from '../utils/request.js';
  import {
    ref,
    reactive,
    onMounted
  } from 'vue'
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import { Notify } from '@nutui/nutui';


  const route = useRoute();
  const router = useRouter();
  const state = reactive({
    source: {
      src: "https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D",
      type: "video/mp4",
    },
    options: {
      muted: true,
      controls: true
    },
  });
  const danmu = ref(null)
  const detail = ref(null)
  const coursetitle = ref(null)
  const list = ref(null)
  const videoval = ref(null)
  const send = ref(null)
  const title = route.query.title
  const dataGql = async () => {
    const q = {
      query: `
        {
          coursedetail(title:"${title}"){
            src
            title
            date
            duration
            teacher
            img
            barrage
          }
    }
    `
    }
    try {
      const res = await Gql(q);
      detail.value = res.data.coursedetail;
      coursetitle.value = res.data.coursedetail.title;
      list.value = res.data.coursedetail.barrage
    } catch (error) {
      console.log(error)
    }
  }
  dataGql()
  const addDanmu = async () => {
    try {
      const res = await Http("/barrageupdate",{title,send})
      if(res.code == "1"){
          dataGql()
          Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
      }
      send.value = ''

    } catch (error) {
      console.log(error)
    }
  }

 

  const back = () => {
    router.replace("/")
  }
</script>

<style scoped>
  .nut-barrage {
    background-color: transparent !important;

  }

  .nut-navbar {
    margin-bottom: 0px !important
  }

  view .dmitem .move {
    background-color: transparent !important;
    color: #fff !important
  }
</style>