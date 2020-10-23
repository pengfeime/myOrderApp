import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import {message} from "antd"
import getCookie from "../../../utils/get_cookie"
import connector from '../../../utils/connect'
import './loginPwd.css'

class LoginPwd extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nickname:'',
            password:'',
            isNickDone:false, // 判断是否规范输入昵称
            isPwdDone:false, // 判断是否规范输入密码
            onNick:false, // true表示正在输入昵称且不符合
            onPwd:false // 正在输入密码且不符合
        }
    }



    handleChange = (target) => {
        // 输入为空则不执行后面逻辑
        if(!target.value.trim().length){
            target.name === "nickname" && this.setState({
                onNick:false
            })
            target.name === "password" && this.setState({
                onPwd:false
            })
            return
        }
        let value = target.value.trim()
        // nick不能以数字开头，不能以_开头或结尾,长度是2-8位
        const regNick = /^[^(0-9|_)][a-zA-Z0-9_\u4E00-\u9FA5](.*(?<!_))$/
        // 密码长度为8-16位，且不能是纯数字，且包含大小写字母和数字
        const regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,16}$/
        if(target.name === "nickname"){
            if(regNick.test(value)&&value.length>1&&value.length<9){
                this.setState({
                    nickname:value,
                    isNickDone:true,
                    onNick:false
                })
            }else{
                this.setState({
                    nickname:'',
                    isNickDone:false,
                    onNick:true
                })
            }
        }

        if(target.name === "password"){
            // 输完用户名才能输入密码
            if(this.state.isNickDone && regPwd.test(value)){
                this.setState({
                    password:value,
                    isPwdDone:true,
                    onPwd:false
                })
            }else{
                this.setState({
                    password:'',
                    isPwdDone:false,
                    onPwd:true
                })
            }
        }

    }

    // 显示或隐藏密码
    showOrHide = () => {
        if(this._seepwd.classList.contains('hidePwd')){
            this._seepwd.classList.remove('hidePwd')
            this._showorhide.type = 'password'
        }else{
            this._seepwd.classList.add('hidePwd')
            this._showorhide.type = 'text'
        }
    }
    // 清空所有输入
    clearText = () => {
        const Inputs = Array.from(document.querySelectorAll('input'))
        Inputs.map((item,index) => {
            item.value = ''
        })
    }

    submitLogin = () => {
        const {nickname,password} = this.state
        // 向后台发送登录数据
        this.$axios.post(
            "https://www.lengendliu.cn:3002/login",
            {
                nickname,
                password
            },
            {withCredentials: true}) //跨域请求允许带上cookie
            // 设置 withCredentials = true 也是需要服务器支持的，这个选项的作用是跨域的情况接收服务器response的set-cookies，当启用这个选项的时候，服务器不能设置 Access-Control-Allow-Origin 为 *，如果是nginx可以使用$http_origin，否则写成你真实请求的origin地址
            .then((res) => {
                const {code,msg} = res.data
                switch (code) {
                    case 0:
                        // 用户名错误
                        message.info(msg,1)
                        this.setState({
                            isNickDone:false
                        })
                        this.clearText()
                        break
                    case 1:
                        // 密码输入错误
                        message.info(msg,1)
                        this.setState({
                            isPwdDone:false
                        })
                        break
                    case 2:
                        // 登录成功，需要保存登录状态,cookie 前端不要保存任何用户敏感信息
                        // 为什么保存到cookie中?
                        // 因为sessionStorage无法在tab间共享，localStorage永久保存，无法自动删除
                        // antd design的提示组件
                        message.loading('登录中',1)
                            .then(() => {
                                message.success('登录成功',1)
                                sessionStorage.setItem('cur_nav',JSON.stringify({
                                    refName:'my',
                                    checked:'checked',
                                    addClass:'my_sel'
                                }))

                                this.props.history.push('/aboutmy')
                            })
                        break
                    default:return null
                }
            })
            .catch((err) => {
                throw new Error(err)
            })
    }
    render() {
        return (
            <div className={'loginpwd'}>
                <input type="text" placeholder={'手机/邮箱/用户名'} name={"nickname"} onChange={(e) => {
                    this.handleChange(e.target)
                }}/>
                <p className={`tip ${this.state.isNickDone?'togreen':null} ${this.state.onNick?'tored':null}`}>Tips:&nbsp;&nbsp;用户名不能以数字开头，不能以_开头或结尾,不能是纯数字长度是2-8位，可以包含数字、字母、下划线或汉字</p>
                <div className={"password"}>
                    <input type="password" placeholder={'密码'} name={"password"} disabled={`${this.state.isNickDone?'':'disabled'}`} onChange={(e) => {
                        this.handleChange(e.target)
                    }} ref={(seepwd) => {
                        this._showorhide = seepwd
                    }}/>
                    <span className={'seePwd'} onClick={this.showOrHide} ref={(pwd) => {
                        this._seepwd = pwd
                    }}></span>
                    <p className={`tip ${this.state.isPwdDone?'togreen':null} ${this.state.onPwd?'tored':null}`}>Tips:&nbsp;&nbsp;密码长度为8-16位，且不能是纯数字，且包含大小写字母和数字</p>
                </div>
                <button type={'submit'} className={`submitLog ${(this.state.isNickDone && this.state.isPwdDone)?'green':null}`} onClick={() => {
                    (this.state.isNickDone && this.state.isPwdDone) && this.submitLogin()
                }}>登录</button>
                <div className="forget">
                    <NavLink to={'/register/regWithQQ'}>新用户注册</NavLink>
                    <NavLink to={'/forgetPwd'}>忘记密码?</NavLink>
                </div>
            </div>
        );
    }

    componentWillMount(){
        if(getCookie('isLogin')){
            message.info('您已登录，即将跳转到首页',0.01)
            this.props.history.replace('/')
        }

    }
    componentDidMount(){
        // 使用redux全局更新当前url
        this.props.getUrl(window.location.hash.split("#")[1])
    }
}

export default connector(LoginPwd);
