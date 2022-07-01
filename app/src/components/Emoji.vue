<template>

  <div>
    <div class="h-60  overflow-y-scroll overflow-hidden flex gap-1 flex-wrap justify-between items-center mt-2"
      >
      <div>
        <span v-for="(emoji, ind) in emojiList" :key="'emoji' + ind"
          class="text-2xl cursor-pointer px-2 rounded-lg hover:bg-indigo-50"
          @click="setEmoji(emoji)">
          {{ emoji }}
        </span>
      </div>
    </div>

  </div>


</template>
<script setup>
  import Scroll from "@/components/scroll/Scroll.vue"
  import {
    reactive,
    ref
  } from 'vue'
  import emojiList from '@/assets/emoji.json'

  const emit = defineEmits(['create'])
     
  const setEmoji = (emoji) => {
    emit('create', emoji)
  }
     
  
</script>
<style scoped>
  .content {
    height: 100vh;

  }
</style>