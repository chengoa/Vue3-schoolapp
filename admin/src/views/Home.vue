<template>
  <div>
    <div class="w-full">
      <div class="bg-indigo-50 flex-grow px-6">
    
        <div>
          <div class="flex space-x-4">
            <div class="flex items-center justify-around p-6 bg-white duration-300 hover:bg-gray-100 hover:shadow-xl w-64 rounded-xl space-x-2 mt-10 shadow-lg">
              <div>
                <span class="text-sm font-semibold text-gray-400">用户</span>
                <h1 class="text-2xl font-bold">{{entries}}</h1>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
             <div class="flex items-center justify-around p-6 bg-white hover:bg-gray-100 hover:shadow-xl w-64 rounded-xl space-x-2 mt-10 shadow-lg">
              <div>
                <span class="text-sm font-semibold text-gray-400">健康</span>
                <h1 class="text-2xl font-bold">$682.5</h1>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <div class="flex items-center justify-around p-6 bg-white hover:bg-gray-100 hover:shadow-xl w-64 rounded-xl space-x-2 mt-10 shadow-lg">
              <div>
                <span class="text-sm font-semibold text-gray-400">活动</span>
                <h1 class="text-2xl font-bold">{{ac_entries}}</h1>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
              </div>
            </div>
            <div class="flex items-center justify-around p-6 bg-white hover:bg-gray-100 hover:shadow-xl w-64 rounded-xl space-x-2 mt-10 shadow-lg">
              <div>
                <span class="text-sm font-semibold text-gray-400"></span>
                <h1 class="text-2xl font-bold">$682.5</h1>
              </div>
               <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              
            </div>
           
          </div>
    <section class="bg-opacity-90">
      <div class="container mx-auto flex flex-col lg:flex-row">
        <!-- left -->
        <div class="relative lg:w-3/5 rounded-xl bg-white mt-8 p-8">
          <p class="max-w-sm text-secondary text-3xl md:text-4xl font-semibold">Active Summer With Juice Milk 300ml</p>
          <p class="max-w-xs pr-10 text-secondary font-semibold mt-8">New arrivals with naturre fruits, juice milks, essential for summer</p>
          <button class="mt-20 bg-white font-semibold px-8 py-2 rounded">Shop Now</button>
          <div class="absolute bottom-8 right-8 md:bottom-5 md:right-5 flex">
            <a href class="h-6 w-6 flex items-center justify-center rounded-md bg-white">
              <svg class="h-3 text-gray-700" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><path fill="currentColor" d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"></path></svg>
            </a>
            <a href class="ml-1.5 h-6 w-6 flex items-center justify-center rounded-md bg-yellow-400">
              <svg class="h-3 text-gray-700" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"></path></svg>
            </a>
          </div>
        </div>
        <!-- right -->
        <div class="lg:mt-8 lg:ml-6 lg:w-2/5 rounded-xl bg-white p-8">
          <div class="max-w-sm">
            <div id="main" class="w-40 h-40"></div>
            <p class="text-3xl md:text-4xl font-semibold uppercase"> {{today}} </p>
            <p class="mt-8 font-semibold">Syncthetic seeds<br />2.0 OZ</p>
            <button class="mt-20 bg-white font-semibold px-8 py-2 rounded">Shop Now</button>
          </div>
        </div>
      </div>
    </section>

 

    
    
          </div>

        </div>
     
      </div>
    </div>

</template>

<script setup>
  import Map from '@/components/Map.vue'
  import { useStore } from 'vuex'
  import { onMounted, ref } from 'vue';
  import {
		Http,
		Gql
	} from '@/utils/HttpKit.ts'
import moment from 'moment';
import * as echarts from 'echarts';

  const store = useStore()
  const entries = ref(null)
  const ac_entries = ref(null)

  	const memberGql = async () => {
		const q = {
			query: `
			{
				entries {
					name
				}
			}
		`
		}
		try {
			const res = await Gql(q);
			entries.value = res.data.entries.length;
		} catch (error) {
			console.log(error);
		}
	}
	memberGql();
  const httpData = async () => {
    try {
      const res = await Http("/getdata");
      ac_entries.value = res.entries;
    } catch (error) {
      console.log(error);
    }
  }
  httpData();
  const healthdata = ref([])
  const today = ref(null)
  const healthGql = async () => {
		const q = {
			query: `
			{
				healthinfo {
					_account,
          code,
          health,
          temperature,
          remarks,
          data,
          time
				}
			}
		`
		}
		try {
			const res = await Gql(q);
      let arr = res.data.healthinfo;
      today.value = arr.filter((item) => {
        return item.time.includes(moment().format('YYYY-MM-DD')) == true ? item : null
      })
		} catch (error) {
			console.log(error);
		}
	}
	healthGql();



// onMounted(() => {
//   var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//   title: {
//     text: 'Referer of a Website',
//     subtext: 'Fake Data',
//     left: 'center'
//   },
//   tooltip: {
//     trigger: 'item'
//   },
//   legend: {
//     orient: 'vertical',
//     left: 'left'
//   },
//   series: [
//     {
//       name: 'Access From',
//       type: 'pie',
//       radius: '50%',
//       data: [
//         { value: 1048, name: 'Search Engine' },
//         { value: 735, name: 'Direct' },
//         { value: 580, name: 'Email' },
//         { value: 484, name: 'Union Ads' },
//         { value: 300, name: 'Video Ads' }
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)'
//         }
//       }
//     }
//   ]
// };
//   option && myChart.setOption(option);

// })

</script>

<style scoped>

</style>