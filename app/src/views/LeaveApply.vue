<template>
  

<!-- component -->
<div class="flex flex-col h-screen bg-gray-100">
   <nut-navbar
      @on-click-back="back"
      title="外出申请"
    ></nut-navbar>
    <scroll class="content" :probeType="3">

   <div class="m-auto">
      <div>
         <!-- <button type="button" class="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
               <g>
                  <rect fill="none" height="24" width="24"></rect>
               </g>
               <g>
                  <g>
                     <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
               </g>
            </svg>
            <span class="pl-2 mx-1">Create new shipping label</span>
         </button> -->
         <div class="bg-white rounded-lg shadow">
            <div class="flex">
               <div class="flex-1 py-5 pl-5 overflow-hidden">
                  <svg class="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                     <g>
                        <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                        <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                        <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                     </g>
                  </svg>
                  <h1 class="inline text-lg font-semibold leading-none">出发地</h1>
               </div>
            </div>
            <div class="px-5 pb-5">
              <input  placeholder="位置" v-model="form.departure" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
              <input  placeholder="事因" v-model="form.reason"  class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"> 
              <input  placeholder="时长" v-model="form.duration"  class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"> 
               <div class="flex text-xs">
                  <div class="flex-grow w-1/4 pr-2"><input v-model="form.emergency"   placeholder="紧急联系人" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"></div>
                  <div class="flex-grow"><input v-model="form.emergencynum"  placeholder="电话" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"></div>
               </div>
               <!-- <div class="flex items-center pt-3"><input type="checkbox" class="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"><label for="safeAdress" class="block ml-2 text-sm text-gray-900">Save as default address</label></div> -->
            </div>
            <div class="flex">
               <div class="flex-1 py-5 pl-5 overflow-hidden">
                  <svg class="inline align-text-top" width="21" height="20.5" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                     <g>
                        <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                        <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                        <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                     </g>
                  </svg>
                  <h1 class="inline text-lg font-semibold leading-none">到达地</h1>
               </div>
               <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
            </div>
            <div class="px-5 pb-5">
               <input v-model="form.destination"  placeholder="位置" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
               <div class="flex text-xs">
                  <div class="flex-grow w-1/4 pr-2"><input v-model="form.contact" placeholder="到达地联系人" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"></div>
                  <div class="flex-grow"><input v-model="form.num" placeholder="电话" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"></div>
               </div>
               
            </div>
            <hr class="mt-4">
            <div class="flex flex-row-reverse p-3">
               <div class="flex-initial pl-3">
                  <button type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 rounded ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                     </svg>
                     <span class="pl-2 mx-1" @click="submit">提交</span>
                  </button>
               </div>
               <!-- <div class="flex-initial">
                  <button type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                     </svg>
                     <span class="pl-2 mx-1">Delete</span>
                  </button>
               </div> -->
            </div>
         </div>
         <div class="mt-5 bg-white shadow cursor-pointer rounded-xl">
            <div class="flex">
               <div class="flex-1 py-5 pl-5 overflow-hidden" >
                  <div class="text-sm text-gray-600 uppercase font-bold">记录</div>
                  <ul v-for="item in list">
                     <li>{{item.reason}}</li>
                  </ul>
               </div>
              
  
               <div class="flex-auto py-5 pl-1">
                  <div class="text-sm text-gray-600 uppercase font-bold">时间</div>
                  <ul v-for="item in list">
                     <li> 
                        <span class="text-xs">{{dayjs(item.time).format("YYYY-MM-DD hh:mm:ss")}} </span>
                     </li>
           
                  </ul>
               </div>
                            <div class="flex-1 py-5 pl-1 overflow-hidden">
                  <div class="text-sm text-gray-600 uppercase font-bold">状态</div>
                  <ul v-for="item in list">
                     <li > 
                        <span class="rounded-md text-white px-1 text-sm" :class="bg(item.status)">{{text(item.status)}} </span>
                     </li>
           
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
  </scroll>
</div>
</template>


<script setup>
  import { useRouter} from 'vue-router';
  import Scroll from '@/components/scroll/Scroll.vue'
  import { Http,Gql} from "@/utils/request.js";
  import { Notify } from '@nutui/nutui';
  import { reactive, watch } from 'vue';
  import { getCacheVal } from '../utils/LocalStorageKit.ts';
  import { ref, computed } from 'vue';
  import dayjs from 'dayjs'

const router = useRouter()
const back = () => router.replace("/")


const form = reactive({
  departure:'',
  reason:'',
  duration:'',
  emergency:'',
  emergencynum:'',
  destination:'',
  contact:'',
  num:''
})
const list = ref(null)
const messageGql = async () => {
  const q = {
    query: `
          {
              applys{
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
    list.value = res.data.applys;

  } catch (e) {
    console.log(e)
  }
}
messageGql()
const submit = async () => {
  try {
      const _account = getCacheVal("_account");
      let status = 0;
      const res = await Http("/leaveapplyinsert",{
         _account,
         status,
        ...form
        })
       
      if(res.code == "1"){
          Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
      }
      messageGql()
  } catch (error) {
      console.log(error)
  }
}
  const text = computed(() => {
    return(item) => {
      return item > 0 ? '已同意' : (item == 0 ? '申请中':'未同意')
    }
  })
    const bg = computed(() => {
    return(item) => {
      return item > 0 ? 'bg-blue-600' : (item == 0 ? 'bg-teal-600' : 'bg-rose-600')
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