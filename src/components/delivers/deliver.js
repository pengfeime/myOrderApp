import React, {Component} from 'react';
import connector from "../../utils/connect"
import { NavLink } from "react-router-dom"

class Deliver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.aid,
            randomOne: {}
        }
    }

    toDetail = () => {
        this._nav.style.display = 'none'
    }
    render() {
        return (
               <div>
                   {Object.keys(this.state.randomOne).length > 0 &&
                   (
                       // 直接在NavLink标签里使用style-这种方法虽然直观好用，但是不建议在实际开发中使用，这增加了代码的耦合度，不是一种好的编程方式。

                       // 如果我们想给路由一个样式，这时候我们写了一个CSS文件，我们如何才能使用在NavLink上？其实这并不难，不过要配置一下webpack.config.js文件。
                       // webpack还不能对CSS文件进行正确的解析，需要我们加入CSS的loader。我们先用npm安装style-loader和css-loader。
                       <NavLink to={{
                           pathname:'/moreInfo',
                           state:{
                               curShop:this.state.randomOne,
                               curId:this.state.id
                           }
                       }

                       } style={{display:'block'}}  onClick={this.toDetail} ref={(nav) => {
                           this._nav = nav
                       }}>
                           <div className={'item'}>
                               <div className={'thumbpic'}>
                                   {/*注意这里不要写错路径之类的，会导致无法compile，node内存溢出等等，很严重！！*/}
                                   <img
                                       src={require('../../' + this.state.randomOne.shop_info.shopinfo)}
                                       alt=""/>
                               </div>
                               <div className={'con'}>

                                   <span>{this.state.randomOne.shop_info.shop_name}</span>
                                   <span>{this.state.randomOne.score_star}分</span>
                                   <span>{this.state.randomOne.delivery_time}分钟</span>
                                   <span>{this.state.randomOne.distance}km</span>
                                   <div className={'someinfo'}>
                                       <span>月售{this.state.randomOne.sales_volume}份</span>
                                       <span>￥{this.state.randomOne.least_cost}起送</span>
                                       <span>配送费￥{this.state.randomOne.delivery_cost}</span>
                                   </div>
                               </div>
                           </div>
                       </NavLink>
                   )}
               </div>
        );
    }

    componentDidMount() {
        let theData = JSON.parse(window.sessionStorage.getItem('allShop'))
        this.props.getUrl(window.location.hash.split('#')[1])
        // 从父组件跳转过来，先存储该数据到localstorage
        if (theData['eatery']) {
            this.setState({
                randomOne: theData['eatery'][this.state.id]
            })
            // 注意localStorage只支持string类型的存储
            // 不需要传送所有店铺信息,需要筛选
            const shop_info = theData['eatery'][this.state.id].shop_info[this.state.id]
            // 将原来的shop_info替换为筛选后的shop_info
            // 这里不能直接更改对象，会影响原来对象的--浅拷贝的原因
            theData['eatery'][this.state.id].shop_info = shop_info
            window.sessionStorage.setItem('currentShop', JSON.stringify(theData['eatery'][this.state.id]))
        } else {
            // 刷新页面，则从localstorage里取
            this.setState({
                randomOne: JSON.parse(sessionStorage.getItem('currentShop'))
            })
        }
        // 若从父组件跳转过来则必然传来数据，如刷新此页面传来的数据会消失
    }

}

export default connector(Deliver)
