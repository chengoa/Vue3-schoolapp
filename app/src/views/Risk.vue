<template>
  <div>
    <nut-navbar @on-click-back="router.go(-1)" title="风险查询"></nut-navbar>
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
      <div class="mt-4 rounded-lg overflow-hidden shadow-lg bg-white min-h-64 lg:w-1/4 sm:w-1/2 md:w-1/3">

        <div class="px-3">
          <div v-if="high == null && mid == null">
            <div class="flex justify-between px-2 py-2" v-for="item in JSON.parse(getCacheVal('high'))">
              <p class="flex text-gray-700">
                <svg class="w-2 text-gray-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {{item}}
              </p>
              <p class="text-gray-500 font-thin">高</p>
            </div>
            <div class="flex justify-between px-2 py-2" v-for="item in JSON.parse(getCacheVal('mid'))">
              <p class="flex text-gray-700">
                <svg class="w-2 text-gray-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {{item}}
              </p>
              <p class="text-gray-500 font-thin">中</p>
            </div>
          </div>
          <div v-else>
            <div v-for="item in high" class="flex justify-between bg-blue-100 px-2 py-2 rounded">
              <p class="flex text-gray-700">
                <svg class="h2 w-2 text-teal-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {{item}}
              </p>
              <p class="text-gray-500 font-thin">高</p>
            </div>
            <div v-for="item in mid" class="flex justify-between bg-blue-100 px-2 py-2 rounded">
              <p class="flex text-gray-700">
                <svg class="h2 w-2 text-teal-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {{item}}
              </p>
              <p class="text-gray-500 font-thin">中</p>
            </div>
          </div>


        </div>
        <!-- <div class="bg-gray-300 flex flex-row-reverse px-2 py-3">
    <button class="bg-blue-500 py-2 px-4 rounded text-white">Invite</button>
    <button class="py-2 px-4 rounded text-gray-600">Cancel</button>
  </div> -->
      </div>
    </scroll>
  </div>
</template>

<script setup>
  import {
    getCacheVal
  } from '../utils/LocalStorageKit';
  import {
    ref,
    watch
  } from "vue"
import { useRouter } from 'vue-router';

  const content = ref('');
  const high = ref(null)
  const mid = ref(null)
  const router = useRouter()

  watch(content, (cur) => {
    if(cur != ''){
      high.value = JSON.parse(getCacheVal('high')).filter(element => {
      return element.match(cur)
      });
      mid.value = JSON.parse(getCacheVal('mid')).filter(element => {
        return element.match(cur)
      })
    }else{
      high.value = null;
      mid.value = null
    }
  })
</script>

<style scoped>
  .content {
    height: calc(100vh - 44px)
  }

  .nut-navbar {
    margin-bottom: 0px !important
  }
</style>