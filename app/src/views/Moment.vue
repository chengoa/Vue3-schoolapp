<template>
  <div>
    <nut-navbar @on-click-back="back" title="校友圈详情"></nut-navbar>
    <div class="box-border max-w-7xl mx-4">
      <div class="flex pt-4 items-center justify-between">
        <div class="flex">

          <img class="rounded-full max-w-none w-12 h-12" :src="state.avatar" />

          <div class="flex flex-col">
            <div>
              <a class="inline-block text-lg font-bold" href="#">{{state._account}}</a>
            </div>
            {{state.content}}


          </div>
        </div>
      </div>
      <div>
        <img class="rounded-lg w-screen h-[40vh] mt-2" :src=" state.img" />

      </div>
      <div class="py-2 flex justify-between">
        <a class="inline-flex items-center" href="#">
          <span class="mr-2">
            <svg class="fill-rose-600" style="width: 24px; height: 24px;" viewBox="0 0 24 24">
              <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
              </path>
            </svg>
          </span>
          <span class="text-lg font-bold"> {{likeslength(state.likes)}} </span>
        </a>
        <div class="text-slate-500">
          {{state.time}}
        </div>
      </div>
      <div class="flex flex-row-reverse justify-end ml-4" >
          <div v-for="item in state.likes" class="flex relative w-10 h-10 justify-center items-center m-1 mr-2 -ml-3 rounded-full border-r-2 border-white"><img class="rounded-full" :src="item.avatar"> </div>
      </div>
      <div class="relative">
        <input class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg placeholder:text-slate-600 font-medium pr-20"
          type="text" placeholder="评论"
          v-model="comment" />
        <span class="flex absolute right-3 top-2/4 -mt-3 items-center">
          <svg @click="toggleEmoji" class="mr-2" style="width: 26px; height: 26px;" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
            </path>
          </svg>
          <svg
          @click="submit"
           class="fill-blue-500" style="width: 24px; height: 24px;" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
          </svg>
        </span>
      </div>
    </div>
    <emoji1 v-show="isEmoji" @create="choose"></emoji1>
    <scroll class="content" :probeType="3" :pull-up-load="true">
      <div class="flex py-4 flex-col bg-white">
        <!-- Wrapper-->
        <div class="wrapper">
          <!-- Content grid -->
          <div class="box-border max-w-7xl mx-4 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-3">
            <!-- Card-->
            <article
              class="mb-4 break-inside break-inside-avoid  rounded-xl bg-white flex flex-col bg-clip-border max-w-md">



              <!-- Comments content -->
              <div>
                <!-- Comment row -->
                <div class="media flex pb-4" v-for="item in state.comment">
                  <a class="mr-4" href="#">
                    <img class="rounded-full max-w-none w-8 h-8" :src="item.avatar" />
                  </a>
                  <div class="media-body">
                    <div>
                      <a class="inline-block text-base font-bold mr-2" href="#"> {{item.account}} </a>
                      <span class="text-slate-500"> {{dayjs(item.time).diff(dayjs(),'month') < 0 ? item.time : dayjs(item.time).fromNow()}} </span>
                    </div>
                    <p>{{item.content}}</p>
                    <!-- <div class="mt-2 flex items-center">
                      <a class="inline-flex items-center py-2 mr-3" href="#">
                        <span class="mr-2">
                          <svg class="fill-rose-600" style="width: 22px; height: 22px;" viewBox="0 0 24 24">
                            <path
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                            </path>
                          </svg>
                        </span>
                        <span class="text-base font-bold">12</span>
                      </a>
                      <button class="py-2 px-4 font-medium hover:bg-slate-50 rounded-lg transition">
                        Repply
                      </button>
                    </div> -->
                  </div>
                </div>

                
                <!-- End More comments -->
              </div>
              <!-- End Comments content -->
            </article>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script setup>
  import Scroll from "@/components/scroll/Scroll.vue"
  import Emoji1 from "@/components/Emoji.vue"
  import {
    useRoute,
    useRouter
  } from "vue-router"
  import {
    Gql,
    Http
  } from "@/utils/request.js"
   import {
    getCacheVal
  } from '../utils/LocalStorageKit';
  import {
    reactive,
    ref,
    computed
  } from "vue";
  import dayjs from 'dayjs'


  const route = useRoute()
  const router = useRouter()

  const back = () => router.go(-1)

  const state = reactive({
    _account: '',
    time: '',
    content: '',
    avatar: '',
    topic: '',
    img: '',
    likes:{
      type: Array
    },
    comment: {
      type: Array
    }
  })
  const comment = ref('')
  const isEmoji = ref(false)
  const toggleEmoji = () => {
    isEmoji.value = !isEmoji.value
  }
  const choose = (emoji) => {
    comment.value += emoji
  }
  
  const init = async () => {
    const content = route.query.content
    const q = {
      query: `
            {
              moment(content:"${content}"){
                  _account
                  time
                  content
                  avatar
                  topic
                  img
                  likes{
                    account,
                    avatar
                  }
                  comment{
                    account
                    time
                    content
                    avatar
                  }
              }
            }
            `
    }
    try {
      const res = await Gql(q);
      state._account = res.data.moment._account;
      state.time = res.data.moment.time;
      state.content = res.data.moment.content;
      state.avatar = res.data.moment.avatar;
      state.img = res.data.moment.img;
      state.comment = res.data.moment.comment;
      state.likes = res.data.moment.likes


    } catch (e) {
      console.log(e)
    }
  }
  init()
   const likeslength = computed((arr) => {
    return (arr) => {
      return arr == null? 0 : arr.length
    }
  })
  const submit = async () => {
    isEmoji.value = !isEmoji.value
    const item = route.query.content
    const res = await Http("/commentinsert", {
      item,
      content: comment.value,
      avatar:  getCacheVal("avatar"),
      account: getCacheVal("_account"),
      time: new Date()
    })
    init()

  }
</script>

<style scoped>
  .content {
    height: calc(100vh - 510.8px)
  }

  .nut-navbar {
    margin-bottom: 0px !important
  }
</style>