import {createApp} from 'vue'
import App from './App.vue'
import Index from './Index.vue'
import './assets/tailwind.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createRouter, createWebHistory } from 'vue-router'


const app = createApp({});

app.component("index", App)
app.component("home", Index)

const home = app.component('index')
const index = app.component('home')

const routes = [
    { path: '/', component: home },
    { path: '/home', component: index },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

app.use(router)
app.use(Antd);
app.mount('#app');
