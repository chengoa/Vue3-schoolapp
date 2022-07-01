<template>
  <div class="p-20 h-screen w-screen flex flex-col md:flex-row items-center justify-center bg-gray-200">
    <div class="content flex flex-col items-center mb-8 md:text-left">
      <div class="md:w-3/5 w-2/3">
        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/CTA.png" alt="cartoon avatars">
      </div>
      <div class="text-3xl text-blue-500 font-bold mb-8">校园管理</div>
    </div>
    <div class="container mx-auto flex flex-col items-center md:ml-20">
      <login-form />
      <p class="text-center text-sm my-4">
        <span class="font-semibold text-center w-full">用户身份</span> 请联系管理员获取
      </p>
    </div>
  </div>
</template>

<script setup>
  import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>

</style>