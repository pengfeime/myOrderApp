import React, {Component} from 'react';
import deepClone from "../../utils/deepclone"

// 把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上  路由组件可以直接获取这些属性，而非路由组件就必须通过withRouter修饰后才能获取这些属性了
// 默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push(‘/detail‘)跳转到对应路由的页面
// 然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

import {withRouter} from "react-router-dom"
import connector from "../../utils/connect"
import getCookie from "../../utils/get_cookie"
import './add_sub.css'

class AddOrSub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastTime: 0,
            cur_shopname: JSON.parse(sessionStorage.getItem('currentShop')).shop_info.shop_name,
            cur_shopInfo:JSON.parse(sessionStorage.getItem('currentShop')).shop_info,
            shopinfo:JSON.parse(sessionStorage.getItem('currentShop')).shop_info.shopinfo
        }
    }

    // 问题来了，如何在点击加减按钮时触发父组件的购物车变化？ --redux
    // 使用redux，当点击增加或减少按钮时派发一个action

    // 根据编好的商品id ： _id，可知其所属分类

    // 判断是否是祖先元素
    isParent = (cur, tar) => {
        let isParentNode = false
        // 数量从1减到0时候cur会display:none,导致cur.tagName报错
        while (cur && (cur.tagName.toUpperCase() !== 'BODY')) {
            if (cur !== tar) {
                cur = cur.parentNode
            } else {
                return isParentNode = true
            }
        }
        return isParentNode
    }

    // 根据当前商品的id或者category来获取左边相对应的分类
    findCategory = (category) => {
        switch (category) {
            case '热销':
                return this.props.allRef['0']
            case '饮料':
                return this.props.allRef['1']
            case '酒水':
                return this.props.allRef['2']
            case '本店特色':
                return this.props.allRef['3']
            case '荤菜':
                return this.props.allRef['4']
            case '素菜':
                return this.props.allRef['5']
            default:
                break
        }
    }

    // 过滤出当前商店当前分类当前食品,需过滤分类及食品
    filterCateAndFood = (curArr=[],shopname,cate,foodname)=>{
        if(!(curArr.length))return []
        return curArr = curArr.filter((item) => {
            return (item.category === cate && item.name === foodname && item.shop_name === shopname)
        })
    }

  // 需要在这里将数据传入数据库-----


    // 对时间戳进行格式转换
    transformTime = (time) => {
        const Y = time.getFullYear(),
              M = (time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1),
              D = (time.getDate()<10?'0'+time.getDate():time.getDate()),
              h = (time.getHours()<10?'0'+time.getHours():time.getHours()),
              m = (time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()),
              s = (time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds())
        return Y + '-' + M + '-' +D +' '+ h +':'+ m +':'+s
    }
    addItem = (e) => {
        let shop_name,
            findItem,
            cur_good,
            cur_goods,
            cur_name,
            cur_ele,
            tar_eles,
            tar_ele,
            len,
            leftTitle,
            shopAbout // 存放整个商店信息+当前商品信息
        shop_name = this.state.cur_shopname
        const {target} = e
        if (target.parentNode.childNodes[0].style.visibility === 'hidden') {
            target.parentNode.childNodes[0].style.visibility = 'visible'
            target.parentNode.childNodes[1].style.visibility = 'visible'
        }

        // 防止频繁点击按钮，需要防抖
        // e是addItem传入的参数 通过添加按钮获取相关商品的信息
        // 需要知道点击的是哪个分类的哪个商品，及相关价格等
        // 获取当前添加的商品的名称 由于有2个不同的地方使用了此组件，因此要根据不同情况来获取cur_food
        // const cur_food = this.props.curGood ? this.props.curGood[0].name : e.target.parentNode.parentNode.parentNode.childNodes[0].innerText
        // 需要区分cur_good是从父组件传过来的情况
        // 不应该直接将curGood赋值给一个变量，变量改变curGood也会跟着改变
        cur_good = deepClone(this.props.curGood)
        cur_ele = this._addSpan
        tar_eles = document.getElementsByClassName('detail')
        len = tar_eles.length
        for (let i = 0; i < len; i++) {
            // 遍历所有类名为detail的元素，找出真正的祖先元素
            if (this.isParent(cur_ele, tar_eles[i])) {
                tar_ele = tar_eles[i]
            }
        }
        // 这里获取左边标签有2中方式，一种是通过兄弟父子元素关系查找，一种是通过父组件传入
        leftTitle = tar_ele ? (tar_ele.previousSibling.childNodes[0].innerText) : this.props.curGood.category
        // 这里的小球运动导致了页面的闪烁感
        this.ballAnimate(e)

        cur_name = this.props.curGood ? this.props.curGood.name : e.target.parentNode.parentNode.parentNode.childNodes[0].innerText
        // 数据中需要包含店名
        cur_good.shop_name = shop_name
        cur_good.category = leftTitle
        cur_good.name = cur_name
        // addNum函数还需要递交商品相关信息
        if (this.props.alldatas.monitor_goodnum.totalNum === 0) {
            // 第一次提交，需要提交商品所在店铺相关信息，为简化，只模拟只有一个店铺的情况
            // 给当前商品添加一个数量
            cur_good.cur_num = 1
            findItem = cur_good
        } else {
            // 不是第一次添加，只需要提交当前商品即可
            // 需判断是否已有当前商品
            // 还需要确定店名
            cur_goods = this.props.alldatas.monitor_goodnum.goodDatas.cur_good
            // 从数据中找出一致的项
            findItem = this.filterCateAndFood(cur_goods,shop_name,leftTitle,cur_name)
            // cur_good有数据，但不存在与当前添加匹配的项
            if(!findItem.length){
                cur_good.cur_num = 1
                findItem = cur_good
            }else{
                findItem = findItem[0]
            }
        }
        findItem.shopinfo = this.state.shopinfo
        findItem.addTime = this.transformTime(new Date())
        shopAbout = cur_good
        // 这里是异步操作！
        this.props.addNum(shopAbout)
        // 这里需要将数据存入数据库
        this.$axios.post('https://www.lengendliu.cn:3002/submitData',{
            username:getCookie('nickname'),
            currentGood:findItem
        }).then((res,err) => {
            if(err){
                console.log(err)
            }else{
                const {data} = res
            }
        })

    }

    subItem = (e) => {
        // 主要e不能在延时函数里使用，因此这里先把原先的e复制一份保存起来
        // const event = {...e}
        // 在下面弹出的列表中，有时当商品数为1时候点击—按钮却无反应，为何？？
        let goods,
            cur_shopname,
            cur_good,
            cur_name,
            tar_ele,
            leftTitle,
            cur_ele = e.target,
            tar_eles = document.getElementsByClassName('detail'),
            len = tar_eles.length
        for (let i = 0; i < len; i++) {
            // 遍历所有类名为detail的元素，找出真正的祖先元素
            if (this.isParent(cur_ele, tar_eles[i])) {
                tar_ele = tar_eles[i]
            }
        }
        leftTitle = tar_ele ? (tar_ele.previousSibling.childNodes[0].innerText) : this.props.curGood.category
        // 获取当前商店的名称
        cur_shopname = this.state.cur_shopname
        // 获取当前添加的商品的名称 由于有2个不同的地方使用了此组件，因此要根据不同情况来获取cur_food
        cur_name = this.props.curGood ? this.props.curGood.name : e.target.parentNode.parentNode.parentNode.childNodes[0].innerText
        // 数据中所有商店信息
        goods = this.props.alldatas.monitor_goodnum.goodDatas.cur_good
        // 从数据中取得当前相关信息
        cur_good = this.filterCateAndFood(goods,cur_shopname,leftTitle,cur_name)
        this.props.subNum(cur_good[0])

        this.$axios.post('https://www.lengendliu.cn:3002/submitData',{
            username:getCookie('nickname'),
            currentGood:cur_good[0]
        }).then((res,err) => {
            if (err) {
                console.log(err)
            } else {
                const {data} = res
            }
        })
        // event对象只在事件发生的过程中才有效,在延时函数里event一些方法会失效
        setTimeout(() => {
            // 对cur_good数组的空值进行清理
            this.props.initAddSub()
        }, 0)
    }

    // 函数防抖
    debounce = (fn, delay) => {
        // 使用闭包保存上一次的timer 每隔delay时间才能再次执行 若再次点击时候时间不足则重新开始计时
        let timer
        return function () {
            if (timer) clearTimeout(timer)
            timer = setTimeout(fn, delay)
        }
    }
    // 函数节流
    throttle = (fn, delay) => {
        // 不管怎样点击，需要等到时间足够才会执行一次
        let {lastTime} = this.state
        // 注意return后上下文环境会发生改变
        let that = this
        return function () {
            let nowTime = new Date().getTime()
            if (nowTime - lastTime >= delay) {
                fn()
                lastTime = nowTime
                that.setState({
                    lastTime: lastTime
                })
            }
        }

    }
    // 生成小球及相关div
    createBallElement = (parentNode, outer_classname, inner_classname) => {
        let outerDiv = document.createElement('div')
        let innerDiv = document.createElement('div')
        innerDiv.setAttribute('class', inner_classname)
        outerDiv.setAttribute('class', outer_classname + ' hidden')

        outerDiv.appendChild(innerDiv)
        innerDiv = null
        parentNode.appendChild(outerDiv)
        return outerDiv
    }

    // 让小球运动到底部购物车
    // 方法一：<div className="outer">
    //            <div className="inner"></div>
    //        </div>
    // 原理：让outer进行水平位移，inner自身进行垂直方向位移-》实际上inner就会呈现曲线运动效果，当然outer要设置无背景或背景透明
    ballAnimate = (eventElement) => {
        if (eventElement.target.className !== 'add') return
        // 运动起始位置
        const {clientX, clientY} = eventElement
        // 运动终点 -》购物车
        const {cartLeft, cartTop} = this.props
        // 先生成运动元素
        this.createBallElement(this._addSpan, 'outer', 'inner')
        // 获取运动元素
        let outerDiv = document.querySelector('.outer'),
            innerDiv = document.querySelector('.inner')

        // 坐标差
        let leftDis = cartLeft + 20 - clientX,
            topDis = cartTop - clientY

        // 是以下代码导致的页面闪烁 -- 发生了重绘
        // outerDiv.style.left = clientX + 'px'
        // outerDiv.style.top = clientY + 'px'
        // 开始运动
        outerDiv.classList.remove('hidden')
        setTimeout(() => {
            innerDiv.setAttribute('style', `transform: translateY(${topDis}px)`)
            outerDiv.setAttribute('style', `transform: translateX(${leftDis}px);`)
            // 小球运动完成后需要回到原点
            setTimeout(() => {
                // 注意这里清除outDiv的时间不能少于运动持续的时间，否则看不到小球的完整运动
                // 如果其他小球运动还没有完成，就执行removeChild，会报错
                // 所以不能直接移除outerDiv，应该使用类名控制显示否
                //this._addSpan.removeChild(outerDiv)
                outerDiv.classList.remove('outer')
                outerDiv.classList.add('hidden')
                innerDiv.classList.remove('inner')
            }, 500)
        }, 10)

    }

    render() {
        return (
            <div className={'controlNum'}>
                <span className={`sub ${(this.props.curNum>0)?'':'visible_none'}`} onClick={(e) => {
                    this.debounce(this.subItem(e), 200)
                }
                    // 直接调用debounce函数，形成闭包会保存timer的状态
                    // 这里使用防抖，感觉用户体验并不好
                }></span>
                <span className={`num ${(this.props.curNum>0)?'':'visible_none'}`}>{this.props.curNum}</span>
                <span className={'add'} onClick={
                    (e) => {
                        // 若用户未登录就要将商品加入购物车，需提示用户先登录
                        if(getCookie('isLogin')){
                            this.throttle(this.addItem.bind(this, e), 600)()
                        }else{
                            // 提示用户先登录
                            this.props.history.replace('/toLogin')
                        }
                        // 注意这里在函数里返回和直接调用this.debounce是不一样的,这里相当于每次都重新调用throttle函数，因此默认每次的lastTime会被初始化

                    }
                } ref={(oneref) => {
                    this._addSpan = oneref
                }}></span>
            </div>
        );
    }


}

// 在使用withRouter解决更新问题的时候，一定要保证withRouter在最外层
export default withRouter(connector(AddOrSub));
