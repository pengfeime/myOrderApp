import React, {Component} from 'react';
import {message} from "antd"


import './index.css'
class RegQQ extends Component {
    constructor(props) {
        super(props);
        this.state={
           isNickDone:false, //用于判断昵称是否输入完成
           isPwdSame:false, //用于判断2次输入密码是否一致
           isPwdDone:false, //用于判断第一次密码是否输入完成
           nickname:'',
           password:'',
           onSubmit:false, //用于判断button按钮是否出于递交数据状态
           resData:'' // 用于存放后端返回的数据
        }
    }

    handleChange = (target) => {
        let value = target.value.trim()
        // 对昵称过滤
        //不能以数字开头，不能以_开头或结尾
        const regNick = /^[^(0-9|_)][a-zA-Z0-9\u4E00-\u9FA5](.*(?<!_))$/
        if(target.name === 'nickname'){
            if(regNick.test(value)&&value.length>1&&value.length<9){
                this.setState({
                    nickname:value,
                    isNickDone:true
                })
            }else{
                this.setState({
                    nickname:'',
                    isNickDone:false
                })
            }

        }
        //  ?=、?!、?<= ?<! 用于限定它前后的表达式，不能单独使用，本身没有作用。
        //  a(?=b) 匹配后面有 b 的 a。
        //  a(?!b) 匹配后面没有 b 的 a。
        //  (?<=a) b 匹配前面有 a 的 b。
        //  (?<!a) b 匹配前面没有 a 的 b。
        //  .*表示匹配所有内容

        // 第一次输入密码,密码长度为8-16位，且不能是纯数字，且包含大小写字母和数字
        const regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,16}$/
        if(target.name === 'password'){
            if(regPwd.test(value)){
                console.log('密码格式正确')
                this.setState({
                    password:value,
                    isPwdDone:true
                })
            }else{
                console.log('密码格式不正确')
                this.setState({
                    password:'',
                    isPwdDone:false,
                    isPwdSame:false
                })
            }

        }
    }

    confirmPwd = (value) => {
        if(this.state.password.trim() === value){
            console.log('2次密码输入一致')
            this.setState({
                isPwdSame:true
            })
        }else{
            this.setState({
                isPwdSame:false
            })
        }
    }

    submitReg =() => {
        // 让整个页面变为不可操作
        this.setState({
            onSubmit:true
        })
        const {nickname,password} = this.state
        if(this.state.isPwdSame){

            this.$axios.post(
                "https://39.98.232.254:3002/reg",
                {
                    nickname,
                    password
                }
            ).then((res,err) => {
                if(err){
                    console.log('报错啦')
                }
                const {data} = res
                console.log("后端返回的数据",data)
                // 根据后端返回的状态，跳转至登录，或需要重新填写注册
                // 注册成功，跳转至登录页面
                if(!!data.code){
                    message.success(data.msg,1)
                        // 注册成功
                        this.setState({
                            resData:data,
                            onSubmit:false
                        })
                        this.props.history.push('/login_pwd')
                }else{
                    // 注册失败
                    this.setState({
                        resData:data,
                        onSubmit:false
                    })
                    console.log('注册失败：',data.msg)
                    // 需要清除input值
                    this.clearText()
                }

            })
        }
    }
    // 清空所有输入
    clearText = () => {
        const Inputs = Array.from(document.querySelectorAll('input'))
        Inputs.map((item,index) => {
            return item.value = ''
        })

    }
    render() {
        return (
            <div className={'loginQQ'}>
                <div className={`cover ${this.state.onSubmit?'covering':null}`}></div>
                <div className={'log_qq'}>
                </div>
                {/*<form action="https://www.lengendliu.cn:3002/reg" method={'post'}>*/}
                    <input type="text" placeholder={"QQ号/邮箱"}/>
                    <input type="text" placeholder={"请设置昵称"} name={'nickname'} onChange={(e) => {
                        !!(e.target.value.trim()) && this.handleChange(e.target)
                    }}/>
                    <input type="text" placeholder={'请设置密码'} name={'password'} disabled={this.state.isNickDone?'':'disabled'} onChange={(e) => {
                        !!(e.target.value.trim()) && this.handleChange(e.target)
                    }}/>
                    <input type="text" placeholder={'请再次输入密码'} disabled={this.state.isPwdDone?'':'disabled'} onChange={(e) => {
                        this.confirmPwd(e.target.value)
                    }}/>
                    <button type={'submit'} className={`submitReg ${this.state.isPwdSame?'green':null}`} onClick={this.submitReg}>注册</button>
                {/*</form>*/}
            </div>
        );
    }
}

export default RegQQ;
