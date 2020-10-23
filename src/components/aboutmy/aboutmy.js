import React, {Component} from 'react';
import connector from "../../utils/connect"
import getCookie from "../../utils/get_cookie"

import {
    NavLink
} from "react-router-dom"

import './aboutmy.css'

class Aboutmy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            nickname:''
        }
    }

    render() {
        return (
            <div className={'about_container'}>
                {getCookie('isLogin') && <div className="set_mes">
                    <NavLink to={'/setting'}><span></span></NavLink>
                    <NavLink to={'/message'}><span></span></NavLink>
                </div>}
                <div className="userInfo">
                    {
                        getCookie('isLogin')?(<NavLink to={'/userInfo'}>{this.state.nickname+',欢迎您!'}</NavLink>):(<NavLink to={'/login_pwd'}>立即登录</NavLink>)
                    }
                </div>

                <span className="signIn">
                    <span></span>
                    <span>签到领10元红包</span>
                </span>
                <div className="superVip">
                    <div className="super">
                        <span></span>
                        <span>超级会员</span>
                    </div>
                    <span>开通后,每月领超过20元红包</span>
                </div>
                <div className="coupon">
                    <ul className="couponList">
                        <li className="linkdata">
                            <span>红包卡券</span>
                            <span>￥100</span>
                        </li>
                        <li className="linkdata">
                            <span>积分</span>
                            <span>100分 可用</span>
                        </li>
                        <li className="linkdata">
                            <span>钱包</span>
                            <span>99.99</span>
                        </li>
                    </ul>
                </div>
                <div className="relList">
                    <NavLink to={getCookie('isLogin')?'/mycollection':'/login_pwd'}>
                        <div className={'collections'}>
                            <span></span>
                            <div>
                                <span>我的收藏</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={getCookie('isLogin')?'/mypoint':'/login_pwd'}>
                        <div className={'the_point'}>
                            <span></span>
                            <div>
                                <span>积分商城</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={getCookie('isLogin')?'/forvip':'/login_pwd'}>
                        <div className={'vip'}>
                            <span></span>
                            <div>
                                <span>vip中心</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={getCookie('isLogin')?'/forclients':'/login_pwd'}>
                        <div className={'server'}>
                            <span></span>
                            <div>
                                <span>我的客服</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>


                    <NavLink to={getCookie('isLogin')?'/forclients':'/login_pwd'}>
                        <div className={'recommend'}>
                            <span></span>
                            <div>
                                <span>推荐有奖</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={getCookie('isLogin')?'/forclients':'/login_pwd'}>
                        <div className={'forCard'}>
                            <span></span>
                            <div>
                                <span>办卡有礼</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={getCookie('isLogin')?'/forclients':'/login_pwd'}>
                        <div className={'recharge'}>
                            <span></span>
                            <div>
                                <span>话费充值</span>
                                <span></span>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.$axios.get("https://www.lengendliu.cn:3002/info",{withCredentials:true})
            .then((res) => {
                console.log('后端返回的数据',res)
                if(res.data.msg === 'logined'){
                    this.setState({
                        nickname:res.data.nickname
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })

        this.props.getUrl(window.location.hash.split("#")[1])
    }

}

export default connector(Aboutmy);
