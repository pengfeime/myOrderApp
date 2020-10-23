import React, {Component} from 'react';
import Connector from "../../../utils/connect"
import Loading from '../loading/loading'
import './index.css'
class Turntable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onTurn:false,
            cur_deg:0
        }
    }

    // 产生‘随机’旋转角度,需要人为控制中奖概率
    generateDeg = () => {
        let randomDeg = 360 + Math.random()*720
        let ranDeg = randomDeg%360
        if(ranDeg>308.4 && ranDeg<360){
            return randomDeg
        }else{
            // 不断重新生成，重新判断来限制中奖概率
            randomDeg = 360 + Math.random()*720
            ranDeg = randomDeg/360
            if(ranDeg>257&&ranDeg<360){
                return randomDeg
            }else{
                randomDeg = 360 + Math.random()*720
                ranDeg = randomDeg/360
                if(ranDeg>205.6&&ranDeg<360){
                    return randomDeg
                }else{
                    randomDeg = 360 + Math.random()*720
                    ranDeg = randomDeg/360
                    if(ranDeg>154.2&&ranDeg<360){
                        return randomDeg
                    }else{
                        randomDeg = 360 + Math.random()*720
                        ranDeg = randomDeg/360
                        if(ranDeg>102.8&&ranDeg<360){
                            return randomDeg
                        }else{
                            randomDeg = 360 + Math.random()*720
                            ranDeg = randomDeg/360
                            if(ranDeg>51.4&&ranDeg<360){
                                return randomDeg
                            }else{
                                randomDeg = 360 + Math.random()*720
                                return randomDeg
                            }
                        }
                    }
                }
            }
        }
    }
    rotating = () => {
        if(this.state.onTurn)return
        let randomDeg = this.generateDeg()
        this.setState({
            onTurn:true,
            cur_deg:randomDeg%360
        })

        this._turntable.style.transitionDuration = '4s'
        this._turntable.style.transform = `rotate(${randomDeg}deg)`

    }

    scroll = () => {
        if(!this._zon){
            // 因为83行的延时设置定时器，导致组件卸载之后又重新触发了定时器，需要在这里清除多余的定时器
            clearInterval(this.timer)
            return
        }
        if(this._zon.scrollTop >= this._zon.scrollHeight/2){
            this._zon.scrollTop = 0
        }else{
            this._zon.scrollTop++
        }

        const fontSize = parseInt(document.documentElement.style.fontSize)
        // 如果刚刚好滚动完一条消息，需要停顿1s后再次滚动
        if(this._zon.scrollTop % fontSize === 0){
            clearInterval(this.timer)
            this.timer = null
            setTimeout(() => {
                this.timer = setInterval(this.scroll,50)
            },3000)
        }
    }

    slideUp = () => {
        this.timer = setInterval(this.scroll,50)

    }
    render() {
        return (
            <div>
                <Loading></Loading>
                <div className={'turn_table'}>
                    <div className={'turntable'} ref={(t) => {
                        this._turntable = t
                    }}>
                        <img src={require("../../../assets/images/lottery/turntable.png")} alt=""/>
                    </div>
                    <div className={'pointers'} ref={(p) => {
                        this._point = p
                    }} onClick={this.rotating}>
                        <img src={require("../../../assets/images/lottery/pointer.png")} alt=""/>
                    </div>
                </div>

                <div className="getPrize">
                    <h3>获奖区</h3>
                    <div className="prize_zon" ref={(p) => {
                        this._zon = p
                    }}>
                            <ul>
                                <li><span></span>恭喜用户aq**we获得 免单50元</li>
                                <li><span></span>恭喜用户we**fs获得 提高白条资格</li>
                                <li><span></span>恭喜用户aq**lk获得 免单10元</li>
                                <li><span></span>恭喜用户gr**sg获得 免单10元</li>
                                <li><span></span>恭喜用户nh**ht获得 免单10元</li>
                                <li><span></span>恭喜用户fg**we获得 免分期服务费用资格</li>
                                <li><span></span>恭喜用户ki**ng获得 免单5元</li>
                                <li><span></span>恭喜用户gd**fs获得 免单10元</li>
                                <li><span></span>恭喜用户aq**we获得 免单50元</li>
                                <li><span></span>恭喜用户we**fs获得 提高白条资格</li>
                                <li><span></span>恭喜用户aq**lk获得 免单10元</li>
                                <li><span></span>恭喜用户gr**sg获得 免单10元</li>
                                <li><span></span>恭喜用户nh**ht获得 免单10元</li>
                                <li><span></span>恭喜用户fg**we获得 免分期服务费用资格</li>
                                <li><span></span>恭喜用户ki**ng获得 免单5元</li>
                                <li><span></span>恭喜用户gd**fs获得 免单10元</li>
                            </ul>
                    </div>
                </div>
            </div>

        );
    }

    componentDidMount(){
        this.props.getUrl(window.location.hash.split("#")[1])
        this._turntable.addEventListener('transitionend',() => {
            // 需要控制中奖概率
            switch(true){
                case this.state.cur_deg>0 && this.state.cur_deg<=51.4:
                    alert('恭喜获得大奖:￥499')
                    break
                case this.state.cur_deg>51.4 && this.state.cur_deg<=102.8:
                    alert('恭喜获得免单券:￥50')
                    break
                case this.state.cur_deg>102.8 && this.state.cur_deg<=154.2:
                    alert('恭喜获得免单券:￥10')
                    break
                case this.state.cur_deg>154.2 && this.state.cur_deg<=205.6:
                    alert('恭喜获得免单券:￥5')
                    break
                case this.state.cur_deg>205.6 && this.state.cur_deg<=257:
                    alert('恭喜获得免分期资格')
                    break
                case this.state.cur_deg>257 && this.state.cur_deg<=308.4:
                    alert('恭喜获得白条额度提升资格')
                    break
                case this.state.cur_deg>308.4 && this.state.cur_deg<360:
                    alert('抱歉，未中奖')
                    break
                default:
                    break
            }
            this._turntable.style.transitionDuration = '0s'
            this._turntable.style.transform = `rotate(0deg)`

            this.setState({
                onTurn:false,
                cur_deg:0
            })
        },false)

        // 获奖区往上移动
        this.slideUp()
    }

    componentWillUnmount(){
        // clearInterval(timer)的作用只是将定时器停止，但是timer变量本身还是存在的 clearInterval(timer)达到保留对象的作用以便于再次使用
        // 两个都能达到关闭定时器的作用，但是timer=null后，timer变量会被当做垃圾被系统回收，无法再次启动原来的timer

        // 在使用setInterval方法时，每一次启动都需要对setInterval方法返回的值做一个判断，判断是否是空值，若不是空值，则要停止定时器并将值设为空，再重新启动，如果不进行判断并赋值，有可能会造成计时器循环调用，在同等的时间内同时执行调用的代码，并会随着代码的运行时间增加而增加，导致功能无法实现，甚至占用过多资源而卡死奔溃。因此在每一次使用setInterval方法时，都需要进行一次判断
        clearInterval(this.timer)
        this.timer = null
    }
}

export default Connector(Turntable);
