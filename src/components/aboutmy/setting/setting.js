import React, {Component} from 'react';
import connector from '../../../utils/connect'
import {message} from 'antd'

import './index.css'
import getCookie from "../../../utils/get_cookie"


class Setting extends Component {

    logOut = () => {
        this.$axios.get("https://www.lengendliu.cn:3002/logout",{withCredentials:true})
            .then((res) => {
                message.success('已退出登录！')
                this.props.history.replace('/')
                // 需要将底部显示的图标变为首页
                sessionStorage.setItem('cur_nav',JSON.stringify({
                    refName:'deliv',
                    checked:'checked',
                    addClass:'delive_sel'
                }))
                // 在这里手动更新跳转后路由
                this.props.getUrl('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className={'setting'}>
                <div>
                    <span>账户安全</span>
                </div>
                <div>
                    <span>欢迎评分</span>
                </div>
                <div>
                    <span>关于e必达</span>
                </div>
                <div>
                    <span>意见反馈</span>
                </div>
               {getCookie('isLogin') && <button onClick={this.logOut}>退出登录</button>}
            </div>
        );
    }

    componentDidMount(){
        this.props.getUrl(window.location.hash.split('#')[1])
    }
}

export default connector(Setting);
