<template>
    <div>
        <nut-navbar v-if="fixed" @on-click-back="back" title="活动兴趣"></nut-navbar>
        <scroll class="content" :probeType="3" :pull-up-load="true" @scroll="fixedActive">
            <nut-swiper :pagination-visible="true" height="200" pagination-color="#426543" auto-play="3000">
                <nut-swiper-item class="rounded-b-2xl" v-for="(item,index) in activitydata" :key="item">
                    <el-image class="rounded-b-2xl" :src="item.img" fit="fill" />
                </nut-swiper-item>
            </nut-swiper>
            <nut-tabs v-model="state.tabValue" size="large" background="#fff">
                <nut-tabpane class="bg-stone-100" title="活动">
                    <section class="text-gray-600 body-font">
                        <div class="container mx-auto">
                            <div class="flex flex-wrap justify-center">
                                <div class="p-4 w-full mb-2 divide-solid" v-for="(item,index) in activitydata"
                                    :key="item.content">

                                    <div :style="{'backgroundcolor':item.bg}"
                                        class="relative rounded-lg mb-6 flex flex-col relative overflow-hidden shadow-xl">
                                        <span
                                            class="bg-indigo-500 z-10 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                            {{item.rank}}
                                            {{item.deadline}}

                                        </span>


                                        <el-image class="h-48 2/3" :src="item.img">

                                        </el-image>
                                        <div class="text-xl italic text-white font-black z-20 absolute top-6 left-4">
                                            {{item.titile}}</div>


                                        <div class="p-4 flex rounded-lg items-center text-sm text-gray-900">
                                            <p>
                                                {{item.content}}
                                            </p>
                                        </div>
                                    </div>
                                    <nut-progress :percentage="percentage(index)"
                                        stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
                                        status="active" />
                                    <button
                                        class="flex items-center justify-center mt-4 text-white text-sm font-semibold bg-red-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-red-400 rounded-xl shadow-xl"
                                        v-if="join == false" @click="join_btn(index)">
                                        参加
                                    </button>
                                    <button
                                        class="flex items-center justify-center mt-4 text-white text-sm tracking-wide text-white bg-red-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-red-600 rounded-xl shadow-xl"
                                        v-else @click="cancel_btn(index)">
                                        取消参加
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </nut-tabpane>
                <nut-tabpane title="我的参与">
                    <!-- component -->
                    <!-- This is an example component -->
                    <div>
                        <div v-if="joinval == null"></div>
                        <div v-for="item in joinval" class="flex justify-center p-2">
                            <div
                                class="grid divide-y grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-2">
                                <div class="col-span-2 sm:col-span-1 xl:col-span-1">
                                    <img :src="item.img"
                                        class="h-24 w-24 rounded  mx-auto" />
                                </div>
                                <div class="col-span-4 sm:col-span-4 xl:col-span-4">
                                    <h3 class="font-semibold text-gray-600 w-36 text-ellipsis overflow-hidden"> {{item.activity}} </h3>
                                    <p class="text-gray-600 text-xs mt-2">
                                        <div class="flex items-center space-x-1"><nut-icon size="12" color="blue" name="clock"></nut-icon><span class="font-medium">活动时间：</span> {{item.deadline}}</div>
                                    </p>
                                    <p class="text-gray-600 text-xs mt-1">
                                        <div class="flex items-center space-x-1"><nut-icon size="12" color="blue" name="success"></nut-icon><span class="font-medium">报名时间：</span> {{dayjs(item.date).format('YYYY-MM-DD hh:mm:ss')}} </div>
                                    </p>
                                    <p class="text-gray-600 text-xs mt-1">
                                        <div class="flex items-center space-x-1"><nut-icon size="12" color="blue" name="date"></nut-icon><span class="font-medium">距今时间：</span> {{dayjs().to(dayjs(item.deadline))}} </div>
                                    </p>
                                </div>
                                <!-- <div class="col-span-1 sm:col-span-1 xl:col-span-1 text-ellipsis overflow-hidden"> 
                                    <h3 class="font-semibold text-gray-600 "> 距今 </h3>

                                    <span class="italic mt-2 text-xs">{{dayjs().to(dayjs(item.deadline))}} </span>
                                </div> -->

                            </div>
                        </div>
                    </div>
                </nut-tabpane>
            </nut-tabs>



        </scroll>
    </div>
