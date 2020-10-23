import React, {Component} from 'react';
import './addfood.css'
import connector from '../../../../utils/connect'
import AddOrSub from "../../../add_sub/addOrSub"
import getCookie from "../../../../utils/get_cookie"
import {NavLink} from 'react-router-dom'

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 这里的relData不能每次都一样（因为取的localStorage）,需要修改！
            relData: JSON.parse(sessionStorage.getItem('currentShop')),
            relArr: [], // 用于存放过滤后的数据
            cur_class: '',
            end_left: '', // 购物车的left位置
            end_top: '', // 购物车的top位置
            addNums: document.getElementsByClassName('addNum'),
            curNum: 0,
            curIndex: 0, // 当前分类所在位置
            isHidden: true, // 判断购物车里面详细列表是否显示
            cur_shopName: JSON.parse(sessionStorage.getItem('currentShop')).shop_info.shop_name,
            rel_data: [], // 储存从数据库读取的相关数据
            arr:['grey','lightgreen']
        }
    }

    showThis = (index = -1, e) => {
        if (index === -1) {
            const span = document.createElement('span')
            span.classList.add('createSpan')
            this.refs['热销'].previousSibling.childNodes[0].insertBefore(span, this.refs['热销'].previousSibling.childNodes[0].childNodes[0])
            //this.refs['热销'].previousSibling.appendChild(span)
            // -1 代表此页面刚挂载完成，还未点击左边分类列表
            this.refs['热销'].previousSibling.childNodes[0].style.color = 'black'
            this.refs['热销'].style.display = 'block'
        } else {
            this.setState({
                curIndex: index
            })
            // map方法用于数组，遍历对象用for... in
            for (let key in this.refs) {
                if (/\d/.test(key)) {
                    // 这里的ref比较杂，需要过滤
                    continue
                } else {
                    this.refs[key].style.display = 'none'
                    this.refs[key].previousSibling.childNodes[0].style.color = 'lightgrey'
                }
            }
            // 因为热销分类有特殊的图标，若点击到图标会报错
            if (e.target.nodeName.toUpperCase() !== 'H2') {
                e.target.parentNode.parentNode.nextSibling.style.display = 'block'
                e.target.parentNode.style.color = 'black'
                return
            }
            this.refs[e.target.innerText].previousSibling.childNodes[0].style.color = 'black'
            this.refs[e.target.innerText].style.display = 'block'
        }

    }

    hideDiv = () => {
        this._hideDiv.classList.remove('showBeg')
        // 同时需要隐藏下面的商品列表
        this._goodslist.style.height = 0
        this._goodslist.style.top = 0
        this._hideDiv.classList.remove('showBeg')
        this._goodslist.classList.add('hid')
        this.setState({
            isHidden: true
        })
    }
    // 监听动画，一旦animation完毕，去掉运动样式
    listenAnimationEnd = () => {
        // 是因为有动画导致getBoundingClientRect获取到的属性不准确吗？
        // 暂且在这里纠正购物车的位置
        const {left, top} = this._spanRef.getBoundingClientRect()
        this.setState({
            cur_class: '',
            end_left: left,
            end_top: top
        })
    }

    // 计算商品价格
    countPriceOrNum = () => {
        // 当从下面列表清除了所有商品时，需要将列表高度归0，并隐藏掉该区域
        if (this._goodslist && this._goodslist.childNodes.length === 0) {
            this._goodslist.style.height = 0
            this._goodslist.style.top = 0
            this._hideDiv.classList.remove('showBeg')
            this._goodslist.classList.add('hid')
        }
        // filter()方法会创建一个新数组，原数组的每个元素传入回调函数中，回调函数中有return返回值，若返回值为true，这个元素保存到新数组中；若返回值为false，则该元素不保存到新数组中；原数组不发生改变。
        if (this.props.alldatas.monitor_goodnum.totalNum > 0) {
            // 先过滤出当前店铺的所有商品
            let curShopArr = this.props.alldatas.monitor_goodnum.goodDatas.cur_good.filter((x) => {
                return x.shop_name === this.state.cur_shopName
            })
            const allPrice = curShopArr.reduce((prev, next) => {
                return prev + next.cur_num * next.price
            }, 0)
            const allNum = curShopArr.reduce((prev, next) => {
                return prev + next.cur_num
            }, 0)
            return {
                allPrice,
                allNum
            }
        } else {
            return {
                allPrice: 0,
                allNum: 0
            }
        }
    }

    // 点击显示或隐藏详细商品信息
    toggle = () => {
        if (this._goodslist.childNodes.length === 0) return;
        if (this.state.isHidden) {
            this.setState({
                isHidden: !this.state.isHidden
            }, () => {
                this._hideDiv.classList.add('hideBeg')
                this._hideDiv.classList.add('showBeg')
                this._goodslist.classList.remove('hid')
                this._goodslist.style.height = `${this._goodslist.childNodes.length * 2.5}rem`
                this._goodslist.style.top = `-${this._goodslist.childNodes.length * 2.5}rem`
            })

        } else {
            this.setState({
                isHidden: !this.state.isHidden
            }, () => {
                this._goodslist.style.height = 0
                this._goodslist.style.top = 0
                this._hideDiv.classList.remove('showBeg')
                this._goodslist.classList.add('hid')
            })

        }
    }

    // 过滤出当前商店当前分类当前食品,需过滤分类及食品
    filterCateAndFood = (cate, foodname) => {
        let arr = []
        if (this.props.alldatas.monitor_goodnum.totalNum) {
            // 先过滤出当前商店
            arr = this.props.alldatas.monitor_goodnum.goodDatas.cur_good.filter((item) => {
                return item.shop_name === this.state.cur_shopName
            })
        }
        if (foodname) {
            return arr = arr.filter((item) => {
                // 过滤出当前分类下确切商品
                return (item.category === cate && item.name === foodname)
            })
        } else {
            // 直接返回当前分类总数
            arr = arr.filter((item) => {
                // 过滤出当前分类
                return (item.category === cate)
            })
            return arr.reduce((prev, next) => {
                return prev + next.cur_num
            }, 0)
        }
    }

    // 更新底部商品列表高度
    reNewHeight = (e) => {
        if (e.classList.contains('sub')) {
            if (e.nextSibling.innerText === '1') {
                this._goodslist.style.height = `${(this._goodslist.childNodes.length - 1) * 2.5}rem`
                this._goodslist.style.top = `-${(this._goodslist.childNodes.length - 1) * 2.5}rem`
            }
        }
    }


    handle = (e) => {
        const shockCount = this.countPriceOrNum().allPrice - this.state.relData.least_cost
        if(shockCount<0){
            e.preventDefault()
        }
    }

    render() {
        return (
            <div>
                <div className="allBarbecue">
                    <div className="category">
                        {Object.keys(this.state.relData).length > 0 && <div>
                            <ul className={'wrap'}>
                                {this.state.relData.shop_info.rel_foods.map((item, indexOne) => {
                                    return (
                                        <li key={indexOne}>
                                            {/*这是左边列表部分*/}
                                            <div className={"leftTitle"}>
                                                <h2 style={{color: 'lightGrey'}} className={'sidenav'}
                                                    onClick={this.showThis.bind(this, indexOne)}>{item.category}</h2>
                                                {/*左边显示数量的小圆点*/}
                                                <div className={"addNum"} ref={indexOne}>
                                                    {/*这里的数据初始化？*/}
                                                    {this.filterCateAndFood(item.category)}
                                                </div>
                                            </div>

                                            {/*.detail是菜单右边列表部分*/}
                                            <div className="detail" ref={item.category} style={{display: 'none'}}>
                                                <h2>{item.category}</h2>
                                                <div className={'foodlist'}>
                                                    <ul>
                                                        {item.the_rel.map((oneItem, index) => {
                                                            return (<li key={index}>
                                                                <div className={'fooditem'}>
                                                                    <div className="left_pic">
                                                                        <img src={require("../../../../" + oneItem.url)}
                                                                             alt=""/>
                                                                    </div>
                                                                    <div className="descri">
                                                                        <h3>{oneItem.name}</h3>
                                                                        <p>月售{oneItem.sale_num}份</p>
                                                                        <div className="price_num">
                                                                            <span>￥{oneItem.price}</span>
                                                                            {/*这里引入添加，减少按钮组件*/}
                                                                            <AddOrSub cartTop={this.state.end_top}
                                                                                      allRef={this.refs}
                                                                                      cartLeft={this.state.end_left}
                                                                                      curGood={oneItem}
                                                                                      curNum={(this.filterCateAndFood(item.category, oneItem.name).length) ? this.filterCateAndFood(item.category, oneItem.name)[0].cur_num : '0'}
                                                                                      goodList={this._goodslist}/>

                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </li>)
                                                        })}

                                                    </ul>
                                                </div>

                                            </div>
                                        </li>)
                                })}
                            </ul>
                        </div>}
                    </div>

                </div>

                {/*这里是支付结算部分*/}
                <div className={"apply"}>
                    {/*这里是所选商品清单*/}
                    <div className={"goodsList"} style={{'height': 0}} ref={(r) => {
                        this._goodslist = r
                    }} onClick={(e) => {
                        const {target} = e
                        this.reNewHeight(target)
                    }}>


                        {/*这里还没有写完！！*/}
                        {/*<p>{this.countPrice()?`还差￥${this.state.relData.least_cost-this.countPrice()}起送`:''}</p>*/}
                        {/*<div className="goodsOrClear">*/}
                        {/*<span>已选商品</span>*/}
                        {/*<span>清空</span>*/}
                        {/*</div>*/}
                        {
                            this.countPriceOrNum().allNum > 0 && this.props.alldatas.monitor_goodnum.goodDatas.cur_good && this.props.alldatas.monitor_goodnum.goodDatas.cur_good.map((item, index) => {
                                return (this.state.cur_shopName === item.shop_name) ? (
                                    <div key={index} className={'bottom_list'}>
                                        <span>{item.name}</span>
                                        <span>{item.price * item.cur_num}</span>
                                        {/*底部的添加按钮*/}
                                        <AddOrSub cartTop={this.state.end_top} cartLeft={this.state.end_left}
                                                  curGood={item} curNum={item.cur_num || '0'} allRef={this.refs}
                                                  goodList={this._goodslist}/>
                                    </div>
                                ) : null
                            })

                        }
                    </div>
                    {/*这是一个隐藏层，使背景不可操作*/}
                    <div onClick={this.hideDiv} ref={(hide) => {
                        this._hideDiv = hide
                    }}></div>
                    <div className="addDetail" onClick={
                        this.toggle
                    }>

                        {/*为何这里点击添加数量后下面的div会闪动一下？？？  --小球运动所致*/}

                        <span className={this.state.cur_class} ref={(spa) => {
                            this._spanRef = spa
                        }}>
                            {/*这里的总数量是指当前商店的总数*/}
                            {this.props.alldatas.monitor_goodnum.totalNum > 0 && this.countPriceOrNum().allNum > 0 &&
                            <div>{this.countPriceOrNum().allNum}</div>}
                        </span>
                        <div className="count">
                            <p>
                                {/*{('￥'+this.countPriceOrNum().allPrice) || '未选购商品'}*/}
                                {
                                    this.countPriceOrNum().allPrice>0?'￥'+this.countPriceOrNum().allPrice:'未选购商品'
                                }

                            </p>
                            <p>
                                {'另需配送费￥'+this.state.relData.delivery_cost}
                            </p>
                        </div>


                    </div>
                    <div className={`toApply ${this.countPriceOrNum().allPrice - this.state.relData.least_cost <0?this.state.arr[0]:this.state.arr[1]}`}>
                        <NavLink to={{
                            pathname:'/confirm',
                            state:this.state.cur_shopName
                        }} onClick={(e) => {
                            this.handle(e)
                        }}>
                            {
                                !this.countPriceOrNum() ? `￥${this.state.relData.least_cost}起送` : ((this.countPriceOrNum().allPrice - this.state.relData.least_cost) >= 0 ? '去结算'+`￥${this.countPriceOrNum().allPrice*1 + this.state.relData.delivery_cost*1}` : `还差￥${this.state.relData.least_cost - this.countPriceOrNum().allPrice}起送`)
                            }
                        </NavLink>

                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // 这里需要从数据库请求相关数据 前端需要withCredentials = true 标识传输cookie 当然是在用户登录已状态下 通过this.props.alldatas.monitor_goodnum.totalNum判断避免重复提交
        this.props.alldatas.monitor_goodnum.totalNum === 0 && getCookie('isLogin') && this.$axios.get('https://www.lengendliu.cn:3002/relData', {withCredentials: true})
            .then((res) => {
                // 请求来的数据也需要初始化到全局store
                const goodDatas = res.data.the_data
                // 得到该数据的总数
                let totalNum = goodDatas.reduce((prev, next) => {
                    return prev + next.cur_num
                }, 0)
                this.props.initData({
                    totalNum,
                    goodDatas: {cur_good: goodDatas}
                })
                this.setState({
                    rel_data: goodDatas
                })
            })
            .catch((err) => {
                console.log(err)
            })

        const {left, top} = this._spanRef.getBoundingClientRect()
        // webkitAnimationEnd事件也可在componentDidUpdate里监听
        // 在动画完成后，先将购物车的原有动画样式清空，否则连续点击+或-按钮将不会再次触发动画效果
        this._spanRef.addEventListener('webkitAnimationEnd', this.listenAnimationEnd, false)
        // 仅会执行一次
        this.setState({
            cur_class: this.props.alldatas.monitor_goodnum.status,
            end_left: left,
            end_top: top
        }, () => {
            // 必须等数据挂载完成之后才能使用showThis函数初始化页面
            // 默认第一项 热销 被选中
            this.showThis()
        })
    }

    componentDidUpdate() {
        if (this._goodslist.childNodes.length === 0) {
            // 同时需要隐藏下面的商品列表
            this._goodslist.style.height = 0
            this._goodslist.style.top = 0
            this._hideDiv.classList.remove('showBeg')
            this._goodslist.classList.add('hid')
        }
        // 如果购物车为空，购物车颜色为灰色
        if (!this.props.alldatas.monitor_goodnum.totalNum) {
            this._spanRef.classList.add('kon')
            this._spanRef.classList.add('cartNone')
        }
        const {addNums} = this.state
        for (let i = 0; i < addNums.length; i++) {
            if (!parseInt(addNums[i].innerText)) {
                addNums[i].style.display = 'none'
            } else {
                addNums[i].style.display = 'block'
            }

        }
    }

    componentWillReceiveProps(nextProps) {
        // 调用addNum方法会导致nextProps里的alldatas发生改变，从而导致Maximum update depth exceeded报错
        // 所以this.props.addNum不能在这里调用
        let cur_class = nextProps.alldatas.monitor_goodnum.status
        this.setState({
            cur_class
        })
    }

    componentWillUnmount() {
        //通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也
        // 意味着通过addEventListener()添加的匿名函数无法移除
        //一：相同事件绑定和解除，需要使用共用函数；
        // 二：共用函数不能带参数；
        this._spanRef.removeEventListener('webkitAnimationEnd', this.listenAnimationEnd, false)
    }

}

export default connector(AddFood);
