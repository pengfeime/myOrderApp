import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import getCookie from '../../utils/get_cookie'
import connector from '../../utils/connect'
import {message} from "antd"

import './index.css'

class Header extends Component {
    constructor(props) {
        super(props);
    }

    setSession = (type, sessionname, refname = '') => {
        let rel = []
        const Arr = [
            {
                refName: 'deliv',
                checked: 'checked',
                addClass: 'delive_sel'
            },
            {
                refName: 'find',
                checked: 'checked',
                addClass: 'find_sel'
            },
            {
                refName: 'order',
                checked: 'checked',
                addClass: 'order_sel'
            },
            {
                refName: 'my',
                checked: 'checked',
                addClass: 'my_sel'
            }
        ]
        !!refname && (rel = Arr.filter((x) => {
            return x.refName === refname
        }))
        if (type === 'set') {
            sessionStorage.setItem(sessionname, JSON.stringify(rel[0]))
        }
        if (type === 'remove' && refname === '') {
            sessionStorage.removeItem(sessionname)
        }
    }

    checkRoute(val) {
        // 现将路由按‘/’切割成数组，然后取出关键字
        val = val.split('/')[1]
        // 这里有个标题栏要根据路由显示不同内容如何实现？
        // 使用redux？
        switch (val) {
            case 'delivers':
                this.setSession('remove', 'cur_nav')
                return '外卖页面';
            case 'search':
                this.setSession('set', 'cur_nav', 'find')
                return '搜索页面';
            case 'orders':
                this.setSession('set', 'cur_nav', 'order')
                return '订单页面';
            case 'aboutmy':
                this.setSession('set', 'cur_nav', 'my')
                return '个人信息';
            case 'moreInfo':
                this.setSession('remove', 'cur_nav')
                return '商店详情';
            case 'login':
                this.setSession('set', 'cur_nav', 'my')
                return '登录';
            case 'login_pwd':
                this.setSession('set', 'cur_nav', 'my')
                return '密码登录';
            case 'forgetPwd':
                this.setSession('set', 'cur_nav', 'my')
                return '修改登录密码';
            case 'register':
                this.setSession('set', 'cur_nav', 'my')
                return '注册'
            case 'setting':
                this.setSession('set', 'cur_nav', 'my')
                return '设置'
            case 'message':
                this.setSession('set', 'cur_nav', 'my')
                return '消息中心'
            case 'getAddress':
                this.setSession('set', 'cur_nav', 'my')
                return '选择收货地址'
            case 'getpocket':
                this.setSession('remove', 'cur_nav')
                return '领红包啦'
            case 'confirm':
                return '确认订单'
            case 'game':
                return '小游戏'
            default:
                return '首页'
        }
    }

    // 这里如何实现点击返回按钮后头部信息自动更新？
    turnBack() {
        window.history.go(-1)
        setTimeout(() => {
            this.props.getpath(window.location.hash.split('#')[1])
        }, 0)
    }

    logout = () => {
        this.$axios.get("https://www.lengendliu.cn:3002/logout",{withCredentials:true})
            .then((res) => {
                message.success('已退出登录！')
                // 在这里手动更新跳转后路由
                this.props.getUrl('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className={'headWrap'}>
                {window.location.hash !== '#/' && <div>
                    <div className={'header'}>
                        <div className={'go_back'} onClick={this.turnBack.bind(this)} ref={(aaa) => {
                            this._i = aaa
                        }}></div>
                        <p className={'introduce'}>{this.checkRoute(this.props.alldatas.getUrl_reducer.currentUrl ? this.props.alldatas.getUrl_reducer.currentUrl : window.location.hash)}</p>
                    </div>
                    <div className={'blank'}></div>
                </div>}


                {/*首页的定位*/}
                {(window.location.hash ==='#/') &&
                <div>
                    <div className="aboutLoc">
                        <NavLink to={'/getAddress'} className={'toLoc'}>
                            <div className={"location"}>
                                <h2>{sessionStorage.getItem('address') ? sessionStorage.getItem('address') : sessionStorage.getItem('location')}</h2>
                                <span></span>
                            </div>
                        </NavLink>
                        {getCookie('isLogin')&&<span onClick={this.logout}></span>}

                        {getCookie('isLogin') && <NavLink to={'/message'}>
                            <span></span>
                        </NavLink>}

                    </div>
                </div>
                }
            </div>
        );
    }

    componentDidMount() {
        if (window.location.hash !== '#/') {
            this._i.style.display = 'block'
            return
        }
    }

    componentDidUpdate(){
        if (window.location.hash !== '#/') {
            this._i.style.display = 'block'
            return
        }
    }
}

export default connector(Header);
