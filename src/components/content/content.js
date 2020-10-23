import React, {Component} from 'react';
import {Route, Prompt, NavLink} from 'react-router-dom'
import connector from "../../utils/connect"
import {message} from "antd"
import Pushpage from "./pushpage/pushpage"
import Category from "../category/category"

import Routes from "../../routes/index"
import './content.css'
import deepClone from "../../utils/deepclone"
import getCookie from "../../utils/get_cookie"

class Con extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(window.sessionStorage.getItem('allShop')) || {},
            len: window.sessionStorage.getItem('allShop') ? JSON.parse(window.sessionStorage.getItem('allShop'))['eatery'][0].shop_info.length : 0, // 商店数量
            refreshing: false, // 刷新中
            refreshed: false,  // 刷新完毕
            loading: false,  // 加载中
            loaded: false,  // 加载完毕
            shopIndex: 6, // 告知pushpage页面需要显示商店到序号为6
            logining:false, // 正在登录
            logined:false // 登录成功
        }
    }

    // 先给图片加初始化样式
    initStyle = () => {
        let refName = Object.keys(this.refs)
        refName = refName.filter((x) => {
            return /\_img/.test(x)
        })
        const len = refName.length
        if (this.imgLiClass.length) {
            // 将储存的样式赋值给对应的li
            this.imgLiClass.map((item) => {
                this.refs[`_img${item.uid}`].className = item.className
                this.refs[`_img${item.uid}`].style.cssText = item.cssText
            })
        } else {
            // 把第三张当做最中间一张
            if (this.refs._img4) {
                this.refs._img0.classList.add('last_two')
                this.refs._img1.classList.add('last_one')
                this.refs._img2.classList.add('first')
                this.refs._img3.classList.add('second')
                this.refs._img4.classList.add('third')
                for (let i = 0; i < len; i++) {
                    if (!this.refs[refName[i]].classList.length) {
                        this.refs[refName[i]].classList.add('other')
                    }
                }
            }
        }

    }
    // 滑动图片和圆点
    slide = (flag = true) => {
        let cur_class, copy_class // cur_class用来保存当前未被前一个图片样式所覆盖的样式，copy_class用来临时储存当前的未被覆盖的样式
        // flag是一个表示向前或向后的变量true-right,false-left
        // 遍历图片获取样式
        let refName = Object.keys(this.refs), imgArr = [], nextImgInd
        refName = refName.filter((x) => {
            return /\_img/.test(x)
        })
        const len = refName.length
        // 将需要的dom元素过滤成一个数组
        for (let i = 0; i < len; i++) {
            // 使用getattribute获取元素自定义属性
            imgArr.push({
                refDom: this.refs[refName[i]],
                uid: this.refs[refName[i]].getAttribute('uid')
            })
        }

        imgArr.map((item, index) => {
            // 先清空运动样式
            item.refDom.style.cssText = ''
            if (!!flag) {
                //图片向右滑动
                nextImgInd = item.uid - 1
                nextImgInd = (nextImgInd < 0) ? nextImgInd + len : nextImgInd
                // 添加运动
                imgArr[nextImgInd].refDom.className !== 'other' && (item.refDom.style.cssText = 'transition:.5s;')
                if (!cur_class) {
                    // 注意classlist不是数组！！直接修改给classlist是浅拷贝！classlist.item方法可以获取集合中指定位置class样式类名称。参数是一个数字，表示样式类名称在集合中的位置，从0开始计算
                    // cur_class = item.refDom.classList.item(0)
                    cur_class = item.refDom.className
                    item.refDom.className = imgArr[nextImgInd].refDom.className
                } else {
                    copy_class = item.refDom.className
                    item.refDom.className = cur_class
                    cur_class = copy_class
                }
            } else {
                // 向左滑动 注意这里的uid是字符串，不能直接+1
                nextImgInd = item.uid * 1 + 1
                nextImgInd %= len

                // 图片向左滑动
                // 先添加运动样式
                !(item.refDom.className === 'other' && imgArr[nextImgInd].refDom.className === 'other') && (item.refDom.style.cssText = 'transition:.5s;')
                if (!cur_class) {
                    // 表示刚开始运动/换类名 只需储存第一个发现运动的类名并在最后一次类名赋值将储存的第一个类名交给其后一个
                    cur_class = item.refDom.className
                    item.refDom.className = imgArr[nextImgInd].refDom.className
                } else {
                    // 表示已经开始换类名了
                    // 判断是不是最后一次交换类名
                    if (index === len - 1) {
                        item.refDom.className = cur_class
                    } else {
                        item.refDom.className = imgArr[nextImgInd].refDom.className
                    }
                }
            }
            // 把下一个元素的样式给当前元素
            // 注意className和classList的区别，className一个字符串而classList是一个对象
            // 需要知道最中间一个图片的序号
            if (item.refDom.className === 'first') {
                this.cur_index = item.uid
            }
        })

        // 储存当前的所有图片li的样式
        imgArr.map((item) => {
            this.imgLiClass.push({
                uid: item.uid,
                className: item.refDom.className,
                cssText: item.refDom.style.cssText
            })
        })

    }
    // 图片向右播放
    imgToRight = () => {
        let {nowTime} = this
        if (new Date().getTime() - nowTime > 500) {
            this.nowTime = new Date().getTime()
            this.slide(false)
            this.curPointClass(this.cur_index)
        }
    }

    // 图片向左播放
    imgToLeft = () => {
        let {nowTime} = this
        if (new Date().getTime() - nowTime > 500) {
            this.nowTime = new Date().getTime()
            this.slide(true)
            this.curPointClass(this.cur_index)
        }
    }

    // 给当前图片对应的点添加样式
    curPointClass = (index) => {
        if (Object.keys(this.refs).length === 0) return
        let refName = Object.keys(this.refs)
        refName = refName.filter((x) => {
            return /\_point/.test(x)
        })
        const len = refName.length
        for (let i = 0; i < len; i++) {
            this.refs[refName[i]].classList.contains('current_point') && this.refs[refName[i]].classList.remove('current_point')
        }
        // 这里的`_point${len-index-1}`是因为图片布局时候未考虑播放时候点的左右变换，芝士味让轮播效果更自然（忽略就好）
        this.refs[`_point${index}`].classList.add('current_point')
    }
    // 自动轮播
    autoPlay = (play = true) => {
        this.timer && clearInterval(this.timer)
        if (play) {
            this.timer = setInterval(this.imgToRight, 4000)
        } else {
            this.timer = null
        }
    }

    // 停止轮播
    stopPlay = (e) => {
        e = e || window.event
        const target = e.target || e.srcElement
        if (target.nodeName.toUpperCase() === 'SPAN') return
        clearInterval(this.timer)
    }
    // 开始轮播
    beginPlay = (e) => {
        e = e || window.event
        const target = e.target || e.srcElement
        if (target.nodeName.toUpperCase() === 'SPAN') return
        this.autoPlay()
    }
    // 设定函数执行次数
    executeCount = (fn, count = 1) => {
        for (let i = 0; i < count; i++) {
            fn()
        }
    }
    // 点击小圆点应该跳至相应的图片
    jumpPoint = (e) => {
        e = e || window.event
        const target = e.target || e.srcElement
        if (target.nodeName.toUpperCase() === 'LI') {
            // 点击时给被点击圆点样式
            this.curPointClass(target.getAttribute('ukey'))
            // 图片也需要对应跳转 如何实现？--还是使用slide函数
            const nextImgInd = target.getAttribute('ukey')
            const disIndex = (nextImgInd - this.cur_index) * 1
            if (disIndex > 0) {
                // 图片向右滑动
                this.executeCount(this.slide.bind(this, true), disIndex)
            } else if (disIndex < 0) {
                // 图片向左滑动
                this.executeCount(() => {
                    this.slide(false)
                }, -disIndex)
            } else return
        }
    }

    // 根据滚动刷新或加载更多
    listenScroll = (currentTarget, deltaY) => {
        if (window.location.pathname !== ('' || '/')) return
        const font = parseInt(document.documentElement.style.fontSize)
        // 使用图片所在div的offsetTop来判断是否处于刷新操作
        if (deltaY <= 0 && this._carousel.offsetTop === 30) {
            if (this.state.refreshing === true || this.state.loading === true) return;
            // 鼠标中键向上拉是要刷新 deltaY<=0
            // 需要产生一段空白区域
            this._refresh.style.cssText = `height:${-deltaY * font / 60}px;opacity:1;`
            message.info('页面刷新中', 1.5)
            this.setState({
                refreshing: true,
                refreshed: false
            })
            // 刷新完毕
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                    refreshed: true
                }, () => {
                    message.success('刷新成功', .5)
                    this._refresh.style.cssText = ''
                })
            }, 2000)
        }
        // 判断加载更多操作
        //clientHeight很多文章把它翻译成网页的可见高度，实际上是不太准确的，首先，从单词本身来说，client并没有可见的意思，（client 顾客,客户,委托人）。其次，clientHeight获取到的高度其实和内容可不可见没有一点关系。
        // clientHeight = (content height) + (padding top+padding bottom);
        // 就是 clientHeight = 内容实际高度 + 上下内边距。
        // 而内容实际高度可以用window.getComputeStyle(obj).height或者$(obj).css(“height”)获取。
        // 简单的来说：在网页的盒子模型中，一个元素由内到外分别由 height + padding + border + margin组成，而clientHeight只取前面的height和padding。不管内容可不可见，即使你用定位把元素移出屏幕外，clientHeight获取到的值仍然不变。
        // 加载更多
        if (deltaY > 0 && (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight * .95)) {
            if (this.state.loading || this.state.refreshing) return;
            message.info('加载中...', 1)
            this._load.style.cssText = `height:${deltaY * font / 60}px;opacity:1;`
            this.setState({
                loading: true,
                loaded: false
            })

            // 加载完毕
            setTimeout(() => {
                this._load.style.cssText = ''
                if (this.state.shopIndex >= this.state.len) {
                    this.setState({
                        loading: false,
                        loaded: true
                    }, () => {
                        message.info('别催啦，没数据啦', 1)
                    })
                } else {
                    this.setState({
                        loading: false,
                        loaded: true,
                        shopIndex: (this.state.shopIndex + 2) > this.state.len ? this.state.len : this.state.shopIndex + 2
                    }, () => {
                        message.success('加载完毕', .5)
                    })
                }
            }, 1500)
        }
    }

    // 点击图片跳转至相应页面
    linkTo = (tar) => {
        const uid = tar.parentNode.getAttribute('uid')
        // 因为引用的是对象，不能直接对对象进行修改，需要深拷贝
        let oneData = deepClone(this.state.data.eatery[uid])
        let shop_info = oneData.shop_info[uid]
        oneData.shop_info = shop_info
        // sessionStorage储存数据
        window.sessionStorage.setItem('currentShop', JSON.stringify(oneData))
        // 跳转
        this.props.history.push('/moreInfo/addFood')
    }

    guestMode = () => {
        this.$axios.get('https://www.lengendliu.cn:3002/guestLogin',{withCredentials: true})
            .then((res) => {
                this.setState({
                    logined:true
                },() => {
                    message.info('游客模式登录中..',1)
                    this.setState({
                        logining:true
                    })
                    this._cover.style.display = 'block'
                    this._con.classList.add('blur')
                    setTimeout(() => {
                        this.setState({
                            logining:false,
                            logined:true
                        })
                        message.success('游客模式登录成功',1)
                        this._cover.style.display = 'none'
                        this._con.classList.remove('blur')
                        // 在这里手动更新跳转后路由
                        this.props.getUrl('/')
                    },2000)

                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className={"content"} ref={(c) => {
                this._con = c
            }}>
                {/*// 占位空白div*/}
                <div className="blank"></div>
                {/*组件才能传值！！*/}
                {
                    Routes.map((item, index) => {
                        return (
                            <Route path={item.path} key={index} render={(props) => {
                                return (<item.component {...props}/>)
                            }}></Route>
                        )
                    })
                }

                {/*这个prompt弹窗样式有点丑  --使用prompt插件来监听用户是否在刷新或者获取数据过程中跳转页面，使用antd的modal插件来自定义弹窗样式
                Prompt接受两个属性，message可以是字符串或方法，方法返回true就顺利跳转，返回字符串就弹窗阻止跳转。还有个属性when,是boolean值，true就是弹窗，false为顺利跳转。
                在react-router-dom的BrowserRouter和HashRouter上有属性getUserConfirmation可以阻止默认弹窗。 --在app主组件里设置

                */}

                <Prompt
                    message={location => `页面正处于${this.state.refreshing ? '刷新' : '加载'}状态，您确定要离开吗？`}
                    when={this.state.refreshing || this.state.loading || this.state.logining}
                />

                {/*这里试着手动写轮播图*/}
                {
                    (window.location.hash === '#/') && (<div>
                            <div className={'wheeldiv'} onWheel={(e) => {
                                const {currentTarget, deltaY} = e
                                this.listenScroll(currentTarget, deltaY)
                            }}>
                                <div className="refresh" ref={(r) => {
                                    this._refresh = r
                                }}>
                                    <div>
                                        <i></i>
                                        <h3>下拉刷新</h3>
                                    </div>
                                </div>


                                {/*// 首页轮播图部分*/}
                                <div className="carousel" onMouseOver={this.stopPlay} onMouseOut={this.beginPlay}
                                     ref={(c) => {
                                         this._carousel = c
                                     }}>
                                    {/*图片部分*/}
                                    <div className="carousel_img">
                                        <ul onClick={(e) => {
                                            const {target} = e
                                            this.linkTo(target)
                                        }}>
                                            {Object.keys(this.state.data).length > 0 && this.state.data['eatery'].map((item, index) => {
                                                return (
                                                    <li key={item.id} uid={item.id} ref={`_img${item.id}`}>
                                                        {/*注意这里require引入图片必须是字符串形式*/}
                                                        <img
                                                            src={require('../../' + (item.shop_info[item.id].shopinfo))}
                                                            alt=""/>
                                                    </li>)
                                            })}
                                        </ul>
                                    </div>
                                    {/*图片下面表示顺序的点*/}
                                    <div className="carousel_point" onClick={this.jumpPoint}>
                                        <ul>
                                            {Object.keys(this.state.data).length > 0 && (new Array(this.state.data['eatery'].length).fill('')).map((item, index) => {
                                                    return (
                                                        <li key={index}
                                                            ref={`_point${new Array(this.state.data['eatery'].length).fill('').length - 1 - index}`}
                                                            className={'point_li'}
                                                            ukey={new Array(this.state.data['eatery'].length).fill('').length - 1 - index}>
                                                        </li>
                                                    )
                                                }
                                            )}
                                        </ul>
                                    </div>
                                    {/*左右点击图标*/}
                                    <span className="previous" onClick={this.imgToLeft}>
                                <span></span>
                            </span>
                                    <span className="nextone" onClick={this.imgToRight}>
                                <span></span>
                            </span>
                                </div>
                                {/*分类组件*/}
                                {(window.location.hash === '#/') && (
                                    <Category></Category>
                                )}

                                {
                                    Object.keys(this.state.data).length > 0 && (window.location.hash === '#/') && (
                                        <Pushpage shopIndex={this.state.shopIndex}></Pushpage>)
                                }
                                <div className={"loadmore"} ref={(l) => {
                                    this._load = l
                                }}>
                                    <div>
                                        <i></i>
                                        <h3>加载更多</h3>
                                    </div>
                                </div>

                                {/*登录提示*/}
                                {(!getCookie('isLogin')) &&
                                <div className="toLogin">
                                    <NavLink to={'/login_pwd'}>
                                        <div className="loginInfo">
                                            <span>如果你不登录，我就霸占这里</span>
                                            <span ref={(s) => {
                                                this._login = s
                                            }} onMouseOver={() => {
                                                this._login.classList.add('span_hover')
                                            }} onMouseLeave={() => {
                                                this._login.classList.remove('span_hover')
                                            }}>马上登录</span>
                                        </div>
                                    </NavLink>


     {/*下一步，如何在这里开启游客模式*/}

                                    <span ref={(y) => {
                                        this._randomLogin = y
                                    }} onClick={this.guestMode} onMouseOver={() => {
                                        this._randomLogin.classList.add('span_hover')
                                    }} onMouseLeave={() => {
                                        this._randomLogin.classList.remove('span_hover')
                                    }}>游客模式</span>
                                </div>}

                            </div>
                        </div>
                    )}

                {/*遮罩层*/}
                <div className="covering" ref={(c) => {
                    this._cover = c
                }}>

                </div>
            </div>
        );

    }


    componentDidMount() {
        sessionStorage.setItem('cur_nav', JSON.stringify({
            refName: 'deliv',
            checked: 'checked',
            addClass: 'delive_sel'
        }))
        if (Object.keys(this.state.data).length) {
            if (window.location.hash === '#/') {

                this.imgLiClass = [] // 用于储存当前图片li的样式
                this.cur_index = 2 // 默认第3张图片是最中间的
                this.nowTime = null // 存储当前时间
                this.timer = null // 定时器
                // 初始化图片排列
                this.initStyle()
                // 页面初始的中间图片对应的点
                this.curPointClass(this.cur_index)
                // 自动轮播
                this.autoPlay()
            }
        } else {
            this.$axios.get('https://www.lengendliu.cn:3002/restaurantInfo')
                .then((res) => {
                    // 注意这里代码的顺序，要先设置localstorage再setstate
                    this.props.getInfo(res.data.mockData)
                    window.sessionStorage.setItem('allShop', JSON.stringify(res.data.mockData))
                    this.setState({
                        data: res.data.mockData,
                        len: res.data.mockData['eatery'][0].shop_info.length
                    }, () => {
                        if (window.location.hash === '#/') {
                            this.imgLiClass = [] // 用于储存当前图片li的样式
                            this.cur_index = 2 // 默认第3张图片是最中间的
                            this.nowTime = null // 存储当前时间
                            this.timer = null // 定时器
                            //初始化图片排列
                            this.initStyle()
                            // 页面初始的中间图片对应的点
                            this.curPointClass(this.cur_index)
                            // 自动轮播
                            this.autoPlay()
                        }

                    })
                })
                .catch((err) => {
                    message.info('小e崩溃了，请刷新页面或检查网络')
			console.log('err',err)
                    window.sessionStorage.removeItem('cur_nav')
                    this.props.history.push('/notfind')
                })
        }

        // 如果从App根组件跳转过来，则数据已经挂载到this.props.alldatas上,可以直接使用
        // 若刷新了search页面，则this.props.alldatas.shopInfo_reducer为｛｝,需要重新请求数据
    }

    componentDidUpdate() {
        if (window.location.hash !== '#/') {
            this.autoPlay(false)
        } else {
            // sessionStorage.setItem('cur_nav', JSON.stringify({
            //     refName: 'deliv',
            //     checked: 'checked',
            //     addClass: 'delive_sel'
            // }))
            if (!this.timer) {
                this.imgLiClass = [] // 用于储存当前图片li的样式
                this.cur_index = 2 // 默认第3张图片是最中间的
                this.nowTime = null // 存储当前时间
                this.timer = null // 定时器
                this.initStyle()
                // 页面初始的中间图片对应的点
                this.curPointClass(this.cur_index)
                this.autoPlay(true)
            }
        }
    }
}

export default connector(Con);
