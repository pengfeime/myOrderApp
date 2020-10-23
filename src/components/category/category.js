import React, {Component} from 'react';
import {NavLink} from "react-router-dom"

import './index.css'

class Category extends Component {
    constructor(props) {
        super(props);
    }
    // 清除拥有动画的元素
    clearAnimation = () => {
        let wrapArr = document.querySelectorAll('.wrapDiv'),
            len = wrapArr.length;
        if(!len)return;
        for(let i=0;i<len;i++){
            wrapArr[i].parentNode.removeChild(wrapArr[i])
        }
    }
    // 监视生成的金币数量
    listenGoldNum = () => {
        // 这里为何切换页面后返回首页会有this._imgdiv == null的情况？？  --定时器变量问题，卸载前一定要清空定时器setInterval
        // 先清除掉运动完成的金币--可根据opacity判断
        const wrapArr = document.querySelectorAll('.wrapDiv'),
              len = wrapArr.length
        let runOutNum = 0  // 用于存放运动完的金币数量
        for(let i=0;i<len;i++){
            if(getComputedStyle(wrapArr[i]).opacity === '0'){
                // 清除掉运动完成的金币
                wrapArr[i].parentNode.removeChild(wrapArr[i])
                runOutNum +=1
            }
        }
        // 不需要补充金币
        if((!runOutNum)&&len === 30)return;
        // 屏幕中金币数量少于20个，需要重新生成金币
        this.createGold(this._imgdiv,'wrapDiv','goldDiv',runOutNum+30-len)
    }
    // 生成一定金币的函数
    createGold = (parentNode,outerClass,innerClass,num=30) => {
        const fragNode = document.createDocumentFragment()
        const div = document.createElement('div')
        for(let i=0;i<num;i++){
            // cloneNode()方法可以复制一个节点，该方法能够给节点创建一个副本。
            // 	var ele = node.cloneNode(deep);
            // 		deep是一个逻辑值：
            // 			参数值为true时，复制的节点将包含多有子节点内容；
            // 			参数值为false时，赋值的节点仅包含指定对象本身，不包含任何子节点。如果被复制的节点时一个元素节点，
            // 		其包含的所有文本将不会被父子，因为这些文本是一个节点，但是属性节点将被复制。
            // 	cloneNode()方法复制的新节点与被复制节点具有一样的nodeName和nodeType属性
            let wrapDiv = div.cloneNode(false),
                goldDiv = div.cloneNode(false)
            wrapDiv.classList.add(outerClass)
            goldDiv.classList.add(innerClass)
            // 给不同的金币不同的贝塞尔曲线
            const randomCubicGold = `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`
            const randomCubicWrap = `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`
            // 随机运动时间、推迟时间
            const duration = 1+Math.random(),
                  delay =Math.random()*0.5
            wrapDiv.style.cssText = `left:${2+Math.random()*98}%;animation-timing-function:${randomCubicWrap};animation-duration:${duration}s;animation-delay:${delay}s;`
            goldDiv.style.cssText = `animation-timing-function:${randomCubicGold};animation-duration:${duration}s;animation-delay:${delay}s;`
            wrapDiv.appendChild(goldDiv)
            fragNode.appendChild(wrapDiv)
        }
        parentNode.appendChild(fragNode)
    }
    render() {
        return (
            <div className={'allCate'}>
                <div>
                    <h2 className="cateTitle">大杂汇</h2>
                    <hr/>
                    <ul className={'cate'}>
                        <li>
                            <div></div>
                            <div>美食</div>
                        </li>
                        <li>
                            <div></div>
                            <div>商超便利</div>
                        </li>
                        <li>
                            <div></div>
                            <div>水果</div>
                        </li>
                        <li>
                            <div></div>
                            <div>甜品饮品</div>
                        </li>
                        <li>
                            <div></div>
                            <div>汉堡披萨</div>
                        </li>
                        <li>
                            <div></div>
                            <div>炸鸡炸串</div>
                        </li>
                        <li>
                            <div></div>
                            <div>星选好店</div>
                        </li>
                        <li>
                            <div></div>
                            <div>好惠吃</div>
                        </li>
                        <li>
                            <div></div>
                            <div>快餐便当</div>
                        </li>
                        <li>
                            <div></div>
                            <div>福利中心</div>
                        </li>
                    </ul>
                </div>
                <hr/>
                <div className="advertise">
                    <div className="welfare">
                        <span>"疫"必过</span>
                        <span><NavLink to={'/getpocket'}></NavLink></span>
                        <span><NavLink to={'/getpocket'}>点我点我！</NavLink></span>
                    </div>
                    <hr/>
                    <div className="count">
                        <div>
                            <div className={'viper'}>
                                <h3>超级会员</h3>
                                <div>
                                    <span>每月享<span className={'money'}>20元</span>红包</span>
                                    <span className={"icon_vip"}></span>
                                </div>
                            </div>
                            <i className={'light'}></i>
                        </div>

                        <div>
                            <div className={'allowance'}>
                                <h3>津贴优惠</h3>
                                <div>
                                    <span><span className={'money'}>20元</span>专属补贴</span>
                                    <span className={'icon_money'}></span>
                                </div>
                            </div>
                            <i className={'light'}></i>
                        </div>

                    </div>
                    <div className="imgIntro" ref={(i) => {
                        this._imgdiv = i
                    }}>
                        {/*这里需要一个金币掉落特效*/}
                        {/*跳转至领红包页面*/}
                        <NavLink to={'/getpocket'}><span>春意朦胧,一波<span>大礼包</span>来袭 点我点我！！-》</span>
                        <div className="discount_zone">
                            <img src={require('../../assets/images/discount_0.jpg')} alt=""/>
                            <img src={require('../../assets/images/discountsjpg.jpg')} alt=""/>
                            <img src={require('../../assets/images/zongzi.jpg')} alt=""/>
                        </div>
                        </NavLink>
                    </div>
                </div>

            </div>
        );
    }

    componentDidMount(){
        this.timer = null
        this.createGold(this._imgdiv,'wrapDiv','goldDiv',30)
        this.timer = setInterval(this.listenGoldNum,1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
        // 页面卸载前需要清除动画，否则报错
        this.clearAnimation()
    }
}

export default Category;
