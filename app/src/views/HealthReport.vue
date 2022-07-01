<template>
  

<!-- component -->
<div class="flex flex-col h-screen bg-gray-100">
   <nut-navbar
      @on-click-back="back"
      title="健康填报"
    ></nut-navbar>
    <scroll class="content" :probeType="3" :pull-up-load="true">
      <!-- component -->
<div class="grid">
  <div class="p-6 bg-white ">
    <h1 class="text-lg font-semibold">你好 {{cache.name}} 👋, <span class="font-normal text-sm text-gray-600">你上次填报健康信息的时间是在{{cachedate}}，</span></h1>
    <div class="mt-6">
      <div class="flex justify-between gap-3">
        <span class="w-1/2">
          <label for="temperature" class="text-base leading-7 font-bold opacity-70 text-blueGray-500">体温</label>
          <input type="number" v-model="form.temperature" id="temperature" name="temperature" placeholder="摄氏度" class="w-full px-4 py-2 mt-2 mr-4 text-sm text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" required>
        </span>
        <span class="w-1/2">
          <div class="text-base leading-7 text-blueGray-500 font-bold opacity-70">健康码</div>
         
          <div @click="open" class="w-full mt-2 px-4 flex items-center justify-between mr-0 py-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
            <span class="text-sm ">{{form.code}}</span>

            <svg class="h-3 text-black font-bold fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
              <g>
                <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
              </g>
            </svg>
           
            
          </div>
           <nut-picker
                v-model:visible="show"
                :list-data="codeData"
                
                @confirm="confirm" 
            ></nut-picker>
        </span>
      </div>
      <div class="relative pt-4">
        <label for="remarks" class="text-base leading-7 font-bold opacity-70 text-blueGray-500">备注</label>
        <input type="text" v-model="form.remarks" name="remarks" placeholder="备注" class="w-full px-4 py-2 mt-2 mr-4 text-sm text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
      </div>
      <div class="relative mt-4">
          <div class="text-base leading-7 text-blueGray-500 font-bold opacity-70">是否发烧发热等症状出现</div>
         
          <div @click="open2" class="w-full mt-2 px-4 flex items-center justify-between mr-0 py-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
            <span class="flex-grow text-sm">{{form.health}}</span>

            <svg class=" h-3 text-black font-bold fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
              <g>
                <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
              </g>
            </svg>
            <nut-picker
                v-model:visible="show2"
                :list-data="healthData"
                
                @confirm="confirm2" 
            ></nut-picker>
            
          </div>
      </div>
      <section class="flex mt-2 flex-col w-full h-full p-1 overflow-auto">
        <label for="name" class="text-base leading-7 text-blueGray-500 mb-5">图片上传</label>
        <header class="flex flex-col items-center justify-center py-12 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border border-dashed rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
       
           <nut-uploader @success="handleChange" :data="data" :url="actionpath"></nut-uploader>
        </header>
      </section>



      <button @click="state.show2 = true" class="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
          <div>
              <p class="text-base leading-4">确定 </p>
          </div>
      </button>
      
    </div>
  </div>
</div>
  
  </scroll>
</div>
<nut-overlay v-model:visible="state.show2" :z-index="2000">
  <div class="wrapper">
    <!-- component -->
<section>
 <div class="max-w-5xl mx-auto py-16 animate__animated animate__zoomInUp">
  <article class="overflow-hidden bg-white">
   <div class="rounded-b-md">
    <div class="px-9 py-4">
     <div class="space-y-6 text-slate-700">
     

      <p class="font-bold tracking-tight uppercase font-body">
       确定您填报的健康信息
      </p>
     </div>
    </div>
   

    <div class="px-9 py-4">
     <div class="flex flex-col mx-0">
      <table class="min-w-full divide-y divide-slate-500">
       <thead>
        <tr>
         <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
          项目
         </th>
         <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
          结果
         </th>
        </tr>
       </thead>
       <tbody>
        <tr class="border-b border-slate-200">
         <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
          <div class="font-medium text-slate-700">您的体温</div>
          <div class="mt-0.5 text-xs text-slate-500 sm:hidden">
           正常/不正常
          </div>
         </td>
         <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          {{isnormal}}
         </td>
        </tr>
        <tr class="border-b border-slate-200">
         <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
          <div class="font-medium text-slate-700">
           您上传的图片
          </div>
          <div class="mt-0.5 text-xs text-slate-500 sm:hidden">
           <nut-icon name="checked" color="green"></nut-icon>
          </div>
         </td>
         
         <td class="py-4 pl-3  text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
           <img class="object-cover h-24" :src="data" />
         </td>
        </tr>

        <!-- Here you can write more products/tasks that you want to charge for-->
       </tbody>
       <tfoot>
        <tr>
         <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          体温
         </th>
         <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          {{form.temperature}}℃
         </td>
        </tr>
        <tr>
         <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          健康码
         </th>
         <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          {{form.code}}
         </td>
        </tr>
        <tr>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          备注
         </th>
         <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          {{form.remarks}}
         </td>
        </tr>
        <tr>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
          {{form.health}}
         </th>
        </tr>
       </tfoot>
      </table>
      <button @click="submit" class="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
          <div>
              <p class="text-base leading-4">提交 </p>
          </div>
      </button>
     </div>
    </div>

   </div>
  </article>
 </div>
</section>
  </div>
</nut-overlay>
</template>


<script setup>
  import { useRouter} from 'vue-router';
  import Scroll from '@/components/scroll/Scroll.vue';
  import { getCacheVal,setCacheVal } from '../utils/LocalStorageKit.ts';
  import { ref,reactive, watch, computed } from 'vue';
  import { Http,Gql} from "@/utils/request.js";
  import { Notify } from '@nutui/nutui';
  import { baseURL, imgURL } from '@/utils/request.js';
import dayjs from 'dayjs'



const router = useRouter()
const back = () => router.back()

const cache = JSON.parse(getCacheVal("userInfo"));
const actionpath = baseURL + "/api/upload";

const cachedate = dayjs(getCacheVal("healthreportdate")).format("YYYY-MM-DD HH:mm:ss")
console.log(cachedate)
const show = ref(false);
const show2 = ref(false);

const codeData = ['绿码','黄码','橙码','红码']
const healthData = ['没有此类症状或身体不适','发烧发热','就医诊断为普通感冒']

const form = reactive({
  code:'选择',
  health:'',
  temperature:'',
  remarks:'',
})
const data = ref('')

const open = ()=>{
  show.value = true;
}
const confirm = (res)=>{
  form.code = res;
}

const open2 = ()=>{
  show2.value = true;
}
const confirm2 = (res)=>{
  form.health = res;
}


 const handleChange = ({responseText}) => {
    const response = JSON.parse(responseText); 
    if(response.code === 1){
        data.value = imgURL + response.data.filename;
    }else{
        // message.error(info.file.response.msg)
        
    }
  }
  const state = reactive({
        show2: false,
      });
  const isnormal = computed(() => {
    return (form.temperature <= 37.3 && form.temperature > 36.3 ? "正常" : "不正常")
  })

const submit = async () => {
  try {
      const _account = getCacheVal("_account");
      const { code, health,temperature,remarks} = form;
      const res = await Http("/reportinsert",{
        _account,
        code,
        health,
        temperature,
        remarks,
        data:data.value
      })
      setCacheVal("healthreportdate",new Date())
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
    height: 100vh;

  }
      .nut-navbar {
    margin-bottom: 0px !important
  }
</style>