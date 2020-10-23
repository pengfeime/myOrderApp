import React, {Component} from 'react';
import './index.css'
class RegVX extends Component {
    render() {
        return (
            <div className={'loginVX'}>
                <div className={'log_vx'}>
                </div>
                <input type="text" placeholder={"微信账号"}/>
                <input type="text" placeholder={"请设置昵称"}/>
                <input type="text" placeholder={'请设置密码'}/>
                <input type="text" placeholder={'请再次输入密码'}/>
                <button type={'submit'} className={'submitReg'}>注册</button>
            </div>
        );
    }
}

export default RegVX;
