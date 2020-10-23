import React, {Component} from 'react';
import connector from '../../../utils/connect'
import {NavLink,Switch,Route} from 'react-router-dom'
import {Menu, Dropdown, Icon} from "antd"

import './register.css'
import RegQQ from "./reg_qq/regWithQQ";
import RegVX from "./reg_vx/regVX";
import RegTel from "./reg_tel/regTel";


const menu = (
    <Menu>
        <Menu.Item key="0">
            <NavLink to={'/register/regWithQQ'}>使用QQ号注册</NavLink>
        </Menu.Item>
        <Menu.Item key="1">
            <NavLink to={'/register/regWithVX'}>使用微信注册</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
            <NavLink to={'/register'}>使用手机号注册</NavLink>
        </Menu.Item>
    </Menu>
)

class Register extends Component {
    render() {
        return (
            <div className={'register'}>
                <span>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className="ant-dropdown-link">
                            <h2>欢迎注册</h2> <Icon type="down"/>
                        </div>
                    </Dropdown>
                </span>
                <Switch>
                    <Route exact path={'/register'} component={RegTel}></Route>
                    <Route path={'/register/regWithQQ'} component={RegQQ}></Route>
                    <Route path={'/register/regWithVX'} component={RegVX}></Route>
                </Switch>
                <div className="toOther">
                    <NavLink to={'/login_pwd'}>密码登录</NavLink>
                    <NavLink to={'/help'}>遇到问题</NavLink>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // 更新路由
        this.props.getUrl(window.location.pathname)
    }
}

export default connector(Register);


