<template>
  <div class="container">
    <div class="column middle"><slot name="middle"></slot></div>
    <div class="column left"><slot name="left"></slot></div>
    <div class="column right"><slot name="right"></slot></div>
  </div>
    
</template>

<script setup>
import { ref,onMounted} from "vue"



</script>

<style scoped>
.container{
  height: 70px;
  width: 100%;
  position: relative;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}
.column{
  height: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
}
.middle{
  left: 140px;
  right: 180px;
}
.left{
  width: 140px;
  left: 0;
}
.right{
  width: 180px;
  right: 0
}










</style>