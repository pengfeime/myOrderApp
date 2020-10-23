import React, {Component} from 'react';
import districtClass from "../../utils/city.js"
import connector from "../../utils/connect"
import {NavLink} from "react-router-dom"

import './index.css'

class GetCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_address: '', // 用于存放收货地址
            cur_index: 0, // 当前选中title的序号
            cur_proInd: '', //当前省份index
            cur_proVal: '', //当前省份name
            cur_cityInd: '', //当前城市index
            cur_cityVal: '', //当前城市name
            cur_city: '', // 当前城市包含的县区，需要考虑地级市不存在县区
            cur_counVal: '', //选中的县区
            isShow: false // 中间选中块是否显示
        }
    }

    // 获取dom元素
    $ = (elename) => {
        // 为区分，传入的参数必须是'#id','.class','tagname'之类的
        const firstChar = elename.substring(0, 1)
        switch (firstChar) {
            case '#':
                return document.getElementById(elename.substring(1))
            case '.':
                return document.getElementsByClassName(elename.substring(1))
            default:
                return document.getElementsByTagName(elename)
        }
    }
    // 省份列表
    getProvince = () => {
        this.setState({
            cur_proVal: '',
            cur_cityVal: '',
            cur_counVal: ''
        })
        this._wrap.innerHTML = ''
        this._countitle.classList.remove('titleSelect')
        this._citytitle.classList.remove('titleSelect')
        this._provtitle.classList.add('titleSelect')
        // 获取所有省份并以列表形式渲染
        let df = document.createDocumentFragment()
        const len = districtClass.length
        for (let i = 0; i < len; i++) {
            let Li = document.createElement('li')
            Li.innerText = districtClass[i].name
            Li.index = i
            df.appendChild(Li)
        }
        this._wrap.appendChild(df)
    }

    // 为省份列表的li添加点击事件
    showArea = (e) => {
        e = e || window.event
        const target = e.target || e.srcElement
        const {index} = e.target
        let cur_titleInx
        // 获取三个标题
        const titles = this.$('.title')
        const len = titles.length
        if (target && target.nodeName.toUpperCase() === 'LI') {
            // 要知道当前区域是省、市区、还是县区
            for (let i = 0; i < len; i++) {
                if (titles[i].classList.contains('titleSelect')) {
                    cur_titleInx = i
                    break
                }
            }
            // 根据不同的标题执行不同的函数
            switch (cur_titleInx) {
                case 0:
                    return this.showCity(index)
                case 1:
                    return this.showCounties(index)
                case 2:
                    return this.selectCounties(index)
                default:
                    return this.getProvince()

            }

        }

    }

    showCity = (pro_index) => {
        // 先清空wrap内容
        this._wrap.innerHTML = ''
        this._countitle.classList.remove('titleSelect')
        this._provtitle.classList.remove('titleSelect')
        this._citytitle.classList.add('titleSelect')
        let df = document.createDocumentFragment()
        const cities = districtClass[pro_index].city
        const len = cities.length
        this.setState({
            cur_index: 1,
            cur_proInd: pro_index,
            cur_proVal: districtClass[pro_index].name
        })
        for (let i = 0; i < len; i++) {
            let Li = document.createElement('li')
            Li.innerText = cities[i].name
            Li.index = i
            df.appendChild(Li)
        }
        this._wrap.appendChild(df)
    }

    // 根据市区获取县区
    showCounties = (city_index) => {
        this._wrap.innerHTML = ''
        this._provtitle.classList.remove('titleSelect')
        this._citytitle.classList.remove('titleSelect')
        this._countitle.classList.add('titleSelect')
        let df = document.createDocumentFragment()

        const counties = districtClass[this.state.cur_proInd].city[city_index].districtAndCounty
        const len = counties.length

        this.setState({
            cur_index: 2,
            cur_cityInd: city_index,
            cur_cityVal: districtClass[this.state.cur_proInd].city[city_index].name,
            cur_city: districtClass[this.state.cur_proInd].city[city_index].districtAndCounty
        })
        for (let i = 0; i < len; i++) {
            let Li = document.createElement('li')
            Li.innerText = counties[i]
            Li.index = i
            df.appendChild(Li)
        }
        this._wrap.appendChild(df)
    }

    // 选择县区
    selectCounties = (index) => {
        this.setState({
            //cur_index: 0,
            cur_counVal: this.state.cur_city[index]
        })

    }
    // 手动点击title标签
    selectTit = (e) => {
        // 只能在下级往上一级点击 counties -> city -> province
        e = e || window.event
        const target = e.target || e.srcElement
        if (target && target.nodeName.toUpperCase() === 'SPAN') {
            switch (this.state.cur_index) {
                // 注意下划线样式
                // 当前若是省/市级目录
                case 0 || 1:
                    if (target === this._provtitle) {
                        this.setState({
                            cur_index: 0
                        }, () => {
                            return this.getProvince()
                        })
                    }
                    break
                // 当前县级目录
                case 2:
                    if (target === this._provtitle) {
                        this.setState({
                            cur_proInd: '', //当前省份index
                            cur_proVal: '', //当前省份name
                            cur_cityInd: '', //当前城市index
                            cur_cityVal: '', //当前城市name
                            cur_city: '', // 当前城市包含的县区，需要考虑地级市不存在县区
                            cur_counVal: '', //选中的县区
                            cur_index: 0
                        }, () => {
                            return this.getProvince()
                        })
                    } else if (target === this._citytitle) {
                        this.setState({
                            cur_cityInd: '', //当前城市index
                            cur_cityVal: '', //当前城市name
                            cur_city: '', // 当前城市包含的县区，需要考虑地级市不存在县区
                            cur_counVal: '', //选中的县区
                            cur_index: 1
                        }, () => {
                            return this.showCity(this.state.cur_proInd)
                        })
                    } else break
                default:
                    return
            }

        }
    }

    showAddress = () => {

        // 需要保存展开前后状态 --暂未实现
        if (!this.state.isShow) {
            // 需要展开
            this.setState({
                isShow: true
            }, () => {
                // 需要先加载所有省份
                this.getProvince()
            })
        } else {
            this._wrap.innerHTML = ''
            this.setState({
                isShow: false
            })
        }

    }

    submit = () => {
        this._con.innerHTML = ''
        sessionStorage.setItem('address', this.state.cur_proVal + this.state.cur_cityVal + this.state.cur_counVal)
        this.setState({
            isShow: false,
            cur_index: 0,
            cur_address: this.state.cur_proVal + this.state.cur_cityVal + this.state.cur_counVal
        })
    }

    clearText = () => {
        this._address.innerText = ''
        this.setState({
            cur_index: 0, // 当前选中title的序号
            cur_proInd: '', //当前省份index
            cur_proVal: '', //当前省份name
            cur_cityInd: '', //当前城市index
            cur_cityVal: '', //当前城市name
            cur_city: '', // 当前城市包含的县区，需要考虑地级市不存在县区
            cur_counVal: '', //选中的县区
        }, () => {
            this._citytitle.classList.remove('titleSelect')
            this._countitle.classList.remove('titleSelect')
            this._provtitle.classList.add('titleSelect')
            this.getProvince()
        })
    }

    // 返回首页
    turnHome = () => {
        // 矫正路由
        this.props.getUrl('/')
    }
    // 展开或折叠列表框
    unfold = () => {
        if(!(this._foldimg.classList.contains('folding'))){
            // 当前是折叠状态--可展开
            this._foldimg.classList.add('folding')
            this._fold.innerText = '收起'
        }else{
            this._foldimg.classList.remove('folding')
            this._fold.innerText = '展开'
        }
    }

    render() {
        return (
            <div className={'getCountry'}>
                {/*fieldset 元素可将表单内的相关元素分组*/}

                <div className="toAddress" onClick={this.showAddress}>
                    <span>
                        {
                            sessionStorage.getItem('address') ? sessionStorage.getItem('address') : (!!this.state.cur_address ? this.state.cur_address : (sessionStorage.getItem('province')?sessionStorage.getItem('province'):'') + (sessionStorage.getItem('city')?sessionStorage.getItem('city'):''))
                        }

                    </span>
                    <div className="fold" onClick={
                        // 事件触发，就能获取到 event 对象，其中主要就是 event.target 就是当前触发事件的 dom 对象 event 在 onclick触发的函数中 中作为了参数，内存中没有清除，执行executeDispatchesAndRelease 方法释放 event.target 的值 event 为引用类型，一处改变，所有用到的地方都会改变。导致只有点击的一瞬间可以获取到event。
                        (e) => {
                            // 这是正确传递e的方法
                            const target = e.currentTarget
                            this.unfold(target)
                        }}>
                        <span ref={(f) => {
                            this._fold = f
                        }}>展开</span>
                        <i className={'unfold'} ref={(u) => {
                            this._foldimg = u
                        }}></i>
                    </div>
                </div>


                {this.state.isShow && <div className={"Wrap"} ref={(w) => {
                    this._con = w
                }}>
                    <div className={"show_address"}>
                            <span>
                                您选择的是：
                                <strong ref={(s) => {
                                    this._address = s
                                }}>
                            {this.state.cur_proVal + this.state.cur_cityVal + this.state.cur_counVal}
                                </strong>
                            </span>
                        <div>
                            <span className="confirm" onClick={this.submit}></span>
                            <span className="clear" onClick={this.clearText}></span>
                        </div>
                    </div>
                    <div className="area_class" onClick={this.selectTit}>
                            <span className={'title prov'} ref={(p) => {
                                this._provtitle = p
                            }}>省份</span>
                        <span className={'title city'} ref={(c) => {
                            this._citytitle = c
                        }}>城市</span>
                        <span className={'title counties'} ref={(c) => {
                            this._countitle = c
                        }}>县区</span>
                    </div>
                    <div className={"adds_wrap"} ref={(wrap) => {
                        this._wrap = wrap
                    }} onClick={this.showArea}>
                    </div>
                </div>}

                {/*收货地址*/}
                {!this.state.isShow &&
                <div className={"receive"}>
                    <p>收货地址</p>
                    <div className="addr_list">
                        <NavLink onClick={this.turnHome} to={{
                            pathname: '/',
                            state: {
                                address: (!!this.state.cur_address ? this.state.cur_address : sessionStorage.getItem('province') + sessionStorage.getItem('city'))
                            }
                        }}>
                            <div>
                                {
                                    sessionStorage.getItem('address') ? sessionStorage.getItem('address') : (!!this.state.cur_address ? this.state.cur_address : (sessionStorage.getItem('province')?sessionStorage.getItem('province'):'') + (sessionStorage.getItem('city')?sessionStorage.getItem('city'):''))
                                }
                            </div>
                        </NavLink>
                        <div className="editor" onClick={this.showAddress}></div>
                    </div>
                </div>}


            </div>
        );
    }

    componentDidMount() {
        this.props.getUrl(window.location.pathname)
    }
}

export default connector(GetCountry)
