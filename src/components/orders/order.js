import React, {Component} from 'react';
import {NavLink} from "react-router-dom"
import {message} from "antd"

import connector from '../../utils/connect'
import getCookie from "../../utils/get_cookie"
import deepClone from "../../utils/deepclone"

import './order.css'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rel_data:[],
            shopData:JSON.parse(window.sessionStorage.getItem('allShop')) || [],
            cur_shop:[]
        }
    }

    // 计算所有商品的价格
    countAll = (data=[]) => {
        return data.reduce((prev,next) => {
            return prev+this.count(next.shopArr)
        },0)
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
        // 为每个店铺添加一个最新操作的时间错
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

    // 从缓存的店铺过滤出相关信息
    filterShop =(shopArr,shopName) => {
        if(!Array.isArray(shopArr))return
        let _id
        shopArr[0].shop_info.filter((item,index) => {
            if(item.shop_name === shopName){
                _id = index
                return
            }
        })
        // 根据_id过滤出shop信息
        let shopItem = shopArr.filter((item) => {
            return item.id === _id
        })
        // 不要直接操作对象或数组，会改变源数据,最好复制再操作
        let oneData = deepClone(shopItem[0])
        let shop_info =  oneData.shop_info[_id]
        oneData.shop_info = shop_info
        return oneData

    }
    render() {
        return (
            <div className={'myorder'}>
                <h2>我的订单</h2>
                {!this.state.rel_data.length && <p>Emm..暂无订单呢</p>}
                {
                    (!!this.state.rel_data.length) && this.state.rel_data.map((item,index) => {


                    return (<NavLink to= {{
                        pathname:'/orderDetail',
                        state:{
                            item,
                            curNum:this.count(item.shopArr,'num'),
                            curCount:this.count(item.shopArr),
                            curShop:this.filterShop(this.state.shopData['eatery'],item.shopname)
                        }
                    }}
                        key={index}>
                        <div className={'ord_wrap'}>
                            <div className="leftPic">
                                <img src={require(`../../${item.shopArr[0].shopinfo}`)} alt=""/>
                            </div>
                            <div className="allDetail">
                                <div>
                                    {/*a标签是内联标签，不能直接嵌套，使用object标签包裹里面标签可实现a标签嵌套*/}
                                    <object data="" type="">
                                        <NavLink to={{
                                            pathname:'/moreInfo/addFood',
                                            state:{
                                                curShop:this.filterShop(this.state.shopData['eatery'],item.shopname)

                                            }}
                                        }>{item.shopname+'  >'}</NavLink>

                                    </object>
                                </div>
                                <div>{item.addTime}</div>
                            </div>
                        </div>

                        <div className="particular">
                            <span>{item.shopArr[0].name +`  等${this.count(item.shopArr,'num')}件`}</span>
                            <span>{'￥'+this.count(item.shopArr)}</span>
                        </div>
                    </NavLink>)
                    })
                }
                <hr/>
               {!!this.state.rel_data.length && <div className="countMoney">
                    <span>优惠说明 <span></span></span>
                    <span>
                        <span>小计</span>
                        <span>{'￥'+this.countAll(this.state.rel_data)}</span>
                    </span>
                    <NavLink to={'/'} onClick={
                        (e) => {
                            e.preventDefault()
                            message.info('功能暂未开发',1)
                        }
                    }>确认支付</NavLink>
                </div>}
            </div>
        );
    }

    componentDidMount(){
        getCookie('isLogin') && this.$axios.get('https://www.lengendliu.cn:3002/relData',{withCredentials:true})
            .then((res) => {
                // 请求来的数据也需要初始化到全局store
                const goodDatas = res.data.the_data

                this.setState({
                    rel_data:this.classifyByShopname(goodDatas,'shop_name')||[]
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default connector(Order);
