// import Redux from 'redux'
// const { createStore } = Redux
// redux可以当场本地数据库（创建reducer，action，store），redux-thunk可以实现异步action，react-redux可以帮助完成数据订阅(把状态映射到子组件，分发reducer)
// 这是store的入口文件
// createStore是用于创建store，combineReducers用于合并多个reducers
import {createStore,combineReducers,applyMiddleware} from "redux"

import thunk from "redux-thunk"

// 引入定义好的reducer函数
import {shopInfo_reducer,getUrl_reducer,monitor_goodnum,asyncDis} from "./reducer"

// 用combineReducers合并多个reducers-》创建根reducer
const rootReducer = combineReducers({
    shopInfo_reducer,
    getUrl_reducer,
    monitor_goodnum,
    asyncDis
})
// 创建store，第一个参数是根reducer，第二个参数可以是初始的state，也可以是别的
const store = createStore(rootReducer,applyMiddleware(thunk))
export default store



// store 是redux提供的唯一数据源,存储了整个应用的state，并提供获取数据的方法store.getState()

