<template>
  <div>
    <el-form
    ref="loginForm"
    :model="form"
    status-icon
    :rules="rules"
    label-width="auto"
    size="small"
    hide-required-asterisk="true"
    class="shadow-lg font-bold w-80 p-4 flex flex-col bg-white rounded-lg"
  >
    <el-form-item label="用户" prop="user">
      <el-input
        v-model="form.user"
        type="text"
        autocomplete="true"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input
        v-model="form.pwd"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()"
        >登录</el-button
      >
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import { Http } from '@/utils/HttpKit.ts';
import { setCacheVal} from '@/utils/LocalStorageKit.ts';
import { ref, reactive} from 'vue';
import { useRouter} from "vue-router";
import { ElMessage  } from 'element-plus';
import { MD5 } from "crypto-js";
import { Storage} from "@/utils/expire.js"
const router = useRouter();
const loginForm = ref(null);
const form = reactive({
  user: '',
  pwd: ''
})
const rules = reactive({
  user: [ 
    {
      required: true,
      message: '请输入用户',
      trigger: 'blur',
    }
  ],
  pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    }
  ]
})

const submitForm = async () => {
try{
  await loginForm.value.validate();
  const { user, pwd} = form;
  const mUser = MD5(user).toString();
  const mPwd = MD5(pwd).toString();
  console.log(mUser,mPwd)
 
  const res = await Http("/adminLogin",{
    user: mUser,
    pwd: mPwd
  });
  if (res.code === 1) {
    let token = res.data.token;
    const ls = new Storage();
    ls.set("token",res.data.token,24*3600*1000);
    setCacheVal("token",res.data.token);
    setCacheVal("user",res.data.user)
    router.replace({
      path: "/"
    })
  } else {
    ElMessage({
      message: res.msg,
      type: 'warning',
    })
  }
} catch (e) {
  console.log(e);
}
}
const resetForm = () => {
  loginForm.value.resetFields();
}
</script>

<style scoped>

</style>