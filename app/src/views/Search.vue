<template>
  <div>
    <!-- component -->
    <div class="h-screen ">
      <div class="flex relative mx-auto max-w-md" @keyup.enter="search">
        <input v-model="searchVal" class="border-b-2 border-primary bg-red transition h-10 px-7 focus:outline-none w-full text-black text-sm " type="search" name="search" placeholder="输入查找内容" />
        <div class="absolute left-1 top-2 mr-4" @click="back">
          <nut-icon size="small" class="text-black font-bold h-4 w-4 fill-current" name="left"></nut-icon>

          <!-- <svg class="text-black h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg> -->
        </div>
      </div>
      <div class="bg-white px-7 py-4">

        <div class="font-semibold text-sm flex justify-between">
          <div>搜索历史</div>
          <div  @click="deleteAll">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" :opacity="historySearch.length == 0 ? 0 : .3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                     </svg>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap gap-3">
          <div v-if="historySearch.length == 0 ? true : false" class="nohistory">暂无搜索记录</div>
          <button 
          v-else
          v-for="item in historySearch" 
          :key="item"
          @click="searchByHistory(item)"
          class="bg-gray-200 hover:bg-gray-300 duration-300 rounded-full px-4 py-2 font-light text-sm">
            {{item}}
          </button>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Gql} from "@/utils/request.js"
import { ref} from 'vue'
import {setArray,getArray,clearItem} from "@/utils/LocalStorageKit.ts";
import { Notify } from '@nutui/nutui';

const router = useRouter();
const back = () => router.replace("/")

const searchVal = ref(null)
 const search = () => {
    const name = searchVal.value;
    if(name !== ""){
      setArray("historySearch",name)
      router.replace({
        path:"/searchres",
        query:{
          name
        }
      })
    }else{
      Notify.text("请输入要搜索的内容", { color: '#ad0000', background: '#ffe1e1' });

    }
    
    
 }

const historySearch = ref(getArray("historySearch"))  // 因为historySearch这个对象需要显示在页面上
const searchByHistory = (item) => {
  router.replace({
    path:"/searchres",
    query:{
      name:item
    }
  })
}


const deleteAll = () => {
  clearItem("historySearch")
   historySearch.value = []
}



</script>

<style scoped>
.nohistory{
  letter-spacing: 1px;
  font-size: 14px;
  margin: 12px auto;
  color: rgb(149,149,149);

}
</style>