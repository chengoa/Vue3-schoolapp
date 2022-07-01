<template>
  <div>


      <div
        class="
          flex flex-col
          bg-gradient-to-r from-indigo-500 to-indigo-700
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          h-screen
          max-w-md
        "
      >
           <div>
                        <div class="flex flex-wrap items-center md:flex-row flex-col-reverse">
                            <div class="w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4">
                               
                                <button role="button" aria-label="Join the community" class="mt-2 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-indigo-700 rounded-lg text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none">校园应用 欢迎页</button>
                             <div >
                                    <h1 role="heading" class="text-sm mt-2 text-white font-black leading-6 lg:leading-10 text-center"> 输入您的账号密码以访问账户</h1>
                                </div>
                            </div>
                            <div class="md:w-1/3 w-2/3">
                               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/CTA.png" alt="cartoon avatars">
                            </div>
                        </div>
                    </div>
        <div class="mt-2 w-3/5 m-auto">
          <div ref="loginForm">
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-white"
                >账号:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                 
                  <nut-icon name="people" class="text-blue-500"></nut-icon>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="form.account"
                  class="
                    text-sm
                    placeholder-indigo-700
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="输入账号"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                >密码:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span>
                    <nut-icon name="marshalling" class="text-blue-500"></nut-icon>

                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  v-model="form.password"
                  class="
                    text-sm
                    placeholder-indigo-700
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="输入密码"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-indigo-700
                  text-sm
                  bg-white
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                @click="submit"
              >
                <span class="mr-2 uppercase">登录</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span class="ml-2"
            >没有账号？
            <a
              href="#"
              class="text-xs ml-2 text-blue-500 font-semibold"
              >注册一个账号</a
            ></span
          >
        </a>
      </div> -->
  </div>
</template>

<script setup>
import { Http } from '@/utils/request.js'
import { setCacheVal} from '@/utils/LocalStorageKit.ts';
import { useRouter} from "vue-router";
import { MD5 } from "crypto-js";
import { ref,reactive } from 'vue';
import { useStore } from 'vuex'

const router = useRouter();
const store = useStore();

const loginForm = ref(null);
const form = reactive({
  account: '',
  password: ''
})
const submit = async () => {
try{
  // await loginForm.value.validate();
  const { account, password} = form;
  const mUser = MD5(account).toString();
  const mPwd = MD5(password).toString();
  const res = await Http("/Login",{
    account: mUser,
    password: mPwd
  });
  if (res.code === 1) {
    setCacheVal("account",res.data.account);
    setCacheVal("_account",res.data._account);
    store.commit("user/saveUser",res.data.user);
    setCacheVal("avatar",res.data.avatar);
    store.commit("user/setAvatar",res.data.avatar);
    setCacheVal("userInfo",JSON.stringify(res.data.user));
    router.replace({
      path: "/"
    })
  } else {
    ElMessage({
      message: res.msg,
      type: 'warning',
    })
    // Notify.danger(res.msg);
  }
} catch (e) {
  console.log(e);
}
}


</script>

<style scoped>

</style>