</template>

<script setup>
    import {
        useRouter
    } from 'vue-router';
    import Scroll from '@/components/scroll/Scroll.vue'
    import {
        reactive,
        ref,
        computed
    } from 'vue';
    import {
        Http,
        Gql
    } from "@/utils/request.js";
    import {
        getCacheVal,
        clearItem
    } from '@/utils/LocalStorageKit.ts'
    import {
        Notify
    } from '@nutui/nutui';
    import dayjs from 'dayjs'


    const router = useRouter();
    const back = () => router.replace("/")

    const state = reactive({
        tabValue: '0'
    })

    const fixed = ref(false)
    const fixedActive = (Y) => {
        -Y >= 66 ? fixed.value = true : fixed.value = false
    }

    const activitydata = ref(null);
    const activityGql = async () => {
        const q = {
            query: `
            {
                activity{
                    rank
                    titile
                    img
                    content
                    quota
                    applicants
                    deadline
                }
            }
            `
        }
        try {
            const res = await Gql(q);
            activitydata.value = res.data.activity
        } catch (e) {
            console.log(e)
        }
    }
    activityGql()
    const percentage = computed(() => {
        return (index) => {
            return ((activitydata.value[index].applicants / activitydata.value[index].quota) * 100).toFixed(
                2)
        }
    })

    const joinval = ref(null)
    const joinGql = async () => {
        const account = getCacheVal("account");

        const q = {
            query: `
            {
                joinactivity(account: "${account}"){
                    activities{
                        activity,
                        img,
                        deadline,
                        date
                    }
                }
            }
            `
        }
        try {
            const res = await Gql(q);
            joinval.value = res.data.joinactivity.activities;
        } catch (e) {
            console.log(e)
        }
    }
    joinGql()

    const join = ref(false);
    const account = getCacheVal("account");

    const join_btn = async (index) => {
        join.value = !join.value;
        if (activitydata.value[index].applicants <= activitydata.value[index].quota) {
            activitydata.value[index].applicants += 1
        }
        try {
            const account = getCacheVal("account");
            const activity = activitydata.value[index].titile;
            const img = activitydata.value[index].img;
            const deadline = activitydata.value[index].deadline;
            const date = new Date();
            const res = await Http("/activityinsert", {
                account,
                activity,
                img,
                deadline,
                date
            })
            if (res.code == "1") {
                Notify.text("报名成功", {
                    color: '#ad0000',
                    background: '#ffe1e1'
                });
            }
            joinGql()
        } catch (error) {
            console.log(error)
        }
    }
    const cancel_btn = async (index) => {
        join.value = !join.value
        if (activitydata.value[index].applicants <= activitydata.value[index].quota) {
            activitydata.value[index].applicants -= 1;
            try {
                const account = getCacheVal("account");
                const activity = activitydata.value[index].titile;
                console.log(activity)
                const res = await Http("/activitydel", {
                    account,
                    activity
                })
                if (res.code == "1") {
                    Notify.text("取消成功", {
                        color: '#ad0000',
                        background: '#ffe1e1'
                    });
                }
                joinGql()
            } catch (error) {
                console.log(error)
            }

        }

    }
</script>

<style scoped>
    .content {
        height: calc(100vh - 44px);

    }

    .nut-navbar {
        margin-bottom: 0px !important
    }

    .countdown-part-box {
        display: flex;
        align-items: center;
    }

    .part-item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 25px;
        background: #e8220e;
        color: #fff;
        font-size: 14px;
        border-radius: 6px;
    }

    .part-item-symbol {
        margin: 0 5px;
    }
</style>