import Deliver from "../components/delivers/deliver";
import Search from "../components/searchs/search"
import Order from "../components/orders/order"
import Aboutmy from "../components/aboutmy/aboutmy";
import MoreInfo from "../components/delivers/moreinfo/more_info";
import Collection from '../components/aboutmy/mycollection/collection'
import MyPoint from "../components/aboutmy/pointnum/myPoint";
import ForVip from "../components/aboutmy/forVip/forVip";
import ForClient from "../components/aboutmy/theServer/forClient";
import Login from "../components/aboutmy/login/login"
import LoginPwd from "../components/aboutmy/login_pwd/loginPwd";
import Retrieve from "../components/aboutmy/forgetPwd/retrievePwd"
import Register from "../components/aboutmy/register/register";
import Help from "../components/aboutmy/help/help";
import RegQQ from "../components/aboutmy/register/reg_qq/regWithQQ";
import RegVX from "../components/aboutmy/register/reg_vx/regVX";
//import RegTel from "../components/aboutmy/register/reg_tel/regTel";
import Setting from "../components/aboutmy/setting/setting";
import Message from "../components/aboutmy/message/message";
import NotFind from "../components/notFind/notFind";
import ToLogin from "../components/aboutmy/needLog/toLogin";
import GetCountry from "../components/getCountry/getCountry";
import GetPocket from "../components/getPocket/getPocket";
import OrderDetail from "../components/orderDetail/orderDetail";
import Confirm from "../components/confirm_order/confirm";
import Turntable from "../components/game/turntable/turntable";
import Scratch from "../components/game/scratch/scratch";
import Turncard from "../components/game/turncards/turncard";
import PacketRain from "../components/game/packet_rain/packet_rain";

const routes = [
    {
        path: '/delivers/:aid',
        component: Deliver,
    },
    {
        path:'/getpocket',
        component:GetPocket
    },
    {
        path:'/game/turntable',
        component:Turntable
    },
    {
        path:'/game/scratch',
        component:Scratch
    },
    {
        path:'/game/turncard',
        component:Turncard
    },
    {
        path:'/game/packet_rain',
        component:PacketRain
    },
    {
        path: '/moreInfo',
        component: MoreInfo
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/orders',
        component: Order
    },
    {
        path:'/orderDetail',
        component:OrderDetail
    },
    {
        path:'/confirm',
        component:Confirm
    },
    {
        path: '/aboutmy',
        component: Aboutmy,

    },
    {
        path: '/getAddress',
        component:GetCountry,
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        path: '/message',
        component: Message
    },
    {
        path: '/mycollection',
        component: Collection
    },
    {
        path: '/mypoint',
        component: MyPoint
    },
    {
        path: '/forvip',
        component: ForVip
    },
    {
        path: '/forclients',
        component: ForClient
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/toLogin',
        component: ToLogin
    },
    {
        path: '/login_pwd',
        component: LoginPwd
    },
    {
        path: '/forgetPwd',
        component: Retrieve
    },
    {
        path: '/register',
        component: Register,
        routes: [
            {
                path: '/regWithQQ',
                component: RegQQ
            },
            {
                path: '/regWithVX',
                component: RegVX
            }

        ]
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '/notfind',
        component: NotFind
    }

]

export default routes
