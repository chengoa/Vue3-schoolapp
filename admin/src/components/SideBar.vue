<template>
<div>
  <el-menu
    @open="handleOpen"
    @close="handleClose"
    background-color="rgb(248,250,252)"
    router
  >
    <el-menu-item index="/users">
      <template #title>
        <div class="font-semibold text-xs flex space-x-2">
          <div class="iconfont icon-yonghuguanli_huaban"></div>
          <div>用户管理</div>
        </div>
      </template>
    </el-menu-item>
    <el-menu-item index="/data">
      <template #title>
        <div class="font-semibold text-xs flex space-x-2">
          <div class="iconfont icon-shuju"></div>
          <div>活动管理</div>
        </div>
      </template>
    </el-menu-item>
  
    <el-menu-item index="/message">
      <template #title>
        <div class="font-semibold text-xs flex space-x-2">
          <div class="iconfont icon-xiaoxi1"></div>
          <div>内容管理</div>
        </div>
      </template>
    </el-menu-item>
        <el-menu-item index="/health">
      <template #title>
        <div class="font-semibold text-xs flex space-x-2">
          <div class="iconfont icon-kouzhao"></div>
          <div>健康管理</div>
        </div>
      </template>
    </el-menu-item>
  
    <el-sub-menu>
      <template #title>
        <div class="font-semibold text-xs flex space-x-2">
          <div class="iconfont icon-shuju"></div>
          <div>文件管理</div>
        </div>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/file">文件</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/file">文件</el-menu-item>
      </el-menu-item-group>
     
    </el-sub-menu>
  </el-menu>
</div>
</template>
<script setup>

</script>
<style scoped>

</style>