<template>
  <div>
    <nut-navbar
      @on-click-back="back"
      @on-click-title="title"
      title="文件库"
    ></nut-navbar>
    <scroll class="content" :probeType="3" :pull-up-load="true">
    <!-- component -->
    <div class="flex flex-col gap-5 items-center justify-center bg-white">

      <!-- Card 1 -->
      <card class="border-gray-300 border-2 mx-4 rounded-xl py-7 px-5">
        <div class="grid grid-cols-6 gap-3">

          <!-- Image -->
          <div class="col-span-2">
            <img src="https://events.duolingo.com/images/why_global.svg" />
          </div>

          <!-- Description -->
          <div class="col-span-4">
            <p class="text-gray-700 font-bold"> Make Global Connections </p>
            <p class="text-gray-500 mt-4"> Meet learners from around the world, build your reputation, and expand your
              network </p>
          </div>

        </div>
      </card>

      <!-- Card 2 -->
      <card class="border-gray-300 border-2 mx-4 rounded-xl py-7 px-5">
        <div class="grid grid-cols-6 gap-3">

          <!-- Description -->
          <div class="col-span-4">
            <p class="text-gray-700 font-bold"> Create an impact </p>
            <p class="text-gray-500 mt-4"> Share your language expertise and help learners have fun, relax, and speak
              confidently </p>
          </div>

          <!-- Image -->
          <div class="col-span-2">
            <img src="https://events.duolingo.com/images/why_impact.svg" />
          </div>

        </div>
      </card>

      <!-- Card 3 -->
      <card class="border-gray-300 border-2 rounded-xl mx-4 py-7 px-5">
        <div class="grid grid-cols-6 gap-3">

          <!-- Image -->
          <div class="col-span-2">
            <img src="https://events.duolingo.com/images/why_access.svg" />
          </div>

          <!-- Description -->
          <div class="col-span-4">
            <p class="text-gray-700 font-bold"> Gain insider access </p>
            <p class="text-gray-500 mt-4"> Enjoy access to Duolingo staff and learning materials, unreleased features,
              and a special profile badge </p>
          </div>

        </div>
      </card>

      
    </div>
    </scroll>
  </div>
</template>

<script setup>
  import Scroll from "@/components/scroll/Scroll.vue"
  import { useRouter } from 'vue-router';


  const router = useRouter()
  const back = () => router.replace("/")



</script>

<style scoped>
 .content {
    height: calc(100vh - 44px)

  }
    .nut-navbar {
    margin-bottom: 0px !important
  }
</style>