<template>
  <div>
     <nut-navbar @on-click-back="router.replace('/message')" title="用户"></nut-navbar>
    <div class="px-4 mt-4">
      <svg class="absolute z-50 m-1 text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.71 14H15.5L20.49 19L19 20.49L14 15.5V14.71L13.73 14.43C12.59 15.41 11.11 16 9.5 16C5.90997 16 3 13.09 3 9.5C3 5.90997 5.90997 3 9.5 3C13.09 3 16 5.90997 16 9.5C16 11.11 15.41 12.59 14.43 13.73L14.71 14ZM5 9.5C5 11.99 7.01001 14 9.5 14C11.99 14 14 11.99 14 9.5C14 7.01001 11.99 5 9.5 5C7.01001 5 5 7.01001 5 9.5Z"
          fill="black" fill-opacity="0.54" />
      </svg>
      <input type="text" v-model="content" class="pl-8 p-1 bg-gray-200 w-full rounded relative" placeholder="在此输入">
    </div>
    <scroll class="content" probeType="3" :pull-up-load="true">
<!-- component -->
<!-- This is an example component -->
<div class="max-w-2xl mx-auto">

	<div class="p-4 max-w-md bg-white shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   <div class="flow-root">
        <ul role="list" v-for="item in users" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" :src="item.avatar">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           {{item.name}}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {{item._account}}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <button @click="goChat(item._account)" class="relative group overflow-hidden px-4 h-12 border border-blue-100 rounded-full">
              <div class="h-12 flex items-center justify-center">
                <span class="text-blue-700 text-xs">建立对话</span>
              </div>
        </button>
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>
	
</div>
</scroll>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Gql } from "@/utils/request.js";
import { reactive, ref } from "vue";

const router = useRouter()
const users = ref([])

const dataGql = async () => {
    const q = {
      query: `
            {
                users{
                  avatar,
                  name,
                  _account
                }
            }
            `
    }
    try {
      const res = await Gql(q);
      users.value = res.data.users
      
    } catch (error) {
      console.log(error)
    }
  }
  dataGql();

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
    height: calc(100vh - 44px)
  }
    .nut-navbar {
    margin-bottom: 0px !important
  }
</style>