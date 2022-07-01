<template>
  <layout>
    <div
      class="min-h-screen flex flex-col max-w-md mx-auto bg-stone-100 opacity-100 font-poppins bg-no-repeat bg-cover bg-center">

      <nut-navbar v-if="fixed" style="background-color: #00b5f7;font-weight:bolder;color: #fff" :left-show="false"
        title="我的"
        class="animate__animated animate__backInDown animate__faster backdrop-saturate-125 bg-white border-b-2 border-b-slate-300"
        :class="fixed == true ? 'fixedNav' : ''">
      </nut-navbar>
      <scroll class="content bg-white" :probeType="3" :pull-up-load="true" @scroll="fixedActive">

        <div class="flex items-center pt-4 justify-between">
          <div class="border-4 border-blue-300 rounded-full mx-auto inline-block">
            <nut-avatar size="large" :icon="avatar" v-if="avatar == '' ? false : true"></nut-avatar>
            <nut-avatar size="large" v-else> {{state.name}}</nut-avatar>
            

          </div>
          <div class="w-9/12 flex items-center">
            <div class="w-11/12 -ml-4 flex flex-col leading-none pl-4">
              <div class="flex items-center space-x-2">
                <p class="font-bold">{{state.nickname}}</p>

                <svg xmlns="http://www.w3.org/2000/svg" @click="go_detail" class="text-gray-700" fill="currentColor"
                  viewBox="0 0 24 24" width="18" height="18">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
                  </svg>
              </div>
              <div class="flex items-center space-x-2 mt-1">
              <p class="text-sm pt-1 font-light text-gray-700">{{state.name}}<span class="ml-2">{{state.grade}}</span>
              </p>
              
              <button v-if="status == '实习'" class="bg-red-800 w-18 rounded-full px-2 font-ligth text-xs mt-1 text-white flex items-center">👷 实习</button>
              <button v-else-if="status == '假期'" class="bg-green-800 w-18 rounded-full px-2 font-ligth text-xs mt-1 text-white flex">🎮 假期</button>
              <button v-else class="bg-blue-500 w-18 rounded-full px-2 font-ligth text-xs mt-1 text-white flex">🤠 在校</button>
                  </div>
                  </div>
            <div class="w-1/12">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" @click="showBottom = true" viewBox="0 0 24 24" width="24"
                  height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>

              </div>
              <nut-popup position="bottom" :style="{ height: '20%' }" v-model:visible="showBottom">
                <div class="flex flex-col text-center tracking-wider">
                  <div class="h-12 flex justify-center items-center" @click="logout">退出登录</div>
                  <div class="border-t-8 p-4 flex justify-center items-center" @click="isShowBottom">取消</div>
                </div>
              </nut-popup>
            </div>
          </div>
        </div>
        <div class="pt-8 px-4 w-full flex flex-col">
          <p class="font-semibold text-gray-600">我的状态</p>
          <nut-cell title="请选择" :desc="desc" @click="open"></nut-cell>
          <nut-picker v-model:visible="show" :list-data="listData" title="状态选择" @confirm="confirm"></nut-picker>
          <div class="flex text-sm w-full pt-2 space-x-2">

          </div>
        </div>
        <div class="px-4 w-full flex flex-col">
          <p class="font-semibold text-gray-600">动态</p>
          <nut-tabs v-model="state.tab1value" size="large">
         
            <nut-tabpane title="我的动态"> 
              <!-- component -->
<div v-for="item in mydata" class=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mb-2 md:mx-0 lg:mx-0">
    <img class="w-full bg-cover" :src="item.img">
    <div class="px-3 pb-2">
      <div class="pt-2">
        <i class="far fa-heart cursor-pointer"></i>
        <span class="text-sm text-gray-400 font-medium"> {{item.time}} </span>
      </div>
      <div class="pt-1">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2"> {{item.topic}} </span> {{item.content}}
        </div>
      </div>
      <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">  </div>
    </div>
  </div>
            </nut-tabpane>
        <nut-tabpane class="bg-stone-100" title="赞过">
      <!-- <div class="mt-5 w-full">
        <a href="#"  v-for="item in likesdata"
          class="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 w-full block hover:bg-gray-100 transition duration-150">
          <img :src="item.img" 
            class="rounded-full h-6 shadow-md inline-block mr-2">
          {{item._account}}
          <span class="text-gray-400 text-sm"> {{item.time}} </span>
        </a>
      </div> -->
      <!-- component -->
