import React, {Component} from 'react';
import {message} from "antd"

import './index.css'
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate:0,
            motto:['Failure is the mother of success.','TwoLive beautifully, dream passionately, love completely.',"A man's best friends are his ten fingers.",'All things in their being are good for something.','The world is like a mirror: Frown at itand it frowns at you; smile, and it smiles too.'][Math.floor(Math.random()*5)],
            src:'assets/images/Mario/right-0.png'
        }
    }

    render() {
        return (
            <div className="cover-layer" ref={(c) => {
                this._cover = c
            }}>
                <img className="sport-man" src={require('../../../' + this.state.src)} ref={(s) => {
                    this._sportMan = s
                }}></img>
                <div className="hollow">
                    <div className="fill" ref={(f) => {
                        this._fill = f
                    }}>
                    </div>
                    <p>加载进度：{this.state.rate}%</p>
                    <p>{this.state.motto}</p>
                </div>
                <span></span>
            </div>
        );
    }
    componentDidMount(){
        let step,
            initPre = 10,
            index = 0
        this.timer = setInterval(() => {
            step = Math.floor(Math.random()*4 +1)
            initPre += step
            if(initPre < 50){
                this._fill.style.background = 'lightgreen'
            }else if(initPre >=50 && initPre < 80){
                this._fill.style.background = 'green'
            }else if(initPre >=80 && initPre<=100){
                this._fill.style.background = 'darkgreen'
            }else{
                initPre = 100
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    index = (index+1)%5
                    this.setState({
                        src:`assets/images/Mario/right-${index}.png`
                    })
                },200)
                message.success('精彩马上呈现',1)
                setTimeout(() => {
                    this.props.getStatus && this.props.getStatus('none')
                    this._cover && (this._cover.style.display = 'none')
                    clearInterval(this.timer)
                    this.timer = null
                },1000)
            }
            index = (index+1)%5
            this._fill.style.width = `${initPre}%`
            this._sportMan.style.left =parseInt(document.documentElement.clientWidth*.18) + parseInt(initPre/100*document.documentElement.clientWidth*.6) + 'px'
            this.setState({
                rate:initPre,
                src:`assets/images/Mario/right-${index}.png`
            })
        },50)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
        this.timer = null
    }
}

export default Loading;
