import React, {Component} from 'react';
import './index.css'

class RegTel extends Component {
    render() {
        return (
            <div className={'reg_tel'}>
                <div className="phoneNum">
                    <input type="text" placeholder={'请输入手机号'}/>
                    <span className={'clear'}></span>
                    <hr/>
                </div>
                <p className={'tips'}>tips:未注册的手机号验证后自动创建账户</p>
                <button>获取短信验证码</button>
            </div>
        );
    }
}

export default RegTel;
