import {createApp} from 'vue'
import './assets/css/tailwind.css'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn' //中文
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import {router} from './route'

import App from "@/App";
import store from './store'

const app = createApp(App)
app.use(ElementPlus, {locale})
app.use(router)
app.use(store)

app.mount('#app')


