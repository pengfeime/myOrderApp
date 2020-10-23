import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 引入provider组件，为整个应用的组件提供state数据,需包裹在App组件外部
import { Provider } from "react-redux"

import axios from 'axios'
// 引入store 注意import 必须在其它所有业务代码前面 否则会报错
import store from "../src/store/index.js"
import * as serviceWorker from './serviceWorker';
// jquery在执行post请求时，会设置Content-Type为application/x-www-form-urlencoded，所以服务器能够正确解析，而使用原生ajax、axios请求时，如果不显示的设置Content-Type，那么默认是text/plain，这时服务器就不知道怎么解析数据了，所以才只能通过获取原始数据流的方式来进行解析请求数据
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Component.prototype.$axios = axios;
ReactDOM.render(
// 这里为何报错？？？  --之前是因为react，react-dom版本问题，更新后就不报错了
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
