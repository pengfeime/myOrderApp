import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import connector from "../../../utils/connect"
import deepClone from "../../../utils/deepclone"

import './index.css'

class Pushpage extends Component {
    constructor(props) {
        super(props);
        this.state={
            datas:JSON.parse(window.sessionStorage.getItem('allShop')) || {}
        }
    }
    render() {
        return (
            <div className={'pushpageWrap'}>
                <h2>为u精选</h2>
                <hr/>
                {Object.keys(this.state.datas).length > 0 && this.state.datas['eatery'].map((item, index) => {
                    let oneData = deepClone(item)
                    let shop_info =  oneData.shop_info[index]
                    oneData.shop_info = shop_info
                    if(index < this.props.shopIndex){
                        return (
                            // 这里跳转有问题，待解决 --- 如何跳转到正确的页面？
                            // 可通过navlink的location对象的state想跳转页面传递数据
                            <NavLink to={{
                                pathname:'/moreInfo/addFood',
                                state:{
                                    curShop:oneData
                                }
                            }} key={index}>
                                <div className={'allitem'}>
                                    <div className={'item'}>
                                        <div className={'thumbpic'}>
                                            <img src={require('../../../' + (item.shop_info[item.id]?item.shop_info[item.id].shopinfo:item.shop_info.shopinfo))} alt=""/>
                                        </div>
                                        <div className={'con'}>

                                            <span>{item.shop_info[item.id]?item.shop_info[item.id].shop_name:item.shop_info.shop_name}</span>
                                            <span>{item.score_star}分</span>
                                            <span>{item.delivery_time}分钟</span>
                                            <span>{item.distance}km</span>
                                            <div className={'someinfo'}>
                                                <span>月售{item.sales_volume}份</span>
                                                <span>￥{item.least_cost}起送</span>
                                                <span>配送费￥{item.delivery_cost}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </NavLink>
                        )
                    }

                })
                }
            </div>
        );
    }
}


export default connector(Pushpage);
