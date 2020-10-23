 import React, {Component} from 'react';
// 没加withRouter时，this.props里没有history,加上之后才有。
// 如果withRouter和connect一起用一定把withRouter写外面。
// export default withRouter(connect(() => ()());
 import getCookie from "../../utils/get_cookie"

import {
    NavLink,
    withRouter
} from 'react-router-dom'

import './footer.css'

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            a:this.props.path
        }
    }

    changeRoute = () => {
        setTimeout(()=>{
            this.setState(
                {
                    a:window.location.hash.split('#')[1]
                }
            )
            this.props.getpath(this.state.a)
        },0)

    }


    changeBackpic = (target=null) => {
        // 注意箭头函数没法使用arguments属性
        // 有问题！！一刷新正确的样式就消失了 --暂且使用session储存正确样式吧
        if(!target){
            // 先清空样式
            const Arr = [
                {
                    refName:'deliv',
                    addClass:'delive_sel'
                },
                {
                    refName:'find',
                    addClass:'find_sel'
                },
                {
                    refName:'order',
                    addClass:'order_sel'
                },
                {
                    refName:'my',
                    addClass:'my_sel'
                }
            ]
            const len = Arr.length
            // 先清空所有的添加样式
            for(let i=0;i<len;i++){
                if(this[Arr[i].refName].classList.contains(Arr[i].addClass)){
                    this[Arr[i].refName].classList.remove(Arr[i].addClass)
                    this[Arr[i].refName].nextSibling.classList.remove('checked')
                }
            }
            if(!sessionStorage.getItem('cur_nav'))return
            // 未传参则必定是刷新或重载页面了
            const cur_nav = JSON.parse(sessionStorage.getItem('cur_nav'))
            const {refName,checked,addClass} = cur_nav
            // 初始化对应导航条样式
            this[refName].nextSibling.classList.add(checked)
            this[refName].classList.add(addClass)
        }else{
            const {classList} = target
            const Arr = [
                {
                    refName:'deliv',
                    addClass:'delive_sel'
                },
                {
                    refName:'find',
                    addClass:'find_sel'
                },
                {
                    refName:'order',
                    addClass:'order_sel'
                },
                {
                    refName:'my',
                    addClass:'my_sel'
                }
            ]
            const len = Arr.length
            // 先清空所有的添加样式
            for(let i=0;i<len;i++){
                if(this[Arr[i].refName].classList.contains(Arr[i].addClass)){
                    this[Arr[i].refName].classList.remove(Arr[i].addClass)
                    this[Arr[i].refName].nextSibling.classList.remove('checked')
                }
            }
            // 对当前项单独添加样式
            Arr.map((item) => {
                if(classList.contains(item.refName)){
                    this[item.refName].nextSibling.classList.add('checked')
                    this[item.refName].classList.add(item.addClass)
                    sessionStorage.setItem('cur_nav', JSON.stringify({
                        refName: item.refName,
                        checked: 'checked',
                        addClass: item.addClass
                    }))
                    return
                }
            })
        }

    }
    render() {
        return (
                <div className={'foot'}>
                    <div className={'footer'}>
                        <ul>
                            <NavLink className={'deliv'} exact to={'/'} onClick={(e) => {
                                // currentTarget是触发当前目标事件的最外层元素
                                const currentTarget = e.currentTarget
                                this.changeBackpic(currentTarget)
                                this.changeRoute()
                            }}>
                                <li>
                                    <div className={'delive'}  ref={(d) => {
                                        this.deliv = d
                                    }}></div>
                                    <div>外卖</div>
                                </li>
                            </NavLink>
                            <NavLink className={'find'} to={'/search'}  onClick={(e) => {
                                // currentTarget是触发当前目标事件的最外层元素
                                const currentTarget = e.currentTarget
                                this.changeBackpic(currentTarget)
                                this.changeRoute()
                            }}>
                                <li>
                                    <div className={'finds'} ref={(f) => {
                                        this.find = f
                                    }}></div>
                                    <div>发现</div>
                                </li>
                            </NavLink>
                            <NavLink className={'order'} to={getCookie('isLogin')?'/orders':'/login_pwd'}  onClick={(e) => {
                                // currentTarget是触发当前目标事件的最外层元素
                                const currentTarget = e.currentTarget
                                this.changeBackpic(currentTarget)
                                this.changeRoute()
                            }}>
                                <li>
                                    <div className={'orders'} ref={(o) => {
                                        this.order = o
                                    }}></div>
                                    <div>订单</div>
                                </li>
                            </NavLink>
                            <NavLink className={'my'} to={'/aboutmy'}  onClick={(e) => {
                                // currentTarget是触发当前目标事件的最外层元素
                                const currentTarget = e.currentTarget
                                this.changeBackpic(currentTarget)
                                this.changeRoute()
                            }}>
                                <li>
                                    <div className={'mys'} ref={(m) => {
                                        this.my = m
                                    }}></div>
                                    <div>我的</div>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
        );
    }

    componentDidMount(){
        this.changeBackpic()
    }

    componentDidUpdate(){
        this.changeBackpic()
    }
}

export default withRouter(Footer);
