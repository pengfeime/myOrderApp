import React, {Component} from 'react';
import {NavLink} from "react-router-dom"

import './search.css'
import connector from "../../utils/connect"
import unique from "../../utils/arr_related"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            arr: [],  // 用于存储相关搜索
            historyArr: [],  //用于存储用户搜索记录
            id: '', // 用于模拟搜索到的是请求来数据里第几项
            isClear: false, // 这个逻辑变量是用来判断是否需要清除图标的
            timer: null, // 定时器
            Index: -1, // Index是用来标记当前选项序号的
            Width: document.body.clientWidth - parseInt(document.documentElement.style.fontSize) * 2,  // 画布当前大小
            Height: document.body.clientHeight - parseInt(document.documentElement.style.fontSize) * 6.5,
            preTime: 0, // 记录上一次执行的时间
            playing: false, // 记录audio是否处于播放状态
            fontSize:document.documentElement.style.fontSize.split('p')[0]
        }
    }

    searchNearby = (e) => {
        if (!!(this.textInput.value.trim()) === false) return;
        let id = Math.floor(Math.random() * 10)
        this.createJsonp(this.textInput.value)
        this.state.historyArr.push(this.textInput.value)
        // 对数组去重
        this.setState({
            historyArr: unique(this.state.historyArr),
            id
        })

        // 手动跳转路由
        this.props.history.push(`/delivers/${id}`)


    }
    resultcallback = (res) => {
        let {g} = res
        if (g && g.length > 6) {
            g = g.slice(0, 6)
        }
        this.setState({
            arr: g
        })

        // 要删除用于跨域的script标签
        //let scripts = document.querySelectorAll('script')
        // 因为页面最初渲染出来便有4个script标签
        // for(let i=4,len=scripts.length;i<len;i++){
        //     document.body.removeChild(scripts[i])
        // }
    }

    focus() {
        this.textInput.placeholder = ''
        this.textInput.focus()
    }

    // 失焦事件
    blur() {
        this.textInput.placeholder = '说点什么吧'
        // if (this.textInput.value != false) {
        //     this.createJsonp(this.textInput.value)
        // }
    }

    // 创建动态script来进行JSONP跨域请求
    // 回调函数未定义？？？  将回调函数挂载到window上解决
    createJsonp(keyword) {
        //https://www.baidu.com/sugrec?&wd=www.baidu.com&cb=jQuery110203353247304248419_1575454250660&_=1575454250662
        // 创建script标签进行JSONP跨域请求,为防止过于频繁触发此函数，需进行函数节流或防抖优化
        let script = document.createElement('script')
        // 注意这里要先把keyword转换成字符，否则无法调动trim方法
        //https://www.baidu.com/sugrec?prod=pc&wd=44&cb=fy

        script.src = "https://www.baidu.com/sugrec?prod=pc&wd=" + encodeURI(String(keyword).trim()) + "&cb=resultcallback"
        document.body.appendChild(script)
    }

    // 键盘事件，主要是enter，⬆，⬇...
    handleKeyDown = (e) => {
        let id
        if (e.keyCode === 13) {
            let historyArr = this.state.historyArr
            if (!e.target.value) return;
            id = Math.floor(Math.random() * 10)
            this.createJsonp(this.textInput.value)
            historyArr.push(this.textInput.value)
            // 对数组去重
            historyArr = unique(historyArr)
            this.setState({
                historyArr,
                id
            })

            // 手动跳转路由
            this.props.history.push(`/delivers/${id}`)
            // return (<Deliver></Deliver>)
            // return (<Route path={`/delivers/${id}`} component={Deliver}></Route>)
            //https://www.baidu.com/s?wd=xxx  百度的查询接口
            //window.open('https://www.baidu.com/s?wd='+this.state.value,"_self")
        }
    }
    // 当使用了搜索后，要添加历史记录，可以使用redux来管理

    // 监听输入框内容改变
    handleChange = (e) => {
        // 如果输入内容为空则不执行查询
        if (!!(e.target.value.trim()) === false) {
            this.setState({
                isClear: false,
                value: ''
            })
            return
        }
        this.setState({
            value: e.target.value,
            isClear: true
        })
        // 防抖，若不到规定间隔时间就再次触发函数，则清除之前设定的定时器，重新开启定时器、重新计时
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            this.createJsonp(this.state.value)
        }, 500)
    }
    // 点击输入框时候下面的列表所绑定的点击事件
    handleClick = (key, item, e) => {
        this.setState({
            Index: key,
            value: item,
            arr: []
        })
        this.textInput.value = item
    }
    // 清空输入框内容
    cleartext = () => {
        this.textInput.value = ''
        this.setState({
            value: '',
            arr: [],
            isClear: false
        })
    }

    // 这里的动画 如果直接使用setInterval这个简单做法，如果draw带有大量逻辑计算，导致计算时间超过帧等待时间时，将会出现丢帧。除外，如果FPS太高，超过了当时浏览器的重绘频率，将会造成计算浪费，例如浏览器实际才重绘2帧，但却计算了3帧，那么有1帧的计算就浪费了。
    // 直接使用requestAnimationFrame 这样完全跟浏览器帧频同步了，无法自定义动画的帧频，也是无法满足需求的。
    // 在setTimeout里面调用requestAnimationFrame 这种做法，比较直观的可以发现，每一次setTimeout执行的时候，都还要再等到下一个requestAnimationFrame事件到达，累积下去会造成动画变慢。
    //requestAnimationFrame(this.animateDraw)
    // 控制requestAnimationFrame的时间跨度

    tick = (ctx) => {
        // 控制动画为1000ms执行一次
        requestAnimationFrame(() => {
            // 主要这里需要保存ctx，否则会报错
            this.tick(ctx)
        })
        const now = Date.now()
        let {preTime} = this.state
        if ((now - preTime) > 100) {
            // 这里不能直接将now赋值给preTime，会有时间精度差，比如设置动画执行时间为100ms（10fps），那么浏览器每16ms（60fps）执行一次动画，实际上是16*7=112ms，浏览器需要7次才会绘制一次动画，这种情况下，绘制10帧动画实际需要1120ms
            // 校正记录时间
            preTime = now - (now % 100)
            this.setState({
                preTime
            }, () => {
                this.reDraw(ctx)
            })
        }
    }

    // canvas画背景图
    draw = () => {
        const {Width, Height} = this.state
        this.starArr = [] // 注意starArr是全局变量
        let starMoveX, starMoveY, rot, r, opacity, deltaAlpha, stepX, stepY // star发生的位移,旋转角,大圆半径,透明度,水平移动量，垂直移动量（后面运动会用到）
        // 由于canvas每当高度或宽度被重设时，画布内容就会被清空
        let ctx = this._canvas.getContext('2d')
        ctx.save()
        // 不管你用moveTo把画笔移动到哪里，只要不beginPath，那你一直都是在画一条路径。
        // fillRect与strokeRect这种直接画出独立区域的函数，也不会打断当前的path.
        // closePath 和beginPath没有半毛钱关系，closePath只是将终点和起点连线，并不会开启一个新的path
        //注意有些方法会自动闭合路径，比如fill()和clip()。这也很好理解，因为这两个方法都是作用于一块区域，不闭合的话计算机哪里知道你要对哪块区域进行操作呢？这时候就可以不用调用closePath()了。stroke()不会自动闭合路径

        ctx.beginPath()
        // 背景色
        let lineColor = ctx.createLinearGradient(0, 0, 0, Height)
        lineColor.addColorStop(0, '#232256')
        lineColor.addColorStop(1, '#143778')
        ctx.fillStyle = lineColor
        ctx.fillRect(0, 0, Width, Height)

        ctx.fillStyle = '#fff'
        // 画随机位置、随即大小的五角星
        for (let i = 0; i < 50; i++) {
            ctx.save()
            starMoveX = Width - Math.floor(Math.random() * Width)
            starMoveY = Height - Math.floor(Math.random() * Height)
            stepX = 0.5 - Math.random() * 1
            stepY = 0.5 - Math.random() * 1
            rot = Math.PI * 2 * Math.random()
            r = Math.floor(Math.random() * 5) + 2
            opacity = Math.random()
            deltaAlpha = 0.01 * Math.random() + 0.001
            ctx.translate(starMoveX, starMoveY)
            // 需要传入相关信息
            this.drawStar(ctx, r, rot, opacity)
            // 加下标
            this.starArr[i] = {
                index: i,
                stepX,
                stepY,
                starMoveX,
                starMoveY,
                rot,
                r,
                opacity,
                deltaAlpha
            }
            ctx.restore()
        }


        // 需要保存月亮相关信息
        ctx.save()
        let moonMoveX, moonMoveY, d, R, opacityM, deltaAlphaM, stepXM, stepYM, needMore // moon发生的位移,内弧控制点,大圆半径,透明度,水平移动量，垂直移动量，月亮盈缺控制量（后面运动会用到）
        this.moonRel = ''
        stepXM = .5 - Math.random() * 1
        stepYM = .5 - Math.random() * 1
        d = parseInt(document.documentElement.style.fontSize) * 5.1
        R = parseInt(document.documentElement.style.fontSize) * 3
        moonMoveX = Width - R - Math.floor(Math.random() * (Width - R))
        moonMoveY = Height - R - Math.floor(Math.random() * (Height - R))
        opacityM = Math.random() * (.5) + .5
        deltaAlphaM = 0.01 * Math.random() + 0.001
        needMore = true
        ctx.translate(moonMoveX, moonMoveY)
        // 需要传入相关信息
        this.drawMoon(ctx, d, R, opacityM)
        // 加下标
        this.moonRel = {
            stepXM,
            stepYM,
            moonMoveX,
            moonMoveY,
            d,
            R,
            needMore,
            opacityM,
            deltaAlphaM
        }
        ctx.restore()

        // 画流星
        this.meteorArr = []
        let firstX, // 流星基点坐标
            firstY,
            meteorR, // 流星长度
            meteorRot, // 流星划落角度
            moveX, // 流星每次运动x方向增加
            moveY // 每次运动y方向增加
        // 画10个流星
        const fontsize = parseInt(document.documentElement.style.fontSize)
        for (let i = 0; i < 5; i++) {
            ctx.save()
            firstX = Math.random() * (Width - fontsize * 3) + fontsize * 3
            firstY = Math.random() * Height * .4 + 5
            meteorR = Math.random() * 40 + 40
            meteorRot = Math.random() * Math.PI / 4 + Math.PI / 6
            moveX = -(Math.random() * 2 + 2) // 由于向左运动，x递减
            moveY = -moveX * Math.tan(meteorRot)
            this.drawMeteor(ctx, meteorR, firstX, firstY, meteorRot)

            // 保存流星相关信息
            this.meteorArr[i] = {
                firstX,
                firstY,
                meteorR,
                meteorRot,
                moveX,
                moveY
            }
            ctx.restore()
        }
        ctx.globalCompositeOperation = 'source-over'
        // 画草地
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.moveTo(0, Height)
        ctx.lineTo(0, Height * 9 / 10)
        ctx.bezierCurveTo(Width / 4, Height * 39 / 40, Width * 3 / 4, Height * 33 / 40, Width, Height * 19 / 20)
        ctx.lineTo(Width, Height)
        ctx.fill()
        ctx.restore()

        // 文字实现 这里还要实现文字燃烧效果
        ctx.save()
        ctx.fillStyle = '#ccc'
        ctx.font = `bold ${fontsize * 2}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('畅享家的味道~', Width/2, Height/2)
        ctx.restore()

        ctx.restore()
        this.tick(ctx)
    }

    // 为实现星星运动、闪耀效果 月亮移动，重新渲染画布
    reDraw = (ctx) => {
        // 星星移动
        const len = this.starArr.length,
            {Width, Height} = this.state
        if (len === 0) return;
        // 清空画布
        ctx.clearRect(0, 0, Width, Height)
        ctx.save()
        // 背景色
        let lineColor = ctx.createLinearGradient(0, 0, 0, Height)
        lineColor.addColorStop(0, '#232256')
        lineColor.addColorStop(1, '#143778')
        ctx.fillStyle = lineColor
        ctx.fillRect(0, 0, Width, Height)
        ctx.fillStyle = '#fff'
        for (let i = 0; i < len; i++) {
            let {
                stepX,
                stepY,
                starMoveX,
                starMoveY,
                r,
                rot,
                opacity,
                deltaAlpha
            } = this.starArr[i]
            ctx.save()
            ctx.beginPath()
            // 需要更新当前星星部分属性值
            if ((starMoveX + stepX) <= 0) {
                this.starArr[i].starMoveX = Width
            } else {
                this.starArr[i].starMoveX = ((starMoveX + stepX) >= Width) ? 0 : starMoveX + stepX
            }
            if ((starMoveY + stepY) <= 0) {
                this.starArr[i].starMoveY = Height
            } else {
                this.starArr[i].starMoveY = ((starMoveY + stepY) >= Height) ? 0 : starMoveY + stepY
            }
            if ((opacity + deltaAlpha) <= 0 || (opacity + deltaAlpha) >= 1) {
                this.starArr[i].deltaAlpha *= -1
            } else {
                this.starArr[i].opacity = opacity + deltaAlpha
            }
            ctx.translate(this.starArr[i].starMoveX, this.starArr[i].starMoveY)
            this.drawStar(ctx, r, rot, this.starArr[i].opacity)
            ctx.restore()
        }
        ctx.restore()

        // 月亮移动
        let {
            stepXM,
            stepYM,
            moonMoveX,
            moonMoveY,
            d,
            R,
            needMore,
            opacityM,
            deltaAlphaM
        } = this.moonRel
        ctx.save()
        ctx.beginPath()
        // 需要更新当前星星部分属性值
        if ((moonMoveX + stepXM) <= -9 * R / 10) {
            this.moonRel.moonMoveX += Width + 9 * R / 10
        } else {
            this.moonRel.moonMoveX = ((moonMoveX + stepXM) > Width - R / 9) ? (moonMoveX + stepXM - Width + R / 9) : moonMoveX + stepXM
        }
        if ((moonMoveY + stepYM) < -9 * R / 5) {
            this.moonRel.moonMoveY = Height - R / 10
        } else {
            this.moonRel.moonMoveY = ((moonMoveY + stepYM) > Height - R / 10) ? -9 * R / 5 : moonMoveY + stepYM
        }
        if ((opacityM + deltaAlphaM) <= .5 || (opacityM + deltaAlphaM) >= 1) {
            this.moonRel.deltaAlphaM *= -1
        } else {
            this.moonRel.opacityM = opacityM + deltaAlphaM
        }
        if (d >= 1.7 * R && (needMore === true)) {
            this.moonRel.needMore = false
            this.moonRel.d = d * .99
        } else if (d <= R / 3 && (needMore === false)) {
            this.moonRel.needMore = true
            this.moonRel.d = d / .99
        } else if (needMore === false) {
            this.moonRel.d = d * .99
        } else {
            this.moonRel.d = d / .99
        }
        ctx.translate(this.moonRel.moonMoveX, this.moonRel.moonMoveY)
        this.drawMoon(ctx, d, R, this.moonRel.opacityM)
        ctx.restore()

        // 根据位置重绘流星
        let meteorNum = this.meteorArr.length
        const fontsize = parseInt(document.documentElement.style.fontSize)
        ctx.save()
        for (let i = 0; i < meteorNum; i++) {
            let {
                firstX,
                firstY,
                meteorR,
                meteorRot,
                moveX,
                moveY
            } = this.meteorArr[i]
            ctx.save()
            // 先判断是不是已经处于爆炸状态的流星
            if (!!this.meteorArr[i].liveTime) {
                this.meteorArr[i].liveTime -= 1
                if (this.meteorArr[i].liveTime === 0) {
                    // 爆炸结束，需重新生成流星
                    this.meteorArr[i].liveTime = null
                    this.meteorArr[i].particle = null
                    this.meteorArr[i].firstX = Math.random() * (Width - fontsize * 3) + fontsize * 3
                    this.meteorArr[i].firstY = Math.random() * Height * .4 + 5
                    this.meteorArr[i].meteorR = Math.random() * 40 + 40
                    this.meteorArr[i].meteorRot = Math.random() * Math.PI / 4 + Math.PI / 6
                    this.meteorArr[i].moveX = -(Math.random() * 2 + 2) // 由于向左运动，x递减
                    this.meteorArr[i].moveY = -this.meteorArr[i].moveX * Math.tan(this.meteorArr[i].meteorRot)
                    this.drawMeteor(ctx, this.meteorArr[i].meteorR, this.meteorArr[i].firstX, this.meteorArr[i].firstY, this.meteorArr[i].meteorRot)
                }

                // 爆炸状态，直接更新粒子位置
                this.meteorArr[i].particle && this.meteorArr[i].particle.map((item, index) => {
                    // 更新位置
                    let {
                        startX,
                        startY,
                        r,
                        alpha,
                        deltaAlpha,
                        dx,
                        dy,
                        gravity
                    } = item
                    item.startX += dx
                    item.startY += dy
                    item.alpha = ((alpha + deltaAlpha) % 1)
                    item.dy += gravity
                    if (item.startY + item.r >= Height * .9) {
                        // 弹到底部
                        item.dy *= -0.99
                    }
                    this.drawCircle(ctx, item.startX, item.startY, r, item.alpha)
                })
            } else if ((firstY >= Height * .9) && (this.meteorArr[i].firstX > 0) && (this.meteorArr[i].firstX < Width)) {
                // 爆炸开始
                this.meteorArr[i].firstY = Height * .9
                // 给当前落地流星一个时间记录散开状态存在时间
                this.meteorArr[i].liveTime = 20
                // 流星落到最底部了 碰撞散开效果 触发爆炸散开效果-》爆炸完毕需重新生成流星
                this.meteorArr[i].particle = [] // 该数组用于存放小颗粒
                this.meteorExplosion(ctx, this.meteorArr[i], i)
                continue
            } else {
                // 正常运动状态
                if ((firstX + moveX) < -meteorR * Math.cos(meteorRot)) {
                    // 流星从左边界跑出去了,重新生成该流星位置
                    this.meteorArr[i].firstX = Math.random() * (Width - fontsize * 3) + fontsize * 3
                    this.meteorArr[i].firstY = Math.random() * Height * .4 + 5
                    this.meteorArr[i].meteorR = Math.random() * 40 + 40
                    this.meteorArr[i].meteorRot = Math.random() * Math.PI / 4 + Math.PI / 6
                    this.meteorArr[i].moveX = -(Math.random() * 2 + 2) // 由于向左运动，x递减
                    this.meteorArr[i].moveY = -this.meteorArr[i].moveX * Math.tan(this.meteorArr[i].meteorRot)
                } else {
                    this.meteorArr[i].firstX += moveX
                    this.meteorArr[i].firstY += moveY
                }
                this.drawMeteor(ctx, this.meteorArr[i].meteorR, this.meteorArr[i].firstX, this.meteorArr[i].firstY, this.meteorArr[i].meteorRot)
            }
            ctx.restore()
        }

        ctx.globalCompositeOperation = 'source-over'
        // 画草地
        // 如何获取草地上各点的坐标？（即贝塞尔曲线坐标）
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.moveTo(0, Height)
        ctx.lineTo(0, Height * 9 / 10)
        ctx.bezierCurveTo(Width / 4, Height * 39 / 40, Width * 3 / 4, Height * 33 / 40, Width, Height * 19 / 20)
        ctx.lineTo(Width, Height)
        ctx.fill()
        ctx.restore()

        ctx.save()
        ctx.moveTo(0,0)
        ctx.fillStyle = '#ccc'
        ctx.font = `bold ${fontsize * 2}px Arial`
        // 水平对齐方式
        ctx.textAlign = 'center'
        // 垂直对齐方式
        ctx.textBaseline = 'middle'
        ctx.fillText('畅享家的味道~', Width/2, Height/2)
        ctx.restore()
        ctx.restore()
    }

    // 实现流星坠落散开效果
    meteorExplosion = (ctx, tarMeteor, i) => {
        const {firstX, firstY} = tarMeteor
        this.toParticle(ctx, firstX, firstY, i)
    }
    // 流星爆炸后需要生成小颗粒 需要得知当前流星的index-修改liveTime
    toParticle = (ctx, startX, startY, i) => {
        // 小颗粒初始位置即流星坠落地方，需要给小颗粒一个存在时间，随机方向运动
        const len = 4 + Math.floor(Math.random() * 10)
        let r = this.meteorArr[i].meteorR / (len * 3)
        r = (r >= 3) ? r - 3 : r
        const gravity = Math.random() * .9 + .1
        for (let p = 0; p < len; p++) {
            let dx = (Math.random() - .5) * 8
            let dy = -(Math.random() * 2 + 2)
            let alpha = 1
            const deltaAlpha = .1 * Math.random() + .01
            this.drawCircle(ctx, startX, startY, r)
            // 需要记录各个小粒子的信息 坐标、半径、透明度、速度
            this.meteorArr[i].particle[p] = {
                startX,
                startY,
                r,
                alpha,
                deltaAlpha,
                dx,
                dy,
                gravity
            }
        }
    }
    // 画小圆球
    drawCircle = (ctx, x, y, r, alpha) => {
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2, true)
        ctx.shadowColor = '#E3EAEF'
        ctx.shadowBlur = 20
        ctx.fillStyle = 'white'
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.restore()
    }
// 需要实现星星的运动以及闪耀效果 -- 分别使用对象储存属性值方便改变？
    // 画一个五角星
    drawStar = (ctx, r, rot, opacity) => {
        // ctx 绘图上下文环境
        // r 五角星大圆半径，即五角星中心到顶点的距离
        // rot 五角星的旋转角度
        ctx.save() // 保存画布最初始状态
        ctx.beginPath()
        ctx.moveTo(r, 0) // 以某一个顶点作为起点绘制五角星
        // 先画一个圆,内接五角星五角,算出一些角度,你会发现长半径和短半径分别是一个三角形的两个边,这个三角形的三个角度数分别为18度36度和126度.126度的角对应长半径,18度角对应短半径,根据正弦定理,长半径：短半径=sin126'：sin18'=2.618 这里通过每次将画布旋转36度使的各个顶点（一共9个）依次位于x轴
        for (let i = 0; i < 9; i++) {
            ctx.rotate(Math.PI / 5) //注意ctx的rotate是以弧度为单位
            if (i % 2 === 0) {
                ctx.lineTo(r / 2.618, 0)
            } else {
                ctx.lineTo(r, 0)
            }
        }
        ctx.shadowColor = '#E3EAEF'
        ctx.shadowBlur = 20
        ctx.closePath()

        ctx.rotate(rot)
        // 注意这里的globalAlpha的使用顺序ctx.fill()方法回自动闭合上一条路径，导致代码还没有运行到ctx.globalAlpha = 0.5;，第一个圆圈的路径就已经闭合，后面再设置的透明度，虽然是全局透明度但也无效了
        // globalAlpha 属性值必须是介于 0.0（完全透明） 与 1.0（不透明） 之间的数字。需要注意，这个API作用于canvas的全局，只要我们使用，canvas上所有的内容都会变成相同的透明度,可以使用save 和restore 来实现,这两个属性通常成对存在，它可以控制在save和restore之间任何的属性都只作用这两个内容之间，对其他的内容没有影响
        // globalAlpha的变化可以用deltaTime（两帧时间间隔）进行调整，使得它随时间的变化非常的流畅
        ctx.globalAlpha = opacity
        ctx.fill() //填充颜色
        ctx.restore() // 释放/重置路径 --即初始化所有设置 用来恢复Canvas旋转、缩放等之后的状态，当和canvas.save( )一起使用时，恢复到canvas.save( )保存时的状态

    }
    dis = (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
    }

    // 画月亮
    drawMoon = (ctx, d, R, opacityM) => {
        // d是内圆两条切线在x轴交点的横坐标（即arcTo函数的控制点） R是外圆半径
        ctx.save()
        ctx.beginPath()
        // 先画外弧线 半径100px
        ctx.arc(0, R, R, Math.PI / 2, Math.PI * 3 / 2, true)
        // 画内弧线，以外弧线上端点为起始点(100,0),控制点为在起始点距离为d的右边,终止点为(100,200)
        // arcTo(控制点，终止点，r)
        ctx.moveTo(0, 0)
        ctx.arcTo(d, R, 0, 2 * R, R * this.dis(0, 0, d, R) / d)
        ctx.shadowColor = 'white'
        ctx.shadowBlur = 25
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.closePath()
        ctx.fillStyle = '#fb5'
        ctx.globalAlpha = opacityM
        ctx.fill()
        ctx.restore()

    }

    // 画流星
    drawMeteor = (ctx, meteorLen, x, y, angle) => {
        // meteorLen-流星长度, x,y--流星基点坐标
        ctx.save()
        //ctx.translate(x,y)
        // 需要3点画出一个流星
        let x1 = x,
            y1 = y - 2,
            x2 = x + 2,
            y2 = y,
            x3 = x + meteorLen * Math.cos(angle),
            y3 = y - meteorLen * Math.sin(angle)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        let radColor = ctx.createRadialGradient(x, y, 0, x3, y3, meteorLen)
        radColor.addColorStop(0, 'rgba(255,255,255,.9)')
        radColor.addColorStop(.4, 'rgba(255,255,255,.4)')
        radColor.addColorStop(.9, 'rgba(255,255,255,.2)')
        ctx.fillStyle = radColor
        ctx.fill()
        ctx.restore()
    }
    // 画草地 //canvas两个图片重叠时显示的方法——globalCompositeOperation

 // 这里的opacity为何不对？？

    play = (tar) => {
        if (this.state.playing) {
            tar.nextSibling.style.opacity = 0
            // 注意react里引入图片需要使用require才有效
            tar.style.backgroundImage = 'url(' + require("../../assets/iconImage/pause.png") + ')'
            this._audio.pause()
            this.setState({
                playing: false
            })
        } else {
            tar.nextSibling.style.opacity = 1
            tar.style.backgroundImage = 'url(' + require("../../assets/iconImage/play.png") + ')'
            this._audio.play()
            this.setState({
                playing: true
            })
        }

    }

    drawFrenquencty = (ctx,analyser,arr,len) => {
        ctx.save()
        ctx.clearRect(0,0,this.state.fontSize*3,this.state.fontSize*1.5)
        // 获取频率数据 并放入dataArr中
        analyser.getByteFrequencyData(arr)
        // 画布背景
        ctx.fillStyle = 'lightblue'
        ctx.ellipse(this.state.fontSize*1.5,this.state.fontSize*.75,this.state.fontSize*1.5,this.state.fontSize*.75,0,0,Math.PI*2,false)
        ctx.clip()
        ctx.fill()
        let barHeight
        // 从arr中取出数据画频率柱
        for(let i=0;i<len;i++){
            // 条柱高度为频率值的一半 为了美观
            barHeight = arr[i]/30
            ctx.fillStyle = `green`
            ctx.fillRect(i*3,this.state.fontSize*1.5,1.5,-barHeight)
        }
        ctx.restore()
        window.requestAnimationFrame(this.drawFrenquencty.bind(this,ctx,analyser,arr,len))
    }
    render() {
        return (
            <div className={'wrap'}>
                <div className={'others'}>
                    <div className="music">
                        <span></span>
                        <span onMouseOver={() => {
                            this._span.classList.add('music_hover')
                        }} onMouseLeave={() => {
                            this._span.classList.remove('music_hover')
                        }} ref={(s) => {
                            this._span = s
                        }}>吃饱啦？来点饭后音乐</span>
                        <span onClick={(e) => {
                            this.play(e.target)
                        }}></span>
                        <canvas className={this.state.playing?null:'hid'} width={this.state.fontSize*3} height={this.state.fontSize*1.5} ref={(c) => {
                            this._freCanvas = c
                        }}></canvas>

                        <audio src={require("../../assets/music/Vk-planet.mp3")} ref={(a) => {
                            this._audio = a
                        }}>
                        </audio>
                    </div>
                    <div className="playgame">
                        <NavLink to={'/getpocket'}>
                            小游戏来一波 >
                        </NavLink>

                    </div>
                </div>
                <div className={'higherbox'}>
                    {/*使用ref属性则input是非受控组件*/}
                    <input type="text" placeholder={'附近美食多多~'} ref={(input) => {
                        this.textInput = input
                    }} onClick={this.focus.bind(this)} onBlur={this.blur.bind(this)} onKeyDown={this.handleKeyDown}
                           onChange={this.handleChange.bind(this)}/>

                    {/*搜索图标*/}
                    <div className={"forclick"} onClick={this.searchNearby}></div>
                    {this.state.isClear && <div className="clearText" ref={(clear) => {
                        this._clear = clear
                    }} onClick={this.cleartext}>

                    </div>}
                </div>
                <ul>
                    {
                        // 当输入框无内容且有搜索记录，下面显示历史记录
                        !this.state.value && this.state.historyArr && this.state.historyArr.map((item, index) => {
                            return (
                                <li key={index} onClick={() => {
                                    this.handleClick(index, item)
                                }}>{item}</li>
                            )
                        })
                    }
                    {
                        // 输入框有值且能通过jsonp搜索到相关内容，遍历相关内容
                        this.state.value && this.state.arr && this.state.arr.map((item, index) => {
                            return (
                                <li key={index} onClick={() => {
                                    this.handleClick(index, item.q)
                                }}>{item.q}</li>
                            )
                        })
                    }

                </ul>

                {!this.state.isClear && <video src={require('../../assets/advertising.mp4')} width={25*this.state.fontSize} height={this.state.Height - 6*this.state.fontSize} controls={'controls'} poster={require('../../assets/images/hamburger.jpg')} muted={'muted'} ref={(v) => {
                    this._video = v
                }}></video>}

                {/*这里使用画布做背景图片*/}
                <canvas id={'canvas'} width={this.state.Width} height={this.state.Height} ref={(r) => {
                    this._canvas = r
                }}></canvas>
            </div>
        );
    }

    componentDidMount() {
        // 创建analyser节点 音频对象
        let audioCtx = new window.AudioContext()
        // 分析机
        let analyser = audioCtx.createAnalyser()
        // 分析多媒体 联系媒体源
        let source = audioCtx.createMediaElementSource(this._audio)
        // 媒体源连接分析机
        source.connect(analyser)
        // 分析机连接本地扬声器
        analyser.connect(audioCtx.destination)
        // 设置分析机截取的频率的精细度 以256的频率获取数据 分析器节点(Analyser Node) 将在一个特定的频率域里使用快速傅立叶变换(Fast Fourier Transform (FFT) )来捕获音频数据，这取决于你给 AnalyserNode.fftSize 属性赋的值（如果没有赋值，默认值为2048）。
        analyser.fftSize = 256
        // 获取频率数组 收集数据点 frequenctBinCount的值是fftSize的一半
        let bufferLen = analyser.frequencyBinCount
        //  形成音频数组 长度为bufferlen的数组
        let dataArr = new Uint8Array(bufferLen)
        let FreCtx = this._freCanvas.getContext('2d')
        // 设置条柱的宽度
        const barWidth = this._freCanvas.width/bufferLen *2.5
        this.drawFrenquencty(FreCtx,analyser,dataArr,bufferLen)

        this.draw()

    }

    componentDidUpdate() {
        // 把resultcallback函数挂载到window对象上，否则jsonp请求的回调函数里使用会报错！！
        window.resultcallback = this.resultcallback
    }

    componentWillUnmount() {
        // 如果该组件已经卸载，又接着执行setState函数会报错！！此时不应继续执行setState方法（改写setState方法或进行判断是否执行setState方法）
        this.setState = () => {
            return
        }
    }

}

export default connector(Search)
