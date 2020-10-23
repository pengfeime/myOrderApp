import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import './login.css'
import connector from '../../../utils/connect'
class Login extends Component {
    render() {
        return (
            <div className={'login'}>
                <NavLink className={'login_pwd'} to={'/login_pwd'}>密码登录</NavLink>
                <div className="phoneNum">
                    <span>
                        <input type="text"/>
                        <span className={'clearNum'}>×</span>
                    </span>
                    <button>获取验证码</button>
                </div>
                <input type="text" placeholder={'验证码'}/>
                <p>已阅读并同意 <span>《用户服务协议》 </span>和 <span>《隐私政策》</span></p>
                <button className={'protocol'}>同意协议并登录</button>

            </div>
        );
    }

    componentDidMount(){
        // 使用redux全局更新当前url
        this.props.getUrl(window.location.hash.split("#")[1])
    }

}

export default connector(Login);

