<template>
  <div class="w-full">
    <div class="antialiased text-gray-500 bg-white">
      <div class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500">
        <div class="x-auto">
          <div class="p-2 box-border border-b border-gray-900/10">
            <div class="relative flex items-center">
              <div class="flex flex-col items-center text-base font-bold text-black">
                <div class="cursor-pointer " @click="router.replace('/')">校园管理</div>
                <div class="tracking-[.3em]"></div>
              </div>
              <div class="cursor-pointer ml-4 font-bold block lg:hidden">
                <div class="iconfont icon-caidan"></div>
              </div>
              <nav class="flex ml-auto text-xs font-semibold text-gray-700 leading-6">
                <button class="iconfont icon-sousuo mr-4 w-7 h-7 hover:bg-slate-200 rounded-full"></button>
                <ul class="flex items-center space-x-6">
                  <li><a href="" class="hover:text-sky-500">文件</a></li>
                  <li><a href="" class="hover:text-sky-500">部门</a></li>
                </ul>
              </nav>
              <div class="ml-4 text-sm text-gray-300">|</div>
              <div class="flex space-x-4 ml-4 text-xs">
                <el-badge :hidden="isBadge" is-dot>
                  <div class="iconfont icon-xiaoxi text-xl font-semibold text-gray-700 hover:text-sky-500"></div>
                </el-badge>
                <el-avatar size="small" class="cursor-pointer hover:bg-slate-200" @click="drawer = true"> user
                </el-avatar>
                <div class="bg-slate-50">
                  <el-drawer v-model="drawer" :direction="direction" :append-to-body="true"
                    :modal-append-to-body="false" size="25%">
                    <template #title>
                      <div class="font-bold iconfont icon-wode-wode">
                      </div>
                    </template>
                    <span>Hi, there!</span>
                    <div
                      class="text-sm absolute inset-x-1/4 bottom-8 w-3/5 h-10 bg-black flex items-center justify-center space-x-2 text-white cursor-pointer"
                      @click="loginOut">
                      <div class="iconfont icon-dengchu font-blod text-2xl"></div>
                      <div>退出登录</div>
                    </div>
                    <el-dialog center="true" v-model="dialogVisible" width="30%" :before-close="handleClose">
                        <div class="text-sm text-black font-bold tracking-wide ml-28">您确定退出登录吗？</div>
                      <template #title>
                        <div class="iconfont icon-dengchu m-auto text-5xl"> </div>
                      </template>
                      <template #footer>
                        <div class="flex justify-center space-x-8">
                          <el-button class="font-bold text-sm text-white  px-2 py-2  rounded-md tracking-wider cursor-pointer" @click="dialogVisible = false">取消</el-button>
                          <el-button class="font-bold text-sm text-white  px-2 py-2  rounded-md tracking-wider cursor-pointer" @click="confirmOut">确定</el-button>
                        </div>
                      </template>
                    </el-dialog>
                  </el-drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden lg:block fixed z-20 bg-slate-50 inset-0 top-[3.735rem] left-[max(0px,calc(50%-45rem))] right-auto overflow-y-scroll w-[15rem] px-2">
        <div class="sticky top-1 z-40 my-6">
          <div>
            <button @click="dialogTableVisible = true"
              class="border rounded-lg border-solid w-full bg-white flex items-center justify-center">
              <font class="iconfont icon-sousuo mr-1"></font>
              <span class="text-xs">快速查找...</span>
            </button>
          </div>
        </div>
        <side-bar />
      </div>

      <el-dialog v-model="dialogTableVisible">
        <template #title>
          <div class="mr-6 -mt-1 m-auto border-white">
            <el-input size="small" class="block rounded-md" @input="searchMember" v-model="input"
              style="background-color:rgb(248,250,252)" type="text" name="" id="" placeholder="查找成员...">
            </el-input>
          </div>
        </template>
  
      </el-dialog>

      <div class="w-[100%-15rem] px-2 py-4 border-box h-[calc(100vh-65px)] lg:pl-[15rem]  -z-50">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ElMessageBox
  } from 'element-plus';
  import SideBar from '@/components/SideBar.vue';
  import {
    clearItem
  } from '@/utils/LocalStorageKit.ts'
  import {
    ref,
    computed
  } from 'vue';
  import {
    useRouter
  } from "vue-router";

  const router = useRouter();
  const drawer = ref(false);
  const dialogVisible = ref(false);
  const dialogTableVisible = ref(false)

  const isBadge = ref(true)

  // const isHidden = computed(() => {
  //   return hidden
  // })
  const loginOut = () => {
    dialogVisible.value = "true";
  }
  const confirmOut = () => {
    clearItem("token");
    router.replace("/login")
  }
</script>

<style scoped>
.hidden{
  display: Hidden
}
</style>