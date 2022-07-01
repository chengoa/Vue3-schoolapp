<template>
  <div>
    <nut-navbar @on-click-back="back" title="日历"></nut-navbar>
    <!-- component -->
    <div class="flex flex-col items-center justify-center  px-4">
      <div class="max-w-sm w-full shadow-xl">
        <div class="py-4  px-4 bg-white rounded-t">

          <el-calendar v-model="value" ref="calendar">
            <template #header="{ date }">
              <div class="flex w-full justify-between">
                <div class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{{date}}</div>
                <div class="flex items-center">
                  <button @click="selectDate('prev-month')"
                    class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24"
                      height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                  </button>
                  <button @click="selectDate('next-month')"
                    class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler  icon-tabler-chevron-right"
                      width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </button>

                </div>
              </div>
            </template>
            <template #dateCell="{ data }">
              <p @click="select(data)" :class="data.isSelected ? 'is-selected' : ''">
                {{data.day.split('-').slice(2).join('-')}}
                {{ data.isSelected ? '✔️' : '' }}
              </p>
            </template>
          </el-calendar>

        </div>

      </div>
      <scroll class="content" :probeType="3">

        <div class="md:py-8 py-5 dark:bg-gray-700 bg-gray-50 rounded-b">
          <div class="px-4">
            <div v-if="timeplans.length != '' ">
              <div v-for="item in timeplans" :key="item._id" class="border-b pb-4 border-gray-400 border-dashed">
                <div class="flex justify-between items-center py-2">
                  <p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">{{item.time}}</p>
                  <div @click="del(item.content)"><nut-icon size="10px" name="del" ></nut-icon></div>
                </div>
                <p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">{{item.content}}</p>
                
                
              </div>
              <div class="text-center"><nut-icon size="40px" name="plus" @click="showBottom = true"></nut-icon>
                <nut-popup position="bottom" :style="{ height: '40%' }" v-model:visible="showBottom">
                  <div class="p-4">
                    <p @click="open" class="text-sm mb-2 font-light leading-3 flex items-center text-gray-500 dark:text-gray-300"><nut-icon size="small" name="clock"></nut-icon>{{card.time}}</p>
                    <nut-picker
                        v-model:visible="show"
                        :list-data="listData"
                        title="时间"
                        @confirm="confirm" 
                    ></nut-picker>
                    <nut-textarea v-model="content" limit-show max-length="20" />
                    <div @click="push(card)" class="mt-2 text-white text-xs w-12 rounded-xl bg-gray-300">确定增加</div>
                  </div>
                  </nut-popup>
                 
                  
              </div>


            </div>
            <div v-else>
              <div class="border-b pb-4 border-gray-400 border-dashed">
                <p @click="open" class="text-sm mb-2 font-light leading-3 flex items-center text-gray-500 dark:text-gray-300"><nut-icon size="small" name="clock"></nut-icon>{{card.time}}</p>
                <nut-picker
                    v-model:visible="show"
                    :list-data="listData"
                    title="时间"
                    @confirm="confirm" 
                ></nut-picker>
                <nut-textarea v-model="content" limit-show max-length="20" />
                <div @click="push(card)" class="mt-2 text-white text-xs p-1 text-center w-20 rounded-xl bg-gray-300">确定增加</div>
              </div>
            </div>
          </div>
        </div>
      </scroll>



    </div>
  </div>
</template>

<script setup>
  import {
    useRouter
  } from 'vue-router';
  import Scroll from '@/components/scroll/Scroll.vue'
  import {
    reactive,
    ref,
    watch
  } from 'vue';
  import { Notify } from '@nutui/nutui';
  import { Http} from "@/utils/request.js"
  import {
    getCacheVal,
    clearItem
  } from '@/utils/LocalStorageKit.ts'


  const router = useRouter()
  const back = () => router.replace("/")

  const value = ref(new Date())
  const calendar = ref()
  const selectDate = (value) => {
    calendar.value.selectDate(value)
  }
  const date = ref('')
 

  const timeplans = ref([]);
  const account = ref(getCacheVal("account"));
  const getCards = async() => {
    try{
      const res = await Http("/getcards");
      timeplans.value = res.data;    
    } catch(e) {
      return e
    }
  }


  const select = (data) => {
    date.value = data.day
    getCards()
  }
  const show = ref(false);
  const card = reactive({
    time:'请选择时间',
    account:account.value
  })
  const content = ref(null)
  const listData = ['8:00','9:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00'];
  const open = ()=>{
    show.value = true;
  }
  const confirm = (res)=>{
    card.time = date.value + ' ' + res;
  }
  // let timer = null;
  // watch(() => content.value,(val) => {
  //   let firstInput = !timer
  //   if(timer){clearTimeout(timer)}
  //   if(firstInput){
  //     const textSava = (val) => {
  //       content.value = val
  //     }
  //   }
  //   timer = setTimeout(() => {timer = null},1000)
  // })
  const showBottom = ref(false)
  const push = async(card) => {
    if(card.time != '' && content.value != null){
      try{
        const res = await Http("/pushcard",{
          card,
          content
        })
        getCards();
        showBottom.value = false;
        content.value = null;
        card.time = ''

      } catch(e) {
        return e
      }
    }else{
       Notify.text("请输入完整内容", { color: '#ad0000', background: '#ffe1e1' });
    }
  }

  const del = async(id) => {
    try{
      const res = await Http("/calendardel",{
        content: id
      })
      if (res.code === 1) {
        Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
      } else {
       Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
      }
      getCards()
      
    } catch(e) {
      console.log(e)
    }
  }


</script>

<style scoped>
  .content {
    height: calc(100vh - 436px)
  }

  .el-calendar {
    height: 340px;
    --el-calendar-cell-width: 40px;
    --el-calendar-border: none
  }
</style>