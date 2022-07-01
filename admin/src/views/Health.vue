<template>
  <div>
    <!-- component -->
 <section class="py-1 bg-blueGray-50">
 <div class="w-full px-4 mx-auto">
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
      <div class="rounded-t mb-0 px-4 py-3 border-0" style=" background-color:rgb(248,250,252)">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h1 class="font-semibold text-sm text-blueGray-700">
              申请管理
            </h1>
          </div>
          
        </div>
      </div>
      
      <div class="block w-full overflow-x-auto">
        <table class="items-center w-full border-collapse text-blueGray-700  ">
          <thead class="thead-light " style=" background-color:rgb(248,250,252)">
            <tr>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                账号
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               提交时间
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               事因
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               时长
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               目的地
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               联系
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               状态
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in apply">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {{item._account}}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {{item.time}}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {{item.reason}}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {{item.duration}}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {{item.destination}}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {{item.contact}}&nbsp;{{item.num}}
              </td>
               <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                <span class="text-gray p-1 rounded-lg" :class="bg(item.status)">{{text(item.status)}}</span>
              </td>
              <td class="border-t-0 flex space-x-2 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div @click="aggree(item.reason)" class="text-xs cursor-pointer">
                  同意
                </div>
                 <div  @click="disaggree(item.reason)" class="text-xs cursor-pointer">
                  不同意
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script setup>
import { Gql, Http } from '@/utils/HttpKit';
import { computed, ref, watch } from 'vue';
import moment from 'moment'
	import {
		ElMessage
	} from 'element-plus'

const apply = ref([])
const status = ref(null)
	const applyGql = async () => {
		const q = {
			query: `
			{
				apply {
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
      apply.value = res.data.apply;
      status.value = res.data.apply.status

		} catch (error) {
			console.log(error);
		}
	}
	applyGql();
  const text = computed(() => {
    return(item) => {
      return item == 0 ? '申请中' : '未同意'
    }
  })
    const bg = computed(() => {
    return(item) => {
      return item == 0 ? 'bg-blue-200' : 'bg-red-200'
    }
  })

  const aggree = async (id) => {
    status.value = 1;
    const res = await Http("/updataapply",{
      id:id,
      status:status.value
    })
    if(res.code == 1){
      ElMessage({
        message: res.msg,
        type: 'info',
        center: "true",
        offset: 50
      })
    }else{
      ElMessage({
        message: res.msg,
        type: 'info',
        center: "true",
        offset: 50
      })
    }
    applyGql();
    
  }
  const disaggree = async (id) => {
    status.value = -1;
    const res = await Http("/updataapply",{
      id:id,
      status:status.value
    })
    if(res.code == 1){
      ElMessage({
        message: res.msg,
        type: 'info',
        center: "true",
        offset: 50
      })
    }else{
      ElMessage({
        message: res.msg,
        type: 'info',
        center: "true",
        offset: 50
      })
    }
    applyGql();
  }
  watch(status,(cur) => {
    status.value = cur
  })
</script>

<style scoped>

</style>