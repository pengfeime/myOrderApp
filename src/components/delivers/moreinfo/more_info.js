import React, {Component} from 'react';
import connector from '../../../utils/connect'

import {
    NavLink,
    Route,
    withRouter
} from "react-router-dom"

// 以下引入是为实现动画切换页面效果
import AnimatedRouter from "react-animated-router" //引入AnimatedRouter组件
import 'react-animated-router/animate.css' //引入animated组件默认的样式

import './moreinfo.css'
import AddFood from "./add_food/addfood";
import RelComment from "./comments/comments";
import Shopabout from "./shop_about/shopabout";

class MoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentShop:''
        }
    }

    render() {
        return (
            <div>
                {
                    (this.state.currentShop&&
                        <div className={"top"}>
                            <div className="backWall">
                                <img src={require('../../../' + this.state.currentShop.shop_info.shopinfo)} alt=""/>
                            </div>
                            <div className="topDescri">
                                <div className="topPic">
                                    <img src={require('../../../' + this.state.currentShop.shop_info.shopinfo)} alt=""/>
                                </div>
                                <h1>{this.state.currentShop.shop_info.shop_name}</h1>
                                <div className={'relInfo'}>
                                    <span>评价{this.state.currentShop['score_star']}</span>
                                    <span>月销{this.state.currentShop['sales_volume']}</span>
                                    <span>蜂鸟派送约{this.state.currentShop['delivery_time']}分钟</span>
                                </div>
                                <p>公告：亲下单请备注口味哦！没备注都微辣哦~</p>
                                <div className={'nav'}>
                                    {/* 如何实现点击link标签时相应页面动态缓慢切换效果？？？ */}
                                    <NavLink activeClassName={"choose"} to={'/moreInfo/addFood'}>点餐</NavLink>
                                    <NavLink activeClassName={"choose"} to={'/moreInfo/comments'}>评价</NavLink>
                                    <NavLink activeClassName={"choose"} to={'/moreInfo/shopAbout'}>商家</NavLink>
                                </div>
                                {/*使用react-transition-group组件来实现页面切换动画效果*/}
                                {/*需安装react-reansition-group,react-animated-router,prop-types插件*/}
                                {/*将switch组件更换为AnimatedRouter组件*/}

                                <AnimatedRouter>
                                        <Route path={'/moreInfo/addFood'} component={AddFood}></Route>
                                        <Route path={'/moreInfo/comments'} component={RelComment}></Route>
                                        <Route path={'/moreInfo/shopAbout'} component={Shopabout}></Route>
                                </AnimatedRouter>
                            </div>

                        </div>)
                }
                {/* 由于父组件已有Router标签，如果这里在套一个Router，会导致使用this.props.history.push()方法跳转路由后页面不刷新的问题！！ */}
            </div>
        );
    }

    componentDidMount() {
        sessionStorage.removeItem('cur_nav')
        // 更新本地储存的currentShop
        if(this.props.location.state){
            window.sessionStorage.setItem('currentShop', JSON.stringify(this.props.location.state.curShop))
            this.setState({
                currentShop: this.props.location.state.curShop
            })
        }else{
            this.setState({
                currentShop: JSON.parse( window.sessionStorage.getItem('currentShop')),
            })
        }
        // 派发更新当前url事件，header页面便会更新标题
        this.props.getUrl(window.location.hash.split('#')[1])
        // 当加载完此页面(/moreInfo)时候，需要直接显示一些相关信息，重定向
        if (window.location.hash === '#/moreInfo') {
            this.props.history.push('/moreInfo/addFood')
        }

    }
}

export default withRouter(connector(MoreInfo));
