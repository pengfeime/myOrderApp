import React, {Component} from 'react';
import {Prompt} from "react-router-dom"
import Connector from "../../../utils/connect"

import Loading from "../loading/loading"
import './index.css'

class PacketRain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: document.body.clientWidth,
            height: document.body.clientHeight * .8 - document.documentElement.style.fontSize.split('p')[0] * 7.5,
            fontSize: document.documentElement.style.fontSize.split('p')[0],
            time: 9,
            score: 0,
            deltaScore: '',
            loadingStatus: '' // 用于记录Loading组件的display属性
        }
    }

    // 上空飞过的飞机以及水平随机运动的红包
    flyAndMove = (ctx) => {
        const {width, height, fontSize} = this.state
        !this._plane.style.left && (this._plane.style.left = fontSize * 16 + 'px')
        if (this._plane.style.left.split('p')[0] <= -fontSize * 12) {
            // 跑到最左边了
            this._plane.style.left = fontSize * 32 + 'px'
        } else {
            this._plane.style.left = this._plane.style.left.split('p')[0] * 1 - 1 + 'px'
        }
        // 红包移动
        ctx.clearRect(0, 0, width, height)
        this.arr.forEach((item, index) => {
            // 碰到墙壁
            if (item.x <= 20 || item.x >= width - 20) {
                item.rowSpeed *= -1
            }
            item.x += item.rowSpeed
            // 落到屏幕外面则需要清除该红包并重新生成
            item.y += item.speed
            item.opacity = (item.opacity + .02 >= 1) ? 1 : item.opacity + .02
            if (item.y >= height) {
                item = {
                    x: this._plane.style.left.split('p')[0] * 1 + fontSize * 12,
                    y: 20,
                    width: 40,
                    height: 40,
                    rotate: Math.random() * 90, //图片初始旋转角度
                    deltaRotate: Math.random() * 2, // 旋转角度增量
                    speed: Math.random() + 1, // 下落速度
                    rowSpeed: (Math.random() - .5) * 1, // 水平方向移动量
                    opacity: .3,
                    score: Math.floor(Math.random() * 3) + 1 // 代表该红包分值
                }

                switch (true) {
                    case item.x <= 20:
                        item.x = 20
                        break
                    case item.x >= width - 20:
                        item.x = width - 20
                        break
                }

                this.arr.splice(index, 1, item)
            }
            item.rotate = (item.rotate + item.deltaRotate) % 360
            ctx.save()
            ctx.globalAlpha = item.opacity
            // 为实现红包旋转，将旋转中心移动至图片中心点
            ctx.translate(item.x, item.y)
            ctx.rotate(item.rotate * Math.PI / 180)
            ctx.drawImage(this._i, -20, -20, 40, 40)
            ctx.restore()
        })
        // 形成动画
        this.planeAnimation = window.requestAnimationFrame(this.flyAndMove.bind(this, ctx))
    }

    // 生成红包
    createPocket = (ctx) => {
        const {width, fontSize} = this.state
        // 新生成红包的信息
        let newPocket = {
            x: this._plane.style.left.split('p')[0] * 1 + fontSize * 12,
            y: 20,
            width: 40,
            height: 40,
            rotate: Math.random() * 90, //图片初始旋转角度
            deltaRotate: Math.random() * 2, // 旋转角度增量
            speed: Math.random() * 2, // 下落速度
            rowSpeed: (Math.random() - .5) * 1.3, // 水平方向移动量
            opacity: .3, // 初始透明度
            score: Math.floor(Math.random() * 3) + 1 // 代表该红包分值
        }
        switch (true) {
            case newPocket.x <= 20:
                newPocket.x = 20
                break
            case newPocket.x >= width - 20:
                newPocket.x = width - 20
                break
        }
        this.arr.push(newPocket)
        this._i.onload = () => {
            ctx.save()
            ctx.globalAlpha = newPocket.opacity
            ctx.drawImage(this._i, newPocket.x - .5 * fontSize, newPocket.y, 40, 40)
            ctx.restore()
        }
    }

    // 判断点击位置是否在红包上面
    insertPocket = (point, pocket) => {
        const disX = point.x - pocket.x
        const disY = point.y - pocket.y
        //console.log(disX,disY)
        return (disX >= -pocket.width / 2) && (disX <= pocket.width / 2) && (disY >= -pocket.height / 2) && (disY <= pocket.height / 2)
    }
    // canvas本身就是一个dom对象，绘制在其上的红包并不是dom对象，无法通过点击事件获取相关信息，只能通过canvas的位置信息来获取红包信息，类似于事件代理
    listenClick = (ctx) => {
        // 存放所有被点中的红包
        this.bubbleArr = []
        // 同一位置可能点中多个红包 只有最上面那个是有效的
        this._canvas.addEventListener('click', (e) => {
            const pos = {
                x: e.pageX,
                y: e.pageY - getComputedStyle(this._canvas).top.split('p')[0] - 3 * this.state.fontSize
            }
            this.arr.forEach((item, index) => {
                if (this.insertPocket(pos, item)) {
                    // 计入泡泡数组
                    this.bubbleArr.push({
                        x: item.x,
                        y: item.y,
                        textY: item.y,
                        textsize: 20,
                        opacity: 1,
                        score: item.score
                    })
                    this.setState({
                        score: this.state.score * 1 + item.score,
                        deltaScore: `+${item.score}`
                    }, () => {
                        setTimeout(() => {
                            this._deltaScore.innerText = ''
                        }, 500)
                    })
                    // 让第一个红包消失 同时在相应位置产生一个增加分数的特效
                    this.pocketToScore(ctx, item)
                    this.arr.splice(index, 1)
                    // 重新生成一个红包
                    this.createPocket(ctx)
                    this.keepBubble(this.bubbleArr, ctx)
                }
            })
        })
    }

    // pocketToScore 红包点开后产生+分特效
    pocketToScore = (ctx, pocket) => {
        ctx.save()
        let textStyle = ctx.createLinearGradient(0, 0, this.state.width, 0)
        textStyle.addColorStop(0, 'magenta')
        textStyle.addColorStop(.5, 'blue')
        textStyle.addColorStop(1, 'red')
        ctx.fillStyle = textStyle
        ctx.font = `bold ${pocket.textsize}px Georgia`
        ctx.fillText(`+${pocket.score}`, pocket.x, pocket.textY)
        ctx.restore()
    }
    // 红包消失时，在相应位置产生爆炸效果
    drawBubble = (bubbleArr = [], ctx) => {
        ctx.save()
        // 先清除画布
        ctx.clearRect(0, 0, this.state.width, this.state.height)
        // 因为画布被清除了，需要重新画之前的红包
        this.arr.forEach((item, index) => {
            ctx.save()
            ctx.globalAlpha = item.opacity
            // 为实现红包旋转，将旋转中心移动至图片中心点
            ctx.translate(item.x, item.y)
            ctx.rotate(item.rotate * Math.PI / 180)
            this._i && ctx.drawImage(this._i, -20, -20, 40, 40)
            ctx.restore()
        })

        bubbleArr.forEach((item, index) => {
            if (item.opacity > 0) {
                ctx.save()
                item.textY -= .05
                item.textsize += .05
                this.pocketToScore(ctx, item)
                this._bubble && ctx.drawImage(
                    this._bubble,
                    item.x,
                    item.y,
                    20,
                    20
                )
                ctx.restore()
                // 画完之后需要更新泡泡信息
                item.opacity -= .005
            }
        })
        ctx.restore()
    }

    // 形成运动的泡泡
    keepBubble = (bubbleArr, ctx) => {
        // 把消失的泡泡清除掉
        bubbleArr.map((item, index) => {
            if (item.opacity <= 0) {
                this.bubbleArr.splice(index, 1)
            }
        })

        // 画泡泡
        this.drawBubble(this.bubbleArr, ctx)
        // 形成运动
        this.bubbleAnimation = window.requestAnimationFrame(this.keepBubble.bind(this, this.bubbleArr, ctx))
    }


    //关闭遮罩
    closeCover = () => {
        this._cover.style.display = 'none'
        this._bg.style.filter = 'blur(0px)'
    }

    //重新开始游戏
    initGame = () => {
        this.setState({
            time: 9,
            score: 0,
            deltaScore: ''
        }, () => {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                if (this.state.time <= 0) {
                    clearInterval(this.timer)
                } else {
                    this.setState({
                        time: this.state.time - 1
                    })
                }
            }, 1000)
        })
    }

    // getLoadingStatus 用于从Loading组件获取加载状态信息
    getLoadingStatus = (status) => {
        this.setState({
            loadingStatus: status
        })
    }

    render() {
        return (
            <div className={'pocketRain'}>
                <Prompt when={this.state.time > 0} message={location =>
                    '正在游戏中,确认要离开此页面吗？'
                }/>
                <Loading ref={(l) => {
                    this._loading = l
                }} getStatus={this.getLoadingStatus}></Loading>
                <div className="bg" ref={(b) => {
                    this._bg = b
                }}>
                    <div className="time_score">
                        <span>倒计时 {this.state.time} s</span>
                        <span>得分：{this.state.score}
                            <span ref={(s) => {
                                this._deltaScore = s
                            }}>{this.state.deltaScore}</span>
                        </span>
                    </div>
                    <div className="plane" ref={(p) => {
                        this._plane = p
                    }}>
                    </div>
                    <img ref={(i) => {
                        this._i = i
                    }} src={require('../../../assets/images/pocket_rain/pocket_0.png')} alt=""/>
                    <img ref={(b) => {
                        this._bubble = b
                    }} src={require('../../../assets/images/pocket_rain/blast.png')} alt=""/>
                    <canvas className="canvas" width={this.state.width} height={this.state.height} ref={(r) => {
                        this._canvas = r
                    }}>
                    </canvas>
                </div>
                {/*遮罩层*/}
                <div className="covering" ref={(c) => {
                    this._cover = c
                }}>
                    <div className="poc_bg">
                        <h4>{this.state.score ? '恭喜你，一共获得' + this.state.score + `分(折合代币券 ￥${this.state.score / 10})` : '您手气有点差呢，请再接再厉~(Tips:细心的弟弟一定有好运气的哦)'}</h4>
                        {!this.state.score ? <button onClick={this.initGame}>再来一次</button> : (<div>
                            <span onClick={this.closeCover}>我知道了</span>
                            <span onClick={this.initGame}>再来一次</span>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.getUrl(window.location.hash.split("#")[1])
        this.arr = []
        let ctx = this._canvas.getContext('2d')
        // window.onload事件是在页面dom元素加载完后执行，也就包括了img图片中src加载完成，那么img.onload 就不会执行了
        // 生成5个红包
        for (let i = 0; i < 5; i++) {
            this.createPocket(ctx)
        }
        this.flyAndMove(ctx)
        this.listenClick(ctx)
    }

    componentDidUpdate() {
        // 需要等游戏开始前动画播放完成才能开始游戏
        if (this.state.loadingStatus === 'none' && this.state.time === 9) {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                if (this.state.time <= 0) {
                    clearInterval(this.timer)
                } else {
                    this.setState({
                        time: this.state.time - 1
                    })
                }
            }, 1000)
        }
        // 时间到了，结束游戏
        if (this.state.time === 0) {
            this._cover.style.display = 'block'
            this._bg.style.filter = 'blur(10px)'
        } else {
            this._cover.style.display = 'none'
            this._bg.style.filter = 'blur(0px)'
        }
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.planeAnimation)
        window.cancelAnimationFrame(this.bubbleAnimation)
        clearInterval(this.timer)
        this.timer = null
    }
}

export default Connector(PacketRain);
