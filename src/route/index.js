import {createRouter, createWebHashHistory} from "vue-router";
import {CookieManager} from "@/cookie";
import {api} from "@/request";

const Home = () =>
    import ("../pages/Home")
const CommoditySearch = () =>
    import ("../pages/CommoditySearch")
const CommodityDetail = () =>
    import ("../pages/CommodityDetail")

const Login = () =>
    import ("../pages/Login")
const LoginPanel = () =>
    import ("../components/LoginPage/LoginPanel")
const RegisterPanel = () =>
    import ("../components/LoginPage/RegisterPanel")

const Me = () =>
    import ("../pages/Me")
const EditInfo = () =>
    import ("../pages/EditInfo")
const MyRelease = () =>
    import ("../pages/MyRelease")
const MyOrders = () =>
    import ("../pages/MyOrders")
const OrderDetail = () =>
    import ("../pages/OrderDetail")

const Chat = () =>
    import ("../pages/Chat")

const Posts = () =>
    import ("../pages/Posts")
const PostDetail = () =>
    import ("../pages/PostDetail")
const PostEdit = () =>
    import ("../pages/PostEdit")

const Others = () =>
    import ("../pages/Others")
const likes = () =>
    import ("../pages/likes")
const ShoppingCart = () =>
    import ("../pages/ShoppingCart")


function loginGuard(to, from, next) {
    console.log("from", from, "to", to)
    let token = CookieManager.get("token")
    console.log(token)
    let formData = new FormData()
    formData.append("token", token)
    if (token) {
        api({
            method: "POST",
            url: "user/autoLogin",
            data: formData
        }).then((response) => {
            console.log("autoLogin", response)
            if (response.data['Code'] === '200') {
                next()
            } else {
                if (from.fullPath === '/login') {
                    next()
                }
                next({name: "LoginPanel", params: {next: to.fullPath}})
            }
        }, error => {
            console.log(error)
            next({name: "LoginPanel", params: {next: to.fullPath}})
        })
    }
}

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        children: [
            {
                path: "",
                name: "LoginPanel",
                component: LoginPanel,
                props: true
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
        beforeEnter: loginGuard
    },
    {
        path: "/editInfo",
        name: "editPersonalInfo",
        component: EditInfo,
        beforeEnter: loginGuard
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat,
        beforeEnter: loginGuard
    },
    {
        path: "/orderDetail",
        name: "OrderDetail",
        component: OrderDetail,
        beforeEnter: loginGuard
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
        component: MyOrders,
        beforeEnter: loginGuard
    },
    {
        path: "/Others",
        name: "Others",
        component: Others
    },
    {
        path: "/likes",
        name: "likes",
        component: likes,
        beforeEnter: loginGuard
    },
    {
        path: "/ShoppingCart",
        name: "ShoppingCart",
        component: ShoppingCart,
        beforeEnter: loginGuard
    },
    {
        path: "/posts",
        name: "Posts",
        component: Posts
    },
    {
        path: "/myRelease",
        name: "myRelease",
        component: MyRelease,
        beforeEnter: loginGuard
    },
    {
        path: "/postEdit",
        name: "PostEdit",
        component: PostEdit,
        beforeEnter: loginGuard
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})