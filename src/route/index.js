import { createRouter,createWebHashHistory } from "vue-router";

const Home = () => import("../pages/Home")
const Login = () => import("../pages/Login")
const LoginPanel = () => import("../components/LoginPage/LoginPanel")
const RegisterPanel = () => import("../components/LoginPage/RegisterPanel")

const Me = () => import("../pages/Me")
const Chat = () => import("../pages/Chat")
const PostDetail = () => import("../pages/PostDetail")
const OrderDetail = () => import("../pages/OrderDetail")
const CommoditySearch = () => import("../pages/CommoditySearch")
const CommodityDetail = () =>import("../pages/CommodityDetail")
const EditInfo = () => import("../pages/EditInfo")
const MyOrders = () => import("../pages/MyOrders")
const Posts = () => import("../pages/Posts")
const MyRelease = () => import("../pages/MyRelease")


const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        children: [
            {
                path: "",
                name: "LoginPanel",
                component: LoginPanel,
            },
            {
                path: "register",
                name: "RegisterPanel",
                component: RegisterPanel,
            }
        ]
    },
    {
        path: "/",
        name: "HomePage",
        component: Home
    },
    {
        path: "/me",
        name: "me",
        component: Me,
    },
    {
        path: "/editInfo",
        name: "editPersonalInfo",
        component: EditInfo
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat
    },
    {
        path: "/orderDetail",
        name: "OrderDetail",
        component: OrderDetail
    },
    {
        path: "/postDetail",
        name: "PostDetail",
        component: PostDetail
    },
    {
        path: "/CommoditySearch",
        name: "CommoditySearch",
        component: CommoditySearch
    },
    {
        path: "/CommodityDetail",
        name: "CommodityDetail",
        component: CommodityDetail
    },
    {
        path: "/myOrders",
        name: "myOrders",
        component: MyOrders
    },
    {
        path: "/posts",
        name: "Posts",
        component: Posts
    },
    {
        path: "/myRelease",
        name: "myRelease",
        component: MyRelease
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
