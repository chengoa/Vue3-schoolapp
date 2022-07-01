<template>
  <div>
    <layout>
      <nut-navbar style="background-color: #00b5f7;font-weight:bolder;color: #fff" :left-show="false" title="消息">
      </nut-navbar>
      <scroll class="content" :probeType="3" :pull-up-load="true">
        <div class="border flex flex-col">

          <!-- Header -->
          <div class="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
            <div>
              <img class="w-10 h-10 rounded-full" :src="getCacheVal('avatar')" />
            </div>

            <div class="flex">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#727A7E"
                    d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z">
                  </path>
                </svg>
              </div>
              <div class="ml-4" @click="router.replace('/users')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path opacity=".55" fill="#263238"
                    d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                  </path>
                </svg>
              </div>
              
            </div>
          </div>

          <!-- Search -->
          <div class="py-2 px-2 bg-grey-lightest">
            <input type="text" class="w-full px-2 py-2 text-sm" placeholder="搜索聊天内容" />
          </div>

          <!-- Contacts -->
          <div class="bg-stone-100 flex-1 overflow-auto">

            <div class="px-3 flex items-center hover:bg-grey-lighter cursor-pointer" v-for="item in list" :key="item.content" @click="goChat(item.sendid)" >

              <div>
                <img class="h-12 w-12 rounded-full"
                  :src="item.avatar" />
              </div>
              <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
                <div class="flex items-bottom justify-between">
                  <p class="text-grey-darkest">
                    {{item.sendid}}
                  </p>
                  <p class="text-xs text-grey-darkest">
                    {{dayjs(item.createdateutc).format('YYYY-MM-DD')}}
                  </p>
                </div>
                <p class="text-grey-dark mt-1 text-sm">
                  {{item.content}}
                </p>
              </div>

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
import {Gql} from "@/utils/request.js"
import { getCacheVal } from '../utils/LocalStorageKit.ts';
import { ref } from 'vue';
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';


const router = useRouter();
const account = getCacheVal("account")
const reciverid = JSON.parse(getCacheVal("userInfo"))._account

const list = ref(null);
const messageGql = async () => {
  const q = {
    query: `
          {
              message(reciverid:"${reciverid}"){
                content,
                createdateutc,
                sendid,
                reciverid,
                avatar
              }
          }
          `
  }
  try {
    const res = await Gql(q);
    list.value = res.data.message;
    // const arrfilter = arr.filter(el => {
    //   if(el.sendid == reciverid){
    //     for(let i = 0; i < arr.length; i++){
    //       if(el.createdateutc < arr[i].createdateutc){
    //         el = arr[i]
    //       } 
    //       return el
    //     }       
    //   }
    // });

    // console.log(arrfilter)


  } catch (e) {
    console.log(e)
  }
}
messageGql()
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
    height: calc(100vh - 48px);

  }
    .nut-navbar {
    margin-bottom: 0px !important
  }
</style>