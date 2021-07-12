import { createApp } from 'vue'
import './assets/css/tailwind.css'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { router } from './route'

import App from "./App";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.mount('#app')