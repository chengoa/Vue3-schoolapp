<template>
  <div>
    <nut-navbar @on-click-back="router.go(-1)" title="发表"></nut-navbar>
      <!-- component -->
      <div class="editor mx-auto flex flex-col text-gray-800 p-4 max-w-2xl">

        <textarea 
        v-model="form.content"
        class="description rounded bg-gray-100 sec p-3 h-60 border border-gray-300 mt-4 outline-none" spellcheck="false"
        placeholder="写些什么吧">
        </textarea>
        <nut-uploader @success="handleChange" :data="data" :url="actionpath"></nut-uploader>

        <!-- icons -->
        <div class="icons flex text-gray-500 my-4 mx-2">
          <svg @click="guide" class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <svg @click="toggleEmoji" class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

            <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
          <div class="count ml-auto text-gray-400 text-xs font-semibold"> 字数 {{form.content.length}} </div>
        </div>
        <div v-show="isLocal" class="text-xs ml-4"> {{local}} </div>
        <!-- buttons -->
        <div class="buttons flex mt-4">
          <div class="btn border rounded border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            取消
          </div>
          <div
          @click="post"
            class="btn rounded border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            发表</div>
        </div>
        <emoji1 v-show="isEmoji" @create="choose"></emoji1>

      </div>



  </div>
</template>

<script setup>
  import Scroll from "@/components/scroll/Scroll.vue"
  import Emoji1 from "@/components/Emoji.vue"
  import {
    useRouter
  } from 'vue-router';
  import { reactive, ref } from "vue";
  import {
    Gql,Http,guideAxios,baseURL,imgURL
  } from "@/utils/request.js"
    import { Notify } from '@nutui/nutui';

  import { getCacheVal } from "../utils/LocalStorageKit.ts";


  const router = useRouter()
  const isEmoji = ref(false)
  const isLocal = ref(false)
  const uploadRef = ref(null);
  const data = ref('')
  const actionpath = baseURL + "/api/upload";

  const form = reactive({
    topic:'',
    content:''
  })
  const local = ref('')
  const guide = async () => {
    await guideAxios('https://restapi.amap.com/v3/ip?&output=json&key=a9af36d78a5590f35b33ba2a2b78d4fe').then(
      res => {
        local.value = res.data.province.substr(0, res.data.province.length - 1) + '·' + res.data.city;
      }
    )
    isLocal.value = !isLocal.value
  }
  
  const toggleEmoji = () => {
    isEmoji.value = !isEmoji.value
  }

  const choose = (emoji) => {
    form.content += emoji
  }

  const handleChange = ({responseText}) => {
    const response = JSON.parse(responseText); 
    if(response.code === 1){
        data.value = imgURL + response.data.filename;
    }else{
        // message.error(info.file.response.msg)
        
    }
  }

  const post = async () => {
    try {
      const account = getCacheVal("account");
      const _account = getCacheVal("_account");
      const avatar = getCacheVal("avatar")
      const {content,topic} = form
      const res = await Http("/momentinsert",{
        account,
        _account,
        avatar,
        topic,
        content,
        img:data.value,
        local:local.value
        })
      form.content = ''
      if(res.code == "1"){
          Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
      }
  } catch (error) {
      console.log(error)
  }

  }
</script>

<style scoped>
  .content {
    height: calc(100vh - 44px)
  }

  .nut-navbar {
    margin-bottom: 0px !important
  }
</style>