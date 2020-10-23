import React, {Component} from 'react';
import connector from "../../../utils/connect"

import Loading from "../loading/loading"
import './index.css'

class Turncard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickState:false, // 记录是否处于抽奖状态
            num:3, // 剩余抽奖次数
            arr:[4,2,9,8,5,6,7,3,1], // 代表封面图片顺序
            arr_rel:[4,2,9,8,5,6,7,3,1] // 代表底下图片顺序
        }
    }

    // 初始化卡片状态
    initCard = () => {
        if((!this.state.clickState) || this.state.num < 1)return
        const allSpan = document.querySelectorAll('.turncard>span'),
            len = allSpan.length
        for (let i = 0; i < len; i++) {
            allSpan[i].style.transform = 'rotateY(0deg)'
            allSpan[i].style.opacity = '1'
            allSpan[i].childNodes[1].style = 'animation:cover_img 1s forwards'
        }
        setTimeout(() => {
            this.setState({
                clickState:false,
                arr:this.randomPos(this.state.arr),
                arr_rel:this.randomPos(this.state.arr_rel)
            })
        },1000)

    }


    // 在初始化时候需要对卡片重新排放
    randomPos = (arr=[]) => {
        return arr.sort(() => {
            return Math.random()>.5?-1:1
        })
    }
    turnCard = (tar) => {
        if(this.state.clickState)return
        if (tar.nextSibling && tar.tagName.toUpperCase() === 'IMG') {
            tar.parentNode.style.transform = 'rotateY(180deg)'
            tar.nextSibling.style = 'animation:rel_img 1s forwards;'
            // 点击翻牌之后，其他牌自动翻转
            setTimeout(() => {
                const allSpan = document.querySelectorAll('.turncard>span'),
                    len = allSpan.length
                for (let i = 0; i < len; i++) {
                   if(allSpan[i] === tar.parentNode){
                       continue
                   }
                   allSpan[i].style.transform = 'rotateY(180deg)'
                   allSpan[i].style.opacity = '.5'
                   allSpan[i].childNodes[1].style = 'animation:rel_img 1s forwards;'
                }
                alert(`恭喜获得${tar.nextSibling.getAttribute('index')}元代金券`)
                // 翻牌完毕之后才能初始化按钮状态
                setTimeout(() => {
                    this.setState({
                        clickState:true,
                        num:this.state.num -=1
                    })
                },500)
            }, 1000)
        }
    }

    render() {
        return (
            <div>
                <Loading></Loading>
                <div className={'turncard'} onClick={(e) => {
                    this.turnCard(e.target)
                }}>
                    <h2>{this.state.num>0?`你共有${this.state.num}次翻牌机会`:'抱歉，翻牌次数已用完!'}</h2>
                    {this.state.arr.map((item,index) => {
                        return (
                            <span key={index}>
                            <img src={require(`../../../assets/images/turncard/cover/${item}.png`)} alt=""/>
                            <img src={require(`../../../assets/images/turncard/the_real/${this.state.arr_rel[index]}.png`)} index={this.state.arr_rel[index]} alt=""/>
                        </span>)
                    })}
                    <button onClick={this.initCard} className={((!this.state.clickState) || this.state.num < 1)?'grey':null}>再来一次</button>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.props.getUrl(window.location.hash.split("#")[1])
    }
}

export default connector(Turncard);
