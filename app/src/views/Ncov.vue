<template>
  <div>
    <nut-navbar @on-click-back="back" title="疫情服务"></nut-navbar>
    <scroll class="content" probeType="3" :pull-up-load="true">
      <!-- component -->

      <section class="mx-auto p-4">
        <div class=''>
          <div class='text-white w-full bg-gradient-to-r from-blue-900 to-blue-500 p-4 py-5 px-5 rounded-xl'>
            <div class="flex justify-between">
              <div>
                <h2> {{getCacheVal("province")}} </h2>
                <p class='text-2xl font-bold'> {{getCacheVal("proviceConfirm")}} </p>
              </div>
              <div class="flex items-center ">
                <div class='p-5 bg-gray-200 bg-opacity-40 rounded-full'></div>
                <div class='p-5 bg-gray-200 bg-opacity-30 rounded-full -ml-4'></div>
              </div>
            </div>

            <div class='flex justify-between mt-5 w-48 ' @click="router.replace('/risk')">
              <div>
                <h3 class="text-xs"> 全国高风险地区 </h3>
                <p class="font-bold"> {{high}} </p>
              </div>
              <div>
                <h3 class="text-xs"> 全国中分险地区 </h3>
                <p class="font-bold"> {{mid}} </p>
              </div>
            </div>
          </div>
        </div>
        <!-- component -->
        <div class="flex flex-col gap-4 mt-6 items-center justify-center">

          <!-- Card 1 -->
          <a v-for="(item,index) in JSON.parse(getCacheVal('news'))"
            class="rounded-sm w-full grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform"
            :href="item.sourceUrl">


            <!-- Title -->
            <div class="col-span-11 xl:-ml-5">
              <p class="text-blue-600 font-semibold"> {{item.title}} </p>
            </div>

            <!-- Icon -->
            <div class="col-span-12 md:col-span-1">
              {{item.pubDateStr}}
            </div>


            <!-- Description -->
            <div class="md:col-start-2 col-span-11 xl:-ml-5">
              <p class="text-sm text-gray-800 font-light truncate"> {{item.summary}} </p>
            </div>

          </a>



        </div>
     
      </section>


    </scroll>
  </div>
</template>

<script setup>
  import {
    useRouter,
    useRoute
  } from "vue-router";
  import {
    reactive,
    ref
  } from "vue"
  import {
    useStore
  } from "vuex";
  import {
    getCacheVal,
    setCacheVal
  } from "../utils/LocalStorageKit";
  const router = useRouter()
  const route = useRoute()
  const store = useStore()

  const high = (JSON.parse(getCacheVal("high"))).length;
  const mid = (JSON.parse(getCacheVal("mid"))).length;


  const back = () => {
    router.replace("/work")
  }

  const state = reactive({
    tab1value: '0',
  });
</script>

<style scoped>
  .content {
    height: calc(100vh - 44px)
  }

  .nut-navbar {
    margin-bottom: 0px !important
  }

  .nut-tabs__titles {
    background-color: #ffffff !important
  }
</style>