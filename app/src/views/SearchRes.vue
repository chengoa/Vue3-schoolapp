<template>
  <div>
    <!-- component -->
    <nut-navbar @on-click-back="back" :title="route.query.name"></nut-navbar>
    <scroll class="content" :probeType="3" :pull-up-load="true" @scroll="fixedActive" @pullingUp="loadMore">
      <div class="flex flex-col gap-4 items-center justify-center bg-white px-3">

        <!-- Card 1 -->
        <div v-for="item in val" @click="goChat(item._account)"  class="border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">

          <!-- Badge -->
          <p class="bg-sky-500 w-fit px-4 py-1 text-xs font-bold text-white rounded-tl-lg rounded-br-xl"> 用户 </p>
          
          <div class="grid grid-cols-6 p-5 gap-y-2">

            <!-- Profile Picture -->
            <div>
              <img :src="item.avatar" class="max-w-16 max-h-16 rounded-full" />
            </div>

            <!-- Description -->
            <div class="col-span-4 md:col-span-4 ml-4">

              <p class="text-sky-500 text-sm">
                 <mark>{{item.name}}</mark> 
              <span class="text-gray-400 ml-2"> {{item._account}} </span>
              </p>      
              <p class="text-sky-500 font-bold my-1 text-sm w-fit h-fit"> 
                <span class="bg-sky-100 p-1 rounded-lg"> {{item.grade}} </span>
                <span class="ml-1"> {{item.sex}} </span>        
              </p>
            </div>
            <div class="col-span-1 text-center p-1 bg-gray-100 bg-opacity-40 h-8 w-8  shadow rounded-full animate__animated animate__fadeInLeft">
              <nut-icon name="message" color="blue"></nut-icon>
            </div>

          </div>

        </div>
        <!-- component -->
<article v-for="item in moment" @click="goMoment(item.content)" class="border w-full mx-auto border-gray-400 rounded-lg md:p-4 bg-white sm:py-3 py-4 px-2" data-article-path="/hagnerd/setting-up-tailwind-with-create-react-app-4jd" data-content-user-id="112962">
  <p class="bg-sky-500 w-fit -mx-2 -my-4 px-4 py-1 text-xs font-bold text-white rounded-tl-lg rounded-br-xl"> 校园圈 </p>
  <div role="presentation">
      <div>
        <div class="m-3">
          <div class="flex items-center">
              <div class="mr-2">                
                <a href="/hagnerd">          
                  <img class="rounded-full w-8" :src="item.avatar" alt="hagnerd profile" loading="lazy">        
                </a>      
              </div>
              <div>
                <p>          
                  <a href="/hagnerd" class="text text-gray-700 text-sm hover:text-black"> <mark>{{item.name}}</mark> </a>                  
                </p>
                <a href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd" class="text-xs text-gray-600 hover:text-black">          
                  <time datetime="2019-08-02T13:58:42.196Z"> {{item.time}} </time>        
                </a>      
              </div>
          </div>
        </div>
        <div class="pl-12 md:pl-10 xs:pl-10">
          <div class="mb-2">
              <a href="/t/react" class="text-sm text-gray-600 p-1 hover:text-black">
                <span class="text-opacity-50">#</span>
                {{item.topic}}
              </a>
          </div>
          <div class="mb-1 leading-6">
            {{item.content}} 
            <nut-icon class="float-right mr-8 ring-2 shadow ring-offset-white ring-offset-4 ring-gray-100 rounded-full  animate__animated animate__fadeInLeft" name="footprint" color="blue"></nut-icon>
          </div>
          <img class="w-1/3 rounded-lg" :src="item.img" alt="">
          <div class="flex justify-between items-center">
              <div class="flex">
                <a href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd" class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black">
                    <svg class="inline fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                    </svg>
                    {{item.likes.length}}<span class="hidden md:inline">&nbsp;reactions</span>
                </a>
                <a href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd#comments" class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black">
                    <svg class="inline fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                    </svg>
                    {{item.comment.length}}<span class="hidden md:inline">&nbsp;comments</span>
                </a>
              </div>
              
          </div>
        </div>
    </div>
  </div>
</article>



      </div>
    </scroll>
  </div>
</template>

<script setup>
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import {
    Gql
  } from "@/utils/request.js"
  import {
    ref
  } from 'vue'
  import Scroll from '@/components/scroll/Scroll.vue';

  const route = useRoute()
  const router = useRouter()
  const backNav = () => router.replace("/")

  const val = ref(null)
  const moment = ref(null)
  const back = () => router.replace({
    path:"/search"
  })
  const searchGql = async () => {
    const name = route.query.name
    const q = {
      query: `
            {
                fontsearch(name:"${name}"){
                  avatar
                  name
                  sex
                  grade
                  _account  
                }
                momentsearch(name:"${name}"){
                  _account
                  time
                  content
                  topic
                  img
                  avatar
                  name
                  likes{
                    account
                  }
                  comment{
                    account
                  }
                }
            }
            `
    }
    try {
      const res = await Gql(q);
      val.value = res.data.fontsearch
      moment.value = res.data.momentsearch
    } catch (e) {
      console.log(e)
    }
  }
  searchGql()

  const goMoment = (content) => {
    router.push({
      path: "/moment",
      query: {
        content: content
      }
    })
  }
  const goChat = (id) => {
  router.push({
    path:"/chat",
    query:{
      id
    }
  })
}
</script>

<style scoped>
  .content {
    height: calc(100vh - 64px);

  }
</style>