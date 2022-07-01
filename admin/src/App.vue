<script setup>



</script>

<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component class="animate__animated animate__fadeInLeft animate__delay-2s" :is="Component" />
    </transition>
  </router-view>
</template>

<style>

</style>
