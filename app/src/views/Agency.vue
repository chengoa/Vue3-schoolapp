<template>
  <div>
     <nut-navbar
      @on-click-back="back"
      title="待办"
    ></nut-navbar>
<!-- component -->
<div class="h-screen p-4 flex flex-col items-center justify-center">
    
    <scroll class="content" :probeType="3" :pull-up-load="true">
    <div v-if="dayjs().format('DD/MM/YYYY') != dayjs(getCacheVal('healthreportdate')).format('DD/MM/YYYY')" class="flex flex-col py-2 mb-6 bg-white shadow-md hover:shodow-lg animate__animated animate__slideInLeft">
	<div class="flex items-center">
		<div class="flex items-center">
			<svg xmlns="http://www.w3.org/2000/svg"
				class="w-8 h-6 rounded-full text-blue-400" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			</svg>
			<div class="flex flex-col ml-6">
        <div class="font-medium leading-none my-2">还没提交 ?</div>
				<p class="text-sm text-gray-600 leading-none mt-1">
          请尽快完成今天的健康信息提交。
				</p>
			</div>
		</div>
		<button @click="router.push('/healthreport')"  
    class="flex-no-shrink bg-blue-50 px-1 ml-6 shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-300 text-black text-xs rounded-full">去完成</button>
	</div>
</div>
    <card v-for="item in arr" class="animate__animated animate__slideInLeft w-full flex flex-col">
      
      <header class="flex flex-row gap-3 items-center justify-around">
        <img :src="getCacheVal('avatar')" class="w-10  rounded-full" />
          <div> {{item._account}} </div>
          <div class="text-sm text-blue-500"><span class="text-gray-500 text-xs">结束</span> {{deadline}} </div>
      </header>
      
      <content class="grid grid-cols-4 gap-3">

        <div class="col-span-3 p-2 flex flex-col">
          <subject class="text-sm pt-3">
            外出原因 | {{item.reason}}
          </subject>

          <description class="font-light text-sm pt-2">
            紧急联系 | {{item.contact}} - {{item.num}}
          </description>
          <description class="font-light text-sm pt-2">
            目的地 |  {{item.destination}} 
          </description>
        </div>
        
        <div class="flex items-center">
          <img src="https://picsum.photos/100/100"  />
        </div>
        
      </content>
      
      <footer class="flex flex-row p-2 pt-7 gap-3 items-center">
        
        <button class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-full py-1 px-2 text-xs">
          {{text(item.status)}}
        </button>
        
        <div class="text-gray-500 text-xs">
          <span class="text-xs">时长</span>{{item.duration}}小时
        </div>
        
        <div class="text-gray-500 text-xs">
          <span class="text-xs">申请时间</span> {{item.time}}
        </div>
        
      </footer>
     
      <hr class="mt-5">
      
    </card>
  
   
  </scroll>
</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import dayjs from 'dayjs'
import { getCacheVal } from '../utils/LocalStorageKit';
import { Gql } from '@/utils/request.js'
import { ref, computed } from 'vue'

const router = useRouter()

const back = () => {
  router.replace("/work")
}
const date = dayjs().format("YYYY-MM-DD hh:mm:ss")
const account = JSON.stringify(getCacheVal('_account'))
const arr = ref(null)
const deadline = ref(null)
const messageGql = async () => {
  const q = {
    
    query: `
          {
              apply_agency(_account:${account}){
               _account,
               time,
               reason,
               duration,
               destination,
               contact,
               num,
               status,
               _id
              }
          }
          `
  }
  try {
    const res = await Gql(q);
    let applys = res.data.apply_agency;
    arr.value = applys.filter((item) => {
      deadline.value = (dayjs(item.time).add(parseInt(item.duration),'hour')).format('YYYY-MM-DD HH:mm:ss')
      if(dayjs().format('YYYY-MM-DD HH:mm:ss') < (dayjs(item.time).add(parseInt(item.duration),'hour')).format('YYYY-MM-DD HH:mm:ss') ){
        return item
      }
    })
    console.log(arr)

  } catch (e) {
    console.log(e)
  }
}
messageGql()

const text = computed(() => {
    return(item) => {
      return item > 0 ? '已同意' : (item == 0 ? '申请中':'未同意')
    }
  })


</script>

<style scoped>
 .content {
    height: 100vh;

  }
      .nut-navbar {
    margin-bottom: 0px !important
  }
</style>