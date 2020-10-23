import React, {Component} from 'react';
import {Result,Button,message} from "antd"
import getCookie from "../../../utils/get_cookie"



class ToLogin extends Component {
    toLogin = () => {
        message.info('前往登录页面',2)
        setTimeout(() => {
            // login_pwd对应的组件是路由组件，可以直接使用this.props.history.push方法
            this.props.history.replace('/login_pwd')
        },2000)
    }
    render() {
        return (
            <Result
                title = {'403'}
                status = {'403'}
                subTitle = {'Sorry, you are not authorized to access this page.'}
                extra = {<Button type={'primary'} onClick={this.toLogin}>前往登录</Button>}
            />
        );
    }

  // 为何这里通过搜索框进入403页面加载不出来？？

    componentWillMount(){
        if(getCookie('isLogin')){
            message.info('您已登录，即将跳转到首页',0.5)
            this.props.history.replace('/')
        }
    }

}

export default ToLogin;
