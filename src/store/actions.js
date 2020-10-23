import * as allActions from "./action_type"

// 增加记录的action
function addOne() {
   return {
       type: allActions.ADD_RECORD
   }
}

// 删除记录的action
function delOne() {
    return {
        type:allActions.DEL_RECORD
    }
}

// 查询或递交卖家相关信息
function getInfo(allInfo) {
    return {
        type:allActions.GET_SHOPINFO,
        allInfo
    }
}

// 删除卖家相关信息
function delInfo() {
    return {
        type:allActions.DEL_SHOPINFO
    }
}

// 更新当前路由
function getUrl(currentUrl) {
    return {
        type:allActions.GET_URL,
        currentUrl
    }
}

// 第一次打开商品相关页面，根据用户名从数据库获取相关信息
function initData(the_data){
    return {
        type:allActions.GET_MONGO_DATA,
        totalNum:the_data.totalNum,
        goodDatas:the_data.goodDatas
    }
}

// 增加商品数量
function addNum(addItem) {
    return {
        type:allActions.ADD_NUM,
        increaseNum:1,
        status:'ADD',
        // 添加的商品信息
        addItem:addItem
    }
}
// 减少商品数量
function subNum(subItem) {
    return {
        type:allActions.SUB_NUM,
        decreaseNum:1,
        status:'SUB',
        // 删除的商品
        subItem:subItem
    }
}
// 初始化购物车的状态（增加或减少数量之后）
function initAddSub() {
    return {
        type:allActions.INIT_CART,
    }
}
// 计算购物车消费(暂时不包括运费等其他费用),不写在这里了
function countCost() {
    return {
        type:allActions.COUNT_COST,
        counts:0
    }
}

// 异步dispatch
function asyncDispatch() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type:allActions.ASYNC_ACTION
            })
        },5000)
    }
}
const actions = {addOne,delOne,getInfo,delInfo,getUrl,initData,addNum,subNum,initAddSub,countCost,asyncDispatch}
export default actions
