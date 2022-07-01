<template>
  <div>
    <nut-navbar @on-click-back="back" title="个人设置" class="font-bold"></nut-navbar>
    <div>
      <nut-cell-group>
        <nut-cell title="头像">
          <template v-slot:link>
            <nut-uploader @success="handleChange" :data="data" :url="actionpath"></nut-uploader>
          </template>
        </nut-cell>
        <nut-cell title="姓名" :desc="info.name"></nut-cell>
        <nut-cell title="昵称">
          <template v-slot:link>
            <input type="text" v-model="info.nickname" class="border-none text-right">
          </template>
        </nut-cell>
      </nut-cell-group>
    </div>
  </div>
</template>

<script setup>
import { getCacheVal,setCacheVal, clearItem } from '@/utils/LocalStorageKit.ts'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';
import { baseURL, imgURL } from '@/utils/request.js';

const router = useRouter();
const store = useStore();

const actionpath = baseURL + "/api/uploadavatar";
const data = reactive({
  account:getCacheVal("account")
})

const back = () => {
  router.go(-1)
}

const info = ref(null);

const init_user = () => {
  const userInfo = JSON.parse(getCacheVal("userInfo"));
  info.value = {...userInfo}
}

init_user()
const avatar = ref(null)
const alterAvatar = async() => await store.dispatch("user/alterAvatar")

const handleChange = ({responseText}) => {
  const response = JSON.parse(responseText); 
  if(response.code === 1){
      avatar.value = imgURL + response.data.avatar;
      setCacheVal("avatar",avatar.value)
  }else{
      return -1
  }
}
</script>

<style scoped>

</style>