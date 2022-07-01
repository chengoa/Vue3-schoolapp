import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';

import { Tabbar,TabbarItem,Navbar,Icon,Avatar,NoticeBar,Tabs,TabPane,SearchBar,Badge,Popup,OverLay,Notify,Cell, CellGroup,Uploader,Input,Calendar, Picker , Radio,RadioGroup, TextArea,Progress,CountDown,Swiper,SwiperItem,BackTop,Video,Barrage,Swipe ,Button} from '@nutui/nutui';


import 'normalize.css';
import 'animate.css';
import './index.css';
import "@nutui/nutui/dist/style.css";

import '@/assets/iconfont/iconfont.css';
import '@/assets/font/iconfont.css';


import dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/zh-cn' // import locale
import  relativeTime  from 'dayjs/plugin/relativeTime';
dayjs.extend(isLeapYear) // use plugin
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)



const app = createApp(App);





app.use(router);
app.use(store);

app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(Navbar);
app.use(Avatar);
app.use(NoticeBar);
app.use(Tabs);
app.use(TabPane);
app.use(SearchBar);
app.use(Badge);
app.use(Popup);
app.use(OverLay);
app.use(Notify);
app.use(Cell);
app.use(CellGroup);
app.use(Uploader);
app.use(Input);
app.use(Calendar);
app.use( Picker);
app.use( Radio);
app.use(RadioGroup);
app.use(TextArea )
app.use(Progress)
app.use(CountDown)
app.use(Swiper).use(SwiperItem);
app.use(BackTop)
app.use(Video)
app.use(Barrage)
app.use(Swipe)
app.use(Button)





app.mount('#app')
