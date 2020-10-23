import React, {Component} from 'react';
import {message} from 'antd'
import Connector from "../../utils/connect"

import './index.css'
class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rel_data:{},
            curNum:0
        }
    }

    // 根据数据计算当前店里商品数量和价格
    count = (item=[],element='') => {
        let allNum,allCount
        allNum = item.reduce((prev,next) => {
            return prev+next.cur_num
        },0)
        allCount = item.reduce((prev,next) => {
            return prev+next.cur_num*next.price
        },0)
        if(element === ''){
            //默认返回总价
            return allCount
        }else{
            return allNum
        }
    }

    // 根据店名对数据进行分类
    classifyByShopname = (arr=[],element) => {
        const len = arr.length
        if(!len)return

        // 先过滤出所有店名
        let Arr = [],array = [],timeArr = []
        for(let i=0;i<len;i++){
            if(Arr.indexOf(arr[i][element]) === -1){
                Arr.push(arr[i][element])
            }
        }

        Arr.map((item,index) => {
            array[index] = {
                shopname:item,
                shopArr:arr.filter((Item) => {
                    return Item[element] === item
                })
            }
        })
        // 根据店名重新分类 [{店名,[{每一项商品},{},..]},{},...]
        // 为每个店铺添加一个最新操作的时间戳
        array.map((item,index) => {
            let addTime = '0'
            item.shopArr.map((eachItem) => {
                // replace会返回新的字符串，但并不会改变原字符串
                addTime = (addTime.replace(/\:|\-|\s/g,'') > eachItem.addTime.replace(/\:|\-|\s/g,'')?addTime:eachItem.addTime)
                item.addTime = addTime
            })
        })
        return array
    }

    handle = () => {
        message.info('功能暂未开发,敬请期待~',1)
    }
    render() {
        return (
            <div>
                <div className={'confirm'}>
                    <div className="info">
                        <div className={'user'}>
                            <div>
                                <span>公司</span>
                                <span>{sessionStorage.getItem('location')}</span>
                                <p>朱小明(同学)收 18886668888</p>
                            </div>
                            <span> > </span>
                        </div>
                        <div className={'otherInfo'}>
                            <span>立即送出</span>
                            <span>
                            <span>约20:50送达</span>
                            <span className={'to'}>></span>
                        </span>
                        </div>
                        <div className={'otherInfo'}>
                            <span>支付方式</span>
                            <span>
                            <span>支付宝</span>
                            <span className={'to'}>></span>
                        </span>
                        </div>
                    </div>

                    <div className="detail">
                        <div className="goodInfo">
                            <h2>{this.state.rel_data.shopname && this.state.rel_data.shopname}</h2>
                            {Object.keys(this.state.rel_data).length && this.state.rel_data.shopArr.map((item,index) => {
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
                                <span>￥{this.state.curNum/10}</span>
                            </div>
                            <div className="packCost">
                                <span>配送费</span>
                                <span>蜂鸟专送</span>
                                <span>￥{this.state.curNum}</span>
                            </div>
                            <div className="phone">
                                <span><i></i>联系商家</span>
                                <span>
                            <span>小计</span>
                            <span>{Object.keys(this.state.rel_data).length>0?' ￥'+(this.count(this.state.rel_data.shopArr)*1+this.state.curNum/10+this.state.curNum):null}</span>
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
                                <span>{sessionStorage.getItem('location')}</span>
                            </div>
                            <div className="del_way">
                                <span>配送方式</span>
                                <span>蜂鸟专送</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="toPay">
                    <div>
                        {Object.keys(this.state.rel_data).length>0?' ￥'+(this.count(this.state.rel_data.shopArr)*1+this.state.curNum/10+this.state.curNum):null}
                    </div>
                    <div onClick={this.handle}>确认支付</div>
                </div>
            </div>

        );
    }

    componentDidMount(){
        // 使用redux全局更新当前url
        this.props.getUrl(window.location.hash.split('#')[1])
        // 这里需要根据店名到数据库请求相关信息
        this.$axios.get('https://www.lengendliu.cn:3002/relData',{withCredentials:true})
            .then((res) => {
                // 请求来的数据也需要初始化到全局store
                let goodDatas = res.data.the_data
                goodDatas = this.classifyByShopname(goodDatas,'shop_name').filter((item,index) => {
                    return item.shopname === this.props.location.state
                })
                let curNum = this.count(goodDatas[0].shopArr,'num')
                this.setState({
                    rel_data:goodDatas[0]||{},
                    curNum
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default Connector(Confirm);
