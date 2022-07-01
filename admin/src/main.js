import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from "lodash";


import 'normalize.css';
import '@/assets/iconfont.css'
import 'element-plus/dist/index.css'
import './index.css'
import 'animate.css';

const app = createApp(App);



app.use(router);
app.use(store);
app.mount('#app')


