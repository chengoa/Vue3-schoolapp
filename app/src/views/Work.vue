<script setup>
  import navbar from "@/components/Navbar.vue"
  import Scroll from "@/components/scroll/Scroll.vue"
  import ScrollX from "@/components/scroll/ScrollX.vue"
  import dayjs from 'dayjs'
  import Loader from '@/components/Loader.vue';
  import Layout from '@/layout/index.vue'
  import BackTop from '@/components/BackTop.vue'
  import {
    nCOVaxios,
    Gql,
    guideAxios,
    areaAxios,
    waAxios
  } from "@/utils/request.js"
  import BScroll from '@better-scroll/core';

  import {
    ref,
    computed,
    onMounted,
    nextTick
  } from "vue"
  import {
    useStore
  } from 'vuex'
  import {
    useRouter
  } from "vue-router";
  import {
    getCacheVal,
    setCacheVal,
    clearItem
  } from '@/utils/LocalStorageKit.ts'

  const store = useStore();
  const router = useRouter();
  const nCOVdata = ref(null);
  const areaTree = ref(null);
  const confirm = ref(null);
  const nowConfirm = ref(null);
  const lastUpdateTime = ref(null);
  const avatar = ref(getCacheVal("avatar"))

  const cityName = ref(null)
  const higharea = ref(null)
  const midarea = ref(null)
  const ishigh = ref(null)
  const ishighnum = ref(null)
  const ismid = ref(null)
  const ismidnum = ref(null)
  const province = ref(null)
  guideAxios('https://restapi.amap.com/v3/ip?&output=json&key=a9af36d78a5590f35b33ba2a2b78d4fe').then(
    res => {
      cityName.value = res.data.city;
      province.value = res.data.province.substr(0, res.data.province.length - 1);
      setCacheVal("province",res.data.province)
    }
  )
  const newslist = ref([]);
  areaAxios('http://api.tianapi.com/ncov/index?key=f2092db3708ba21e9556c24ee6c0fbe2').then(
    res => {
      console.log(res.data)
      confirm.value = res.data.newslist[0].desc.yesterdayConfirmedCountIncr;
      nowConfirm.value = res.data.newslist[0].desc.currentConfirmedCount;
      newslist.value = res.data.newslist[0].news;
      higharea.value = res.data.newslist[0].riskarea.high;
      midarea.value = res.data.newslist[0].riskarea.mid;
      let high = res.data.newslist[0].riskarea.high;
      let mid = res.data.newslist[0].riskarea.mid;
      store.dispatch("ncov/setHigh",high);
      store.dispatch("ncov/setMid",mid);
      store.dispatch("ncov/setNews",res.data.newslist[0].news)
      const highfilter = high.filter((item,index) => {
       return item.includes(cityName) == true ? item : null
        
      })
      const midfilter = mid.filter((item,index) => {
       return item.includes(cityName) == true ? item : null 
      })
      
      ishigh.value = highfilter;
      ishighnum.value = highfilter.length;
      ismid.value = midfilter;
      ismidnum.value = midfilter.length;
    }
  )
  const proviceConfirm = ref(null);
  waAxios('https://yspm.api.storeapi.net/api/94/219?appid=16563&format=json&sign=809036ACF5EF0F573AE766058227B03D').then(
    res => {
      console.log(res)
      const filter = res.data.retdata.filter(item => {
        return province.value.indexOf(item.xArea) > -1
      })
    proviceConfirm.value = filter[0].nativeRelative;
    setCacheVal("proviceConfirm",filter[0].nativeRelative)
    lastUpdateTime.value = dayjs.unix(filter[0].updateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  )

  // nCOVaxios('/g2/getOnsInfo?name=disease_h5').then(res => {
  //   nCOVdata.value = JSON.parse(res.data.data);
  //   lastUpdateTime.value = nCOVdata.value.lastUpdateTime;
  //   areaTree.value = nCOVdata.value.areaTree[0]; // api 获取中国疫情当天改变的数据
  //   confirm.value = areaTree.value.today.confirm; // 当天新增确诊人数
  //   nowConfirm.value = areaTree.value.total.nowConfirm;
  //   let arr = JSON.parse(res.data.data).areaTree[0].children;
  //   const filter = arr.filter(item => {
  //     return province.value.indexOf(item.name) > -1
  //   })
  //   proviceConfirm.value = filter[0].today.confirm;
  //   setCacheVal("proviceConfirm",filter[0].today.confirm)
  // }).catch(err => {
  //   console.log(err,1111);
  // })



  const fixed = ref(false)
  const fixedActive = (Y) => {
    -Y >= 66 ? fixed.value = true : fixed.value = false
  }

  const carouseldata = ref([]);
  const coursedata = ref([]);
  const courselength = ref(null)
  const lastnotice = ref(null)

  const dataGql = async () => {
    const q = {
      query: `
            {
                carousel(limit:3){
                  src
                }
                course(limit:6){
                  src
                  title
                  date
                  duration
                  teacher
                  img
                }
                notice{
                  time,
                  content
                }
            }
            `
    }
    try {
      const res = await Gql(q);
      carouseldata.value = res.data.carousel;
      coursedata.value = res.data.course;
      courselength.value = coursedata.value.length;
      lastnotice.value = res.data.notice[0].content

    } catch (error) {
      console.log(error)
    }
  }
  dataGql();

  const state = ref(0);
  const search = (e) => {
    console.log(111);
    e.stopPropagation(); // 其它浏览器下阻止冒泡
  }


  const getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 5) {
      text = `凌晨好`;
    } else if (hours > 5 && hours <= 8) {
      text = `早上好`;
    } else if (hours > 8 && hours <= 11) {
      text = `上午好`;
    } else if (hours > 11 && hours <= 13) {
      text = `中午好`;
    } else if (hours > 13 && hours < 18) {
      text = `下午好`;
    } else if (hours >= 18 && hours <= 24) {
      text = `晚上好`;
    }
    return text;
  };

  const textState = getTimeState();
  const greet = computed(() => {
    return '星期' + '日一二三四五六'.charAt(new Date().getDay()) + '\n' + textState + '!';
  })

  const horseLamp = ref(['惊喜红包免费领', '爆款准点秒', '买超值优惠', '赢百万京豆']);
  const btns = ref([{
      icon: 'icon-rili1',
      span: '日历',
      route: '/calendar'
    },
    {
      icon: 'icon-daka',
      span: '签到打卡',
      route: '/signin'
    },
    {
      icon: 'icon-xingqu',
      span: '活动兴趣',
      route: '/activity'
    },
    {
      icon: 'icon-ziyuan',
      span: '文件库',
      route: '/school'
    },
    {
      icon: 'icon-huiyishenqing',
      span: '健康填报',
      route: '/healthreport'
    },
    {
      icon: 'icon-shiwuzhaoling',
      span: '风险地查询',
      route: '/risk'
    },
    {
      icon: 'icon-shenpi',
      span: '外出申请',
      route: '/leaveapply'
    },
    {
      icon: 'icon-daiban',
      span: '待办',
      route: '/agency'
    },

  ])
  const items = ref([1, 2, 3, 4, 5, 6]);

  const goSearch = () => {
    router.push("/search")
  }

  const goPost = () => {
    router.push("/momentedit")
  }

  const goNext = (route) => {
    router.push(route)
  }

  const goNcov = () => {
    router.replace("/ncov")
  }

  const wrapper = ref(null)
  const content = ref(null)
  let bscroll;

  onMounted(() => {
    const wrapper_div = wrapper.value
    const content_div = content.value
    let width = 6 * 148
    content_div.style.width = width + 'px'
    nextTick(() => {
      if (!bscroll) {
        bscroll = new BScroll(wrapper_div, {
          scrollX: true,
          probeType: 3,
          click: true,
          mouseWheel: true,
          disableMouse: false,
          disableTouch: false
        })
      } else {
        bscroll.refresh()
      }
    })
  })

  const goCourse = (title) => {
    router.replace({
      path: "/course",
      query: {
        title
      }
    })
  }
    const activitydata = ref(null);
    const activityGql = async () => {
        const q = {
            query: `
            {
                activity{
                    rank
                    titile
                    img
                    content
                    quota
                    applicants
                    deadline
                }
            }
            `
        }
        try {
            const res = await Gql(q);
            let arr = res.data.activity
            activitydata.value = arr.sort((a,b)=> {
              return (b.applicants/b.quota) - (a.applicants/a.quota)
            })
        } catch (e) {
            console.log(e)
        }
    }
    activityGql()
  const moments = ref(null)

  const momentsGql = async () => {
    const q = {
      query: `
            {
                moments{
                   _account,
                   time,
                   content,
                   topic,
                   img,
                   likes{
                     account
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
      moments.value = res.data.moments.sort((a,b)=> {
        // return parseInt(a.time) - parseInt(b.time);
        if(a.likes && b.likes){
          return b.likes.length - a.likes.length
        }else{
          return parseInt(a.time) - parseInt(b.time);
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  momentsGql()

  const loadMore = () => {
    dataGql();
  }
  const likeslength = computed((arr) => {
    return (arr) => {
      return arr == null? 0 : arr.length
    }
  })
    
</script>
<template>
  <div>
    <layout>
      <nut-searchbar v-if="fixed"
        class="animate__animated animate__backInDown animate__faster backdrop-saturate-125 bg-white border-b-2 border-b-slate-300"
        :class="fixed == true ? 'fixedNav' : ''" @click="router.push('/search')">
      </nut-searchbar>
      <div v-if="store.state.load.loading" class="flex justify-center items-center leading-10 fixed top-0 inset-x-1/2">
        <loader></loader>
      </div>
      <scroll class="content" style="background-color:rgb(245, 245, 245)" :probeType="3" :pull-up-load="true"
        @scroll="fixedActive" @pullingUp="loadMore" ref="scroll">
        <div class="container">
          <div class="bgd">
            <div class="square">
              <div class="nav">
                <navbar>
                  <template #left>
                    <nut-avatar :icon="avatar" v-if="avatar == '' ? false : true"></nut-avatar>
                    <nut-avatar v-else> {{state.name}}</nut-avatar>
                    <div class="greet text-slate-50">{{greet}}</div>
                  </template>
                  <template #right>
                    <div class="icons">
                      <div>
                        <nut-icon name="search" @click="goSearch"></nut-icon>
                      </div>
                      <div>
                        <nut-icon name="edit" @click="goPost"></nut-icon>
                      </div>
                      <div>
                        <nut-icon name="location"></nut-icon>
                      </div>
                      <div>
                        <nut-icon name="refresh" @click="search"></nut-icon>
                      </div>
                    </div>
                  </template>
                </navbar>
              </div>
              <div
                class="top-8 p-2 box-border grid grid-cols-4 gap-2 shadow-2xl backdrop-saturate-125 text-current bg-white/50  rounded-t-2xl relative z-10 isolate">
                <div v-for="item in btns" :key="item.span" class="flex flex-col items-center text-xs leading-8">
                  <div @click="goNext(item.route)" :class="'iconfont ' + item.icon" style="font-size: 36px;">
                  </div>
                  <div class="font-sans text-gray-700 font-semibold tracking-wide">{{item.span}}</div>
                </div>
              </div>
            </div>
            <div class="round">
            </div>
            <div class="swiper">
              <el-carousel :interval="3000" type="card" height="100px">
                <el-carousel-item v-for="item in carouseldata" :key="item.src">
                  <el-image style="height:160px;width:160px" :src="item.src" fit="fill"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="notice">
            <nut-noticebar :text="lastnotice">
              <template v-slot:rightIcon>
                <nut-icon type="trolley" color="#111">
                </nut-icon>

              </template>
            </nut-noticebar>
          </div>
          <div class="flex text-base font-semibold font-sans my-4 tracking-widest antialiased">
            <div class="iconfont icon-jiaoyu0" style="font-size: 24px;"></div>
            课程精选
          </div>
          <div class="wrapper w-full" ref="wrapper">
            <div class="contentX" ref="content">
              <el-row :gutter="8">
                <el-col v-for="item in coursedata" :key="item" :span="4" @click="goCourse(item.title)">
                  <div :body-style="{ padding: '0px', }">
                    <div class="rounded-xl border bg-white hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">
                      <img :src="item.img" class="w-full h-24 rounded-t-lg" />
                      <p class="text-sm px-2 mt-2 text-gray-700 font-semibold"> {{item.title}} </p>
                      <p class="text-xs px-2 my-2 text-gray-700 font-semibold mt-1"> {{item.teacher}} </p>


                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="flex text-base font-bold my-4 tracking-widest whitespace-pre">
            <div class="iconfont icon-banji" style="font-size: 24px;"></div>
            <span>抗击疫情</span>
            <div class="text-xs font-normal inline-block text-slate-400" style="line-height:1.5rem"> |
              截至{{lastUpdateTime}}</div>
          </div>
          <div class="grid grid-rows-2 grid-flow-col gap-2">
            <div class="row-span-3 bg-origin-padding bg-over rounded-2xl p-3 box-border"
              style="background-image: url(https://img0.baidu.com/it/u=3318306128,3882762562&fm=15&fmt=auto)">
              <div class="text-sm text-white font-bold tracking-widest">请严格依照学校防疫要求做好自我防护</div>
              <div class="text-xs font-bold mt-3 text-slate-300">当前城市 {{cityName}}</div>
              <div @click="goNcov" class="flex flex-col space-y-4 mt-4 justify-around p-3 text-xs bg-white rounded-md mt-2">
                <div class="flex justify-between">
                  <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#EF4444"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <div class="ml-1">高风险地区</div>
            </div>
                
                <div>{{ishighnum}}</div>
                </div>
                <div class="flex justify-between">
                  <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffcc66"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
                              <div class="ml-1">中风险地区</div>

            </div>
                <div>{{ismidnum}}</div>
              </div>
              </div>
             
            </div>
            <div class="row-span-2 col-span-1 rounded-2xl">
              <div class="bg-white border-2 border-gray-100 text-sm font-medium tracking-widest p-2 rounded-lg">
                <div class="flex flex-row flex-nowrap justify-between whitespace-pre leading-8">{{province}}新增<div
                    class="arraylist text-yellow-500 italic"> {{proviceConfirm}}</div>
                </div>
                <div class="flex flex-row flex-nowrap justify-between whitespace-pre leading-8">国内新增 <div
                    class="arraylist text-yellow-500 italic"> {{confirm}}</div>
                </div>
                <div class="flex flex-row flex-nowrap justify-between whitespace-pre leading-8">现有确诊 <div
                    class="arraylist text-red-500 italic"> {{nowConfirm}}</div>
                </div>
              </div>


            </div>
            <div
              class="row-span-1 col-span-1 overflow-y-hidden rounded-lg bg-white border-2 border-gray-100 text-sm font-medium tracking-widest p-2"
              style="width:156px;height:80px">
              <nut-swiper init-page="0" :loop="true" auto-play="3000" direction="vertical" width="156" height="80"
                :pagination-visible="true">
                <nut-swiper-item v-for="item in newslist" class="flex flex-col" :key="item">
                   
                  <div class="text-black text-base italic font-bold text-left w-full">
                   
                  <div class="text-red-600 mb-1">{{item.pubDateStr}}</div>
                  </div>
                  <div class="text-sm text-left text-clip overflow-hidden">{{item.title}}</div>
                  
          
                </nut-swiper-item>

              </nut-swiper>
            </div>

          </div>
          <div class="mt-8">
            <div class="flex text-base font-bold my-4 tracking-widest whitespace-pre">
              <div class="iconfont icon-tongji" style="font-size: 24px;"></div>
              <span>排行榜</span>
            </div>
            <nut-tabs v-model="state" type="smile">
              <nut-tabpane title="活动" class="bg-white">
                <div>
                  <ul role="list" v-for="item in activitydata" class="divide-y divide-black dark:divide-gray-700">
            <li class="py-2">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" :src="item.img" alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            #{{item.rank}}
                        </p>
                        <p class="text-sm text-gray-400 truncate">
                            {{item.titile}}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-xs text-orange-600 italic dark:text-white">
                        {{item.applicants}}/{{item.quota}}
                    </div>
                </div>
            </li>
            </ul>
                </div>
              </nut-tabpane>
              <nut-tabpane title="校园圈">
                 <ul role="list" v-for="item in moments" class="divide-y divide-black dark:divide-gray-700">
            <li class="py-2">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" :src="item.img" alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {{item._account}}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {{item.content}}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-xs text-gray-900 dark:text-white">
                        <svg class="fill-rose-600" style="width: 22px; height: 22px;" viewBox="0 0 24 24">
                            <path
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                            </path>
                          </svg>
                        {{likeslength(item.likes)}}
                    </div>
                </div>
            </li>
            </ul>
              </nut-tabpane>
            </nut-tabs>
          </div>

        </div>
      </scroll>

    </layout>
  </div>
</template>
<style scoped>
  .fixedNav {
    width: 100%;
    height: 44px;
    position: fixed;
    top: 0px;
    z-index: 200;
    padding: 0 100px 0 100px;
  }

  .container {
    padding: 24px;
    box-sizing: border-box;
  }

  .bgd {
    margin: -24px;
    background: #7a7af9;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #009ffc, #7a7af9);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #009ffc, #7a7af9);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .wrapper {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    display: inline-block;
  }

  .content {
    display: inline-block;
  }

  .square {
    width: 100%;
    height: 300px;
    padding: 24px;
    box-sizing: border-box;
  }

  .round {
    width: 100%;
    height: 200px;
    border-radius: 60%;
    position: absolute;
    top: 200px;
    padding: 24px;
    box-sizing: border-box;
    background: #7a7af9;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #009ffc, #7a7af9);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #009ffc, #7a7af9);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .swiper {
    position: absolute;
    top: 250px;
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .nav {
    background-color: transparent;
    position: relative;
    top: 20px;
    margin: -24px;
  }

  .greet {
    letter-spacing: 1px;
    font-weight: bold;
    white-space: pre;
  }

  p::before {
    content: attr(data-usename);
  }

  .icons {
    color: #ccc;
    display: flex;
    justify-content: space-around;
    width: 100%;

  }

  /* .icons > div::after {
  content: "";
  height: 12px;
  display: inline-block;
  position: absolute;
  top: 36%;
  margin: 0 8px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 7px #edeef1;
} */
  .notice {
    margin-top: 150px;
    background-color: #1989fa;
    color: #fff;
    border-radius: 18px;

  }

  .content {
    height: calc(100vh - 48px)
  }

  .contentX {
    height: 160px
  }

  .arraylist::after {
    content: '>';
    color: '#666'
  }
</style>