<template>
  <div>
    <section style=" background-color:rgb(248,250,252)">
      <div class="w-full  mb-4 mx-auto">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full  max-w-full flex-grow flex-1">
                <h2 class="text-gray-600 font-semibold text-sm">活动列表</h2>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button" @click="dialogVisible = true">导入</button>

                <button
                  class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button" @click="derive">导出</button>
              </div>
            </div>
          </div>
          <el-dialog class="absolute" v-model="dialogVisible" width="60%">
            <upload :on-success="handleSuccess" :before-upload="beforeUpload"></upload>
          </el-dialog>

          <div class="mt-2 block w-full p-4  overflow-x-auto">
            <table v-if="dataMap.tableData.length == 0" id="table" ref="excel" class="items-center bg-transparent w-full  border-collapse rounded-lg">
              <thead class="rounded-lg sticky top-0 left-0">
                <tr>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    活动标题
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    活动分类
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    活动内容
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    计划人数
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    申请人数
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    操作
                  </th>

                </tr>
              </thead>

              <tbody>
                <tr
                  class="hover:bg-slate-300 active:bg-slate-700 cursor-pointer ease-linear transition-all duration-150"
                  v-for="(item,index) in dataList" :key="item.title" @click="dataView(item)">
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {{item.titile}}
                  </th>
                  <td
                    class="flex space-x-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {{item.rank}}
                  </td>
                  <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{item.content}}
                  </td>
                  <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{item.quota}}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{item.applicants}}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div class="flex space-x-2">
                      <div class="iconfont icon-bianji"></div>
                      <div class="iconfont icon-shanchu"></div>
                    </div>
                  </td>
                </tr>
              </tbody>

              

            </table>
            <el-table v-else :data="dataMap.tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
                <el-table-column v-for="item of dataMap.tableHeader" :key="item" :prop="item" :label="item" />
            </el-table>
          </div>
          <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span class="text-xs xs:text-sm text-gray-900">
              - 显示 {{first}} ~ {{last > entries ? entries : last}} 从 <span class="font-bold">{{entries}}</span> 项中 -
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button v-if="first > 1 ? true : false" @click="prev"
                class="iconfont icon-shangyiye text-xs text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
              </button>
              &nbsp; &nbsp;
              <button v-if="entries > last ? true : false" @click="next"
                class="iconfont icon-xiayiye text-xs text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed
  } from 'vue'
  import {
    Http
  } from '@/utils/HttpKit.ts'
  import moment from "moment";
  import _ from "lodash";
  import {
    useRouter
  } from "vue-router"
  import {
    setCacheVal
  } from '@/utils/SessionStorageKit.ts';
  import XLSX from 'xlsx'
  import FileSaver from 'file-saver'
  import Upload from '../components/Upload.vue';
  import {
    ElMessage
  } from 'element-plus';


  const router = useRouter();
  const dataList = ref([]);
  const entries = ref(null);
  const pages = ref(null);
  const dialogVisible = ref(false);

  let x = 0;
  let first = ref(1);
  let last = ref(5);
  const httpData = async () => {
    try {
      const res = await Http("/getdata");
      dataList.value = res.data.slice(x, x + 5);
      entries.value = res.entries;
      pages.value = res.pages;
    } catch (error) {
      console.log(error);
    }
  }
  httpData();
  const next = async () => {
    first.value += 5;
    last.value += 5;
    x += 5;
    await httpData();
  }

  const prev = async () => {
    if (x) {
      x -= 5;
      first.value -= 5;
      last.value -= 5;
      await httpData()
    }
  }

  const dataView = (item) => {
    setCacheVal("query", JSON.stringify(item));
    router.push({
      path: "/dataView",
      query: {
        item: JSON.stringify(item.titile)
      }
    })
  }

  const excel = ref(null);
  const derive = () => {
    const filename = "导出.xlsx";
    const table_div = excel.value;
    const wb = XLSX.utils.table_to_book(document.getElementById("table"));
    const wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })
    try {
      FileSaver.saveAs(new Blob([wbout], {
        type: 'application/octet-stream'
      }), filename)
    } catch (error) {
      console.log(error)
    }
    return wbout;
  }

  const beforeUpload = (file) => {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (isLt1M) {
      return true
    }
    ElMessage.warning('请上传容量1M内的表格')
    return false
  }

  const form = ref(null)
  const dataMap = reactive({
    tableData: [],
    tableHeader: []
  })
  const handleSuccess = ({ results, header }) => {
    dataMap.tableData = results
    dataMap.tableHeader = header
    dialogVisible.value = false
  }
</script>

<style scoped>
  thead th {
    background-color: rgb(248, 250, 252)
  }
</style>