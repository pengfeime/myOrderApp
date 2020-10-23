import React, {Component} from 'react';
import './App.css';
import Header from './components/header/header'
import Con from './components/content/content'
import Footer from './components/footer/footer'
//安装antd Ant Design 就是基于 React 实现的一套组件库
// 安装（react-app-rewired）一个对 create-react-app 进行自定义配置的社区解决方案,防止默认加载所有的antd里css样式
import {HashRouter as Router,Route} from "react-router-dom"
// connect方法(装饰器)用于改造当前组件，接收2个参数：mapStateToProps和mapDispatchToProps,它们定义了UI组件的业务逻辑 mapStateToProps负责输入逻辑，即将State映射到UI组件的props属性上；mapDispatchToProps负责输出逻辑，将用户对UI的操作映射成action
import {Modal} from "antd"

import connector from "./utils/connect"
import axios from "axios"
import './utils/arr_related'
// 将axios挂载到原型上
Component.prototype.$axios = axios

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            data: {}
        }

    }

    getPath(path) {
        this.setState({
            path: path
        },() => {
            this.props.getUrl(path)
        })
    }

    // 自定义弹窗事件
    modifyAlert = () => {
        let secondsToGo = 3 // 3s后自动关闭弹窗
        const modal = Modal.info({
            title:'正在执行其他操作,请勿离开~',
            content:`本窗口将在${secondsToGo}秒后自动关闭`,
            maskClosable:true,
            centered:true
        })
        const timer = setInterval(() => {
            secondsToGo -=1
            modal.update({
                content:`本窗口将在${secondsToGo}秒后自动关闭`
            })
        },1000)
        // 销毁定时器以及弹窗
        setTimeout(() => {
            timer && clearInterval(timer)
            modal.destroy()
        },secondsToGo*1000)
    }
    render() {
        return (
            <div className="App">
                {/*在父组件app里面使用Router标签的原因是：<Route> 和 <Link> 必须放在同一个 <Router> 标签内（否则会出现点击link标签子组件内容不同步的情况！ 这里使用了Router，子组件里就不用使用Router包裹了）*/}
                {/*在react-router-dom的BrowserRouter和HashRouter上有属性getUserConfirmation可以阻止默认弹窗*/}
                <Router getUserConfirmation = {this.modifyAlert}>
                    <Header path={this.state.path} getpath={this.getPath.bind(this)}></Header>

                    <Route component={Con}></Route>
                    <Footer path={this.state.path} getpath={this.getPath.bind(this)}></Footer>
                </Router>

            </div>
        )
    }


}

// function App() {
//   return (
//     <div className="App">
//       <Header></Header>
//       <Footer></Footer>
//     </div>
//   );
// }

// 将state映射到props ：把redux里reducer返回的新状态映射到react里UI组件的props属性上
// const mapStateToProps = (state) => {
//     //这里相当于其他组件可以使用this.props.alldatas来接收reducer里返回的state
//     return {alldatas: state}
// }
// // 将redux的action映射到UI组件的props属性上
// const mapDispatchToProps = {addOne, delOne}

// 这里的connector是自己封装的connect函数
App = connector(App)
export default App;
