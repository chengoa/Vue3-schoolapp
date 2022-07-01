<script setup>
 
</script>

<template>
  <router-view #="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
  
</template>

<style>
 
</style>