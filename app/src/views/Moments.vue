<template>
  <div class="bg-stone-100">

    <layout>
      <nut-navbar style="font-weight: bolder;background-color: rgb(245 245 244 / 1);" :left-show="false"
        title="校园圈" @on-click-send="more" icon="uploader">
        
      </nut-navbar>
      <div v-if="store.state.load.loadingMoments"
        class="flex flex-col justify-center items-center leading-10 fixed top-10 inset-x-1/2">
        <loader></loader>
      </div>

      <scroll class="content" :probeType="3" :pull-up-load="true">


        <div class="flex py-4 items-center flex-col bg-stone-100">
          <!-- Wrapper-->
          <div class="wrapper">
            <!-- Content grid -->
            <div class="box-border max-w-7xl mx-2 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-3">
              <!-- Card-->
              <article v-for="(item,index) in moments" :key="item.content"
                class="mb-4 break-inside break-inside-avoid p-3 rounded-xl bg-white flex flex-col bg-clip-border max-w-md">
                <div @click="goMoment(item.content)">
                  <div class="flex pb-2 justify-between">
                    <div class="flex justify-between">
                      <a class="inline-block mr-4" href="#">
                        <img class="rounded-full max-w-none w-12 h-12" :src="item.avatar" />
                      </a>
                      <div>
                        <a class="inline-block text-base font-bold" href="#">{{item._account}}</a>
                      </div>
                    </div>
                    <div class="text-slate-500 text-xs mt-1">
                      {{dayjs(item.time).diff(dayjs(),'month') < 0 ? item.time : dayjs(item.time).fromNow()}}
                    </div>
                  </div>

                  <div class="p-3">
                    {{item.content}}
                    <div class="grid grid-cols-3 gap-4">
                      <img class="rounded-lg w-screen h-[20vh] mt-2" :src="item.img" />
                    </div>
                  </div>




                </div>
                <div class="flex justify-between">
                  <div class="text-xs ml-4">
                    {{item.local}}
                  </div>
                  <div class="flex items-center justify-end">
                    <div class="space-x-4">
                      <div class="inline-flex items-center space-x-1">
                        <nut-icon name="comment" size="18"></nut-icon>
                        <span class="text-xs">{{item.commemt}}</span>
                      </div>
                      <div class="inline-flex items-center space-x-1">
                        <nut-icon @click="fabulous(item,index)" v-if="isFabulous == index ? false:true" name="fabulous"
                          size="18"></nut-icon>
                        <nut-icon @click="nofabulous(item,index)" v-else class="animate__animated animate__tada"
                          name="fabulous" color="red" size="18"></nut-icon>
                        <span class="text-xs">{{likeslength(item.likes)}}</span>
                      </div>


                    </div>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </scroll>
    </layout>
  </div>
</template>

<script setup>
  import Layout from '@/layout/index.vue'
  import Scroll from "@/components/scroll/Scroll.vue"
  import Loader from '@/components/Loader.vue';
  import ScrollX from "@/components/scroll/ScrollX.vue"
  import dayjs from 'dayjs'

  import {
    useStore
  } from 'vuex'
  import {
    ref,
    computed
  } from 'vue'
  import {
    Gql,
    Http
  } from "@/utils/request.js"
  import {
    useRouter
  } from 'vue-router';
  import {
    getCacheVal
  } from '../utils/LocalStorageKit';


  const store = useStore();
  const router = useRouter()

  const more = () => router.push("/momentedit")



  const moments = ref(null)
  const momentsGql = async () => {
    const q = {
      query: `
            {
              moments{
                  _account,
                  time,
                  content,
                  topic,
                  img,
                  likes{
                    account
                  },
                  avatar,
                  name,
                  local
              }
                
            }
            `
    }
    try {
      const res = await Gql(q);
      console.log(res)
      moments.value = res.data.moments;
    } catch (e) {
      console.log(e)
    }
  }

  momentsGql()

  const isFabulous = ref(null);

  // 点赞
  const fabulous = async (item, index) => {
    isFabulous.value = index;
    const res = await Http("/fabulousinsert", {
      content: item.content,
      account: getCacheVal("_account"),
      avatar: getCacheVal('avatar')
    })
    momentsGql()
  }

  const nofabulous = (item, index) => {
    isFabulous.value = null;
    item.likes -= 1

  }

  const goMoment = (content) => {
    router.push({
      path: "/moment",
      query: {
        content: content
      }
    })
  }

  const likeslength = computed((arr) => {
    return (arr) => {
      return arr == null? 0 : arr.length
    }
  })
</script>

<style scoped>
  .content {
    height: calc(100vh - 92px);

  }

  .nut-navbar {
    margin-bottom: 0px !important
  }
</style>