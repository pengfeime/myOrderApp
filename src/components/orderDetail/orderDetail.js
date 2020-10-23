import React, {Component} from 'react';
import {NavLink} from "react-router-dom"

import {message} from "antd"

import './index.css'


class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopData:this.props.location.state || {}
        }
    }
    // 控制数字精度
    // 能被计算机读懂的是二进制，而不是十进制，所以我们先把 0.1 和 0.2 转换成二进制看看：
    //
    // 0.1==》0.1.toString(2)==》0.0001100110011(无限循环..)
    //
    // 0.2==》0.2.toString(2)==》0.001100110011(无限循环..)
    //
    // 双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100110011001100 因浮点数小数位的限制而截断的二进制数字，这时候，我们再把它转换为十进制，就成了 0.30000000000000004。
    formatNum = (floatNum,digit) => {
        const m = Math.pow(10,digit)
        return parseInt(floatNum*m)/m
    }

    copy = () => {
        message.success('复制成功',1)
    }
    render() {
        return (
            <div className={'orderDetail'}>
                <h3>
                    <NavLink to={{
                        pathname:'/moreInfo/addFood',
                        state:{
                            curShop:this.state.shopData.curShop
                        }
                    }}>
                        {this.state.shopData.item && (this.state.shopData.item.shopname+' >')}
                    </NavLink>
                    </h3>
                <div className="goodInfo">
                    {this.state.shopData.item.shopArr.map((item,index) => {
                        return (
                            <div key={index} className={'foodItem'}>
                                <img src={require('../../'+item.url)} alt=""/>
                                <div className={'each'}>
                                    <span>{item.name}</span>
                                    <span>{'×'+item.cur_num}</span>
                                    <span>{'￥'+item.cur_num*item.price}</span>
                                </div>

                            </div>
                        )
                    })}

                    <div className="packCost">
                        <span>包装费</span>
                        <span>包装费</span>
                        <span>￥{this.formatNum(this.state.shopData.curNum*.1,1)}</span>
                    </div>
                    <div className="packCost">
                        <span>配送费</span>
                        <span>蜂鸟专送</span>
                        <span>￥{this.state.shopData.curNum}</span>
                    </div>
                    <div className="phone">
                        <span><i></i>联系商家</span>
                        <span>
                            <span>实付</span>
                            <span>{' ￥'+(this.state.shopData.curCount+this.state.shopData.curNum*.1+this.state.shopData.curNum)}</span>
                        </span>
                    </div>
                </div>

                <div className="deliverInfo">
                    <h3>配送信息</h3>
                    <div>
                        <span>送达时间</span>
                        <span>尽快送达</span>
                    </div>
                    <div>
                        <span>收货地址</span>
                        <span>新阳光养猪场 王小明(先生)</span>
                    </div>
                    <div className="del_way">
                        <span>配送方式</span>
                        <span>蜂鸟专送</span>
                    </div>
                </div>

                <div className="deliverInfo">
                    <h3>订单信息</h3>
                    <div>
                        <span>订单号</span>
                        <span>
                            <span className={'orderNum'}>E205 6814 7011 4891 1820</span>
                            <span>|</span>
                            <span className={'copyOrder'} onClick={this.copy}>复制</span>
                        </span>
                    </div>
                    <div>
                        <span>支付方式</span>
                        <span>在线支付</span>
                    </div>
                    <div className="del_way">
                        <span>下单时间</span>
                        <span>{this.state.shopData.item.addTime}</span>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        console.log('传过来数据',this.props.location.state)
    }
}

export default OrderDetail;