<!-- This is an example component -->
<div class="w-full  flex justify-center items-center mb-2" v-for="item in likesdata">
    <div class="relative pl-1 flex justify-center rounded-xl hover:scale-105 duration-500 transform transition cursor-pointer">
        <!-- Tag Discount -->
        <div class="top-0 left-0 mt-3 px-2 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">赞过</div>
        <div class="top-0 left-0 h-2 md:h-3 mt-5 px-2 absolute z-20 bg-green-500"></div>
        <div class="top-0 left-0 h-2 md:h-3 mt-6 pl-5 rounded-3xl absolute z-0 bg-green-600"></div>
        <div class="w-full pb-2 bg-white rounded-xl shadow-xl z-10">
            <div class="relative">
            <!-- :src="image.largeImageURL"     -->
                <img :src="item.img" alt="">
                <!-- Tag rekomendasi -->
                <div class="bottom-0 right-0 mb-2 mr-2 px-2 rounded-lg absolute bg-yellow-500 text-gray-100 text-xs font-medium">{{item._account}}</div>
            </div>
            <div class="px-2 py-1">
                <!-- Product Title -->
                <div class="text-sm md:text-base font-bold pr-2">  </div>
                <div class="flex py-2">
                    <!-- Distance -->
                    <div class="bg-gray-200 p-1 mr-2 rounded-full text-xs font-medium text-gray-900">
                        {{item.time}}
                    </div>
                    <div class="flex justify-between item-center">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 md:h-5 md:w-5 text-yellow-500" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <!-- Rating total -->
                                <p class="text-gray-600 font-bold text-xs md:text-sm ml-1">
                                    
                                    <!-- Jumlah review -->
                                    <span class="text-gray-500 font-normal">({{item.local}})</span>
                                </p>
                            </div>
                    </div>
                </div>
                <!-- Alamat -->
                <p class="pb-1 md:pb-2 text-xs md:text-sm text-gray-500">
                  {{item.content}}
                </p>
                <!-- Tombol pesan -->
            </div>
        </div>
    </div> 
</div>
    </nut-tabpane>
  </nut-tabs>
</div>
      
      </scroll>
    </div>
  </layout>



</template>

<script setup>
  import Layout from '@/layout/index.vue'
  import Scroll from '@/components/scroll/Scroll.vue'
  import {
    getCacheVal,
    clearItem
  } from '@/utils/LocalStorageKit.ts'
  import { imgURL,Gql } from '@/utils/request.js'
  import {
    reactive,
    ref,
    watch
  } from 'vue';
  import {
    useRouter
  } from "vue-router";
  import {
    useStore
  } from 'vuex';

  const router = useRouter();
  const store = useStore();

  const showBottom = ref(false)
  const state = ref(null)
  const radioVal = ref('1');
  const avatar = ref(getCacheVal("avatar"))

  const fixed = ref(false)
  const fixedActive = (Y) => {
    -Y >= 66 ? fixed.value = true : fixed.value = false
  }

  const init_user = () => {
    const userInfo = JSON.parse(getCacheVal("userInfo"));
    state.value = {
      ...userInfo
    };
  }

  init_user();

  const go_detail = () => {
    router.push("/profile_edit")
  }

  const logout = () => {
    state.value = null
    clearItem("userInfo");
    router.replace("/login")
  }

  const isShowBottom = () => {
    showBottom.value = false
  }

  const show = ref(false);
  const status = ref('')

  const listData = [
    '在校',
    '假期',
    '实习'
  ];
 
  const desc = ref(listData[0]);
  watch(() => desc.value, (val) => {
    status.value = val
  })
  const open = () => {
    show.value = true;
  }
  const confirm = (res) => {
    desc.value = res;
  }
  const account = getCacheVal("_account")
  const likesdata = ref([])
  const likesGql = async () => {
    const q = {
    query: `
          {
            profilemoment(account:"${account}"){
               _account,
              time,
              content,
              topic,
              img,
              likes{
                avatar
              },
              avatar,
              name,
              local
            }
          }
          `
  }
  try {
    const res = await Gql(q);
    likesdata.value = res.data.profilemoment

  } catch (e) {
    console.log(e)
  }

  }
  likesGql()
  const mydata = ref([])
  const accountGql = async () => {
    const q = {
    query: `
          {
            accountmoments(account:"${account}"){
               _account,
                time,
                content,
                topic,
                img,
                likes{
                  avatar
                },
                avatar,
                name,
                local
            }
          }
          `
  }
  try {
    const res = await Gql(q);
    mydata.value = res.data.accountmoments

  } catch (e) {
    console.log(e)
  }

  }
  accountGql()
</script>

<style scoped>
  .content {
    height: calc(100vh - 42px);

  }
      .nut-navbar {
    margin-bottom: 0px !important
  }
</style>