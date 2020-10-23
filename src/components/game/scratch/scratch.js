import React, {Component} from 'react';
import Connector from "../../../utils/connect"
import Loading from "../loading/loading"
import './index.css'
const whiteImg = require(`../../../assets/images/lottery/white.jpg`)
class Scratch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgArr:['prize0.jpg','prize1.jpg','prize2.jpg','prize3.jpeg','prize4.jpg','prize5.jpg'],
            fontSize:document.documentElement.style.fontSize.split('p')[0],
            curImg:whiteImg
        }
    }

    draw = () => {
        let can = this._con
        let ctx = can.getContext('2d')
        ctx.fillStyle = '#bbb'
        ctx.fillRect(0,0,this._img.width,this._img.height)

        // 拖拽时候，新部分与原部分重叠处要透明
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = 'red' // 划线颜色
        ctx.lineWidth = 30
        ctx.lineCap = 'round' // 划线是圆形


        // 需要区分移动端还是pc端
        // 移动端
        can.ontouchstart = (e) => {
            e = e || window.event
            e.preventDefault()
            let touch = e.touches[0]
            let X = touch.pageX - can.offsetLeft,
                Y = touch.pageY - can.offsetTop
            ctx.beginPath()
            ctx.arc(X,Y,15,0,Math.PI*2,false)
            ctx.fill()
            this.handleMove(can,ctx,X,Y)
        }
        can.onmousedown = (e) => {
            e = e || window.event
            // 需要阻止选中拖动的默认事件
            e.preventDefault()
            // 点下画小圆
            let X = e.pageX - can.offsetLeft,
                Y = e.pageY - can.offsetTop
            ctx.beginPath()
            ctx.arc(X,Y,15,0,Math.PI*2,false)
            ctx.fill()
            this.handleMove(can,ctx,X,Y)
        }
    }

    handleMove = (ele,ctx,X,Y) => {
        ele.onmousemove = (e) => {
            e = e||window.event
            e.preventDefault()
            ctx.beginPath()
            ctx.moveTo(X,Y)

            ctx.lineTo(e.pageX - ele.offsetLeft,e.pageY - ele.offsetTop)
            // 更新位置
            X = e.pageX - ele.offsetLeft
            Y = e.pageY - ele.offsetTop
            ctx.stroke()
        }
        ele.ontouchmove = (e) => {
            e.preventDefault()
            let touch = e.touches[0]
            ctx.beginPath()
            ctx.moveTo(X,Y)
            ctx.lineTo(touch.pageX - ele.offsetLeft,touch.pageY - ele.offsetTop)
            X = touch.pageX - ele.offsetLeft
            Y = touch.pageY - ele.offsetTop
            ctx.stroke()
        }

        document.onmouseup = () => {
            ele.onmousemove = null
            document.onmouseup = null
            this.checkRatio(ctx,ele.width,ele.height)
        }
        document.ontouchend = () => {
            ele.ontouchmove = null
            document.ontouchend = null
            this.checkRatio(ctx,ele.width,ele.height)
        }
    }

    checkRatio = (ctx,width,height) => {
        let {data} = ctx.getImageData(0,0,width,height)
        const len = data.length
        let n =0 // 用于计数透明像素
        for(let i=0;i<len;i+=4){
            // rgba都为0表示透明像素
            if(data[i]===0 && data[i+1]===0 && data[i+2]===0 && data[i+3]===0){
                n++
            }
        }
        // 如果透明像素数量达到80%，则可以显示全部奖品区
        if(n*100/(width*height)>=80){
            // 清除画布则底部全部显示了
            ctx.beginPath()
            ctx.clearRect(0,0,width,height)
        }
    }

    render() {
        return (
            <div className={'scratch'}>
                <Loading></Loading>
                {/*下一步-实现字体裂开效果*/}

                <h2 data-text={"刮刮乐"}>刮刮乐</h2>
                <canvas ref={(c) => {
                    this._con = c
                }} width={12*this.state.fontSize} height = {10*this.state.fontSize}></canvas>
                <img src={this.state.curImg} alt="" ref={(r) => {
                    this._img = r
                }}/>
                <div className={'explain'}>
                    <p>1.大吉大利，今晚吃鸡！and祝君鸿运东来！</p>
                    <p>2.本活动最终解释权归本app所有(如有不服，欢迎留言bb哦！)</p>
                    <p>3.<span></span> 258258888</p>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.props.getUrl(window.location.hash.split("#")[1])
        this.draw()
        this.setState({
            curImg:require(`../../../assets/images/lottery/${this.state.imgArr[Math.floor(Math.random()*6)]}`)
        })

    }
}



export default Connector(Scratch);
