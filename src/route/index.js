import { createRouter, createWebHashHistory } from "vue-router";

const home = () =>
    import ("../components/com")
const login = () =>
    import ("../components/login")
const about = () =>
    import ("../components/about")
const Home = () =>
    import ("../pages/Home")
const Login = () =>
    import ("../pages/Login")
const Me = () =>
    import ("../pages/Me")
const Chat = () =>
    import ("../pages/Chat")
const PostDetail = () =>
    import ("../pages/PostDetail")
const OrderDetail = () =>
    import ("../pages/OrderDetail")
const CommoditySearch = () =>
    import ("../pages/CommoditySearch")
const CommodityDetail = () =>
    import ("../pages/CommodityDetail")
const EditInfo = () =>
    import ("../pages/EditInfo")
const MyOrders = () =>
    import ("../pages/MyOrders")
const Others = () =>
    import ("../pages/Others")
const likes = () =>
    import ("../pages/likes")
const ShoppingCart = () =>
    import ("../pages/ShoppingCart")

const routes = [{
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
        path: "/Others",
        name: "Others",
        component: Others
    },
    {
        path: "/likes",
        name: "likes",
        component: likes
    },
    {
        path: "/ShoppingCart",
        name: "ShoppingCart",
        component: ShoppingCart
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})