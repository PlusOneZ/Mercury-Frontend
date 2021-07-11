import { createRouter,createWebHashHistory } from "vue-router";

const home = () => import("../components/com")
const login = () => import("../components/login")
const about = () => import("../components/about")
const Home = () => import("../pages/Home")
const Login = () => import("../pages/Login")

const routes = [
    {
        path: "/home",
        name: "home",
        component: home
    },
    {
        path: "/login",
        name: "login",
        component: login
    },
    {
        path: "/about",
        name: 'about',
        component: about
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    },
    {
        path: "/",
        name: "HomePage",
        component: Home
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
