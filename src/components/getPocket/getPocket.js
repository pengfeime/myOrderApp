import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import {message} from "antd"

import getCookie from "../../utils/get_cookie"

import './index.css'
import Connector from "../../utils/connect"


class GetPocket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    addPointer = (target) => {
        const pointers = document.querySelectorAll('.pointer')
        const len = pointers.length
        for(let i=1;i<len;i++){
            pointers[i].classList.remove('choosed')
            pointers[i].parentNode.classList.remove('hover')
        }
        target.childNodes[0].classList.add('choosed')
        target.classList.add('hover')
    }

    listenKey = (e) => {
        let nextNavLink
        // 所有项
        const allNavLink = document.querySelectorAll('.game')
        const len = allNavLink.length
        // 点击向上
        if(e.keyCode === 38){
            for(let i=0;i<len;i++){
                // 先要知道哪一个是当前选项
                if(allNavLink[i].classList.contains('hover')){
                    nextNavLink = (i-1<0?i+2:i-1)
                    allNavLink[i].classList.remove('hover')
                    allNavLink[i].childNodes[0].classList.remove('choosed')
                    allNavLink[nextNavLink].classList.add('hover')
                    allNavLink[nextNavLink].childNodes[0].classList.add('choosed')
                    break
                }

            }
        }else if(e.keyCode === 40) {
            for (let i = 0; i < len; i++) {
                // 先要知道哪一个是当前选项
                if (allNavLink[i].classList.contains('hover')) {
                    nextNavLink = (i + 1 > 2 ? 0 : i+1)
                    allNavLink[i].classList.remove('hover')
                    allNavLink[i].childNodes[0].classList.remove('choosed')
                    allNavLink[nextNavLink].classList.add('hover')
                    allNavLink[nextNavLink].childNodes[0].classList.add('choosed')
                    break
                }
            }
        }else{
            return
        }
    }
    render() {
        return (
            <div className={'forPrize'}>
                <div className="catalog">
                    <span className={'pointer'}></span>
                    <span>请选择游戏</span>
                </div>
                <NavLink className={'game fitstlink hover'} to={getCookie('isLogin')?'/game/turntable':'/login_pwd'}  onClick={(e) => {
                    if(!getCookie('isLogin')){
                        message.info('抱歉,请先登录呢',1)
                    }
                    const {currentTarget} = e
                    this.addPointer(currentTarget)
                }}>
                    <span className={'pointer choosed'}></span>
                    <span>大转盘</span>
                </NavLink>
                <NavLink className={'game'} to={getCookie('isLogin')?'/game/turncard':'/login_pwd'}   onClick={(e) => {
                    const {currentTarget} = e
                    this.addPointer(currentTarget)
                }}>
                    <span className={'pointer'}></span>
                    <span>开心翻翻乐</span>
                </NavLink>
                <NavLink className={'game'} to={getCookie('isLogin')?'/game/packet_rain':'/login_pwd'}   onClick={(e) => {
                    const {currentTarget} = e
                    this.addPointer(currentTarget)
                }}>
                    <span className={'pointer'}></span>
                    <span>红包雨</span>
                </NavLink>
                <NavLink className={'game'} to={getCookie('isLogin')?'/game/scratch':'/login_pwd'}   onClick={(e) => {
                    if(!getCookie('isLogin')){
                        message.info('抱歉,请先登录呢',1)
                    }
                    const {currentTarget} = e
                    this.addPointer(currentTarget)
                }}>
                    <span className={'pointer'}></span>
                    <span>刮刮乐</span>
                </NavLink>

            </div>
        );
    }
    componentDidMount(){
        document.addEventListener('keydown',this.listenKey)
        this.props.getUrl(window.location.hash.split("#")[1])
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.listenKey)
    }
}

export default Connector(GetPocket);
