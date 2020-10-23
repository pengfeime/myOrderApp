import * as allActions from "./action_type"

// reducer可以理解为国家的法律，根据不同的action产生不同的结果

// 如何往store添加数据？？？？待解决  --可以通过在action函数里传值解决
// 添加mock里请求到的模拟数据的规则
export const shopInfo_reducer = (state={},action) => {
    switch (action.type) {
        case allActions.GET_SHOPINFO:
            // 注意Object.assign是浅拷贝，如果源对象的属性值是一个对象的引用，那么它拷贝来的属性值也只是对那个对象的引用
            return Object.assign({},state,action.allInfo)
        default:
            return state
    }
}
// 添加获取当前url的规则
export const getUrl_reducer = (state={currentUrl:''},action) => {
    switch (action.type){
        case allActions.GET_URL:
            return state = {...state,currentUrl:action.currentUrl}
        case allActions.DEL_SHOPINFO:
            return state = {}
        default:
            return state
    }
}

// 添加获取当前总商品数量的规则
export const monitor_goodnum = (state={totalNum:0,status:'',goodDatas:{}},action) => {
    switch (action.type) {
        case allActions.GET_MONGO_DATA:
            return state = {
                totalNum:action.totalNum,
                goodDatas:action.goodDatas
            }
        case allActions.ADD_NUM:
            // 注意这里每次都要返回一个新的state，若直接返回state，会导致前后比较state认为相等从而不会引发渲染
            // 这里的status是用于判断当前是添加还是减少商品
            return state = {
                totalNum:state.totalNum+ action.increaseNum,
                status:action.status,
                // JSON方法实现深拷贝
                goodDatas:Object.assign(
                    {},
                    state.goodDatas,
                    // 需要区分是不是第一次添加商品，因为第一次需要将店铺信息也传递
                    state.goodDatas.cur_good?
                        // 还需判断该商品是不是第一次添加,需判断store里面有无该数据
                        // 已有当前商品，直接数量+1
                        (
                        // 注意map函数会返回一个数组，不匹配项也会有相应的返回值
                       ((state.goodDatas.cur_good.map((item,index) => {
                           return (item._id === action.addItem._id && item.shop_name === action.addItem.shop_name)
                        }).filter((x) => {
                            return x === true
                        })).length>0)
                           ?
                           ((state.goodDatas.cur_good.map((item,index) => {
                               if(item._id === action.addItem._id && item.shop_name === action.addItem.shop_name)
                                   return item
                           }).filter((y) => {
                               return y !== undefined
                           }))[0].cur_num +=action.increaseNum)
                           :
                        state.goodDatas.cur_good.push(action.addItem)):
                        {cur_good:[action.addItem]}
                )
            }

        case allActions.SUB_NUM:
            return state = {
                totalNum:(state.totalNum-action.decreaseNum)>=0?(state.totalNum-action.decreaseNum):0,
                status:(state.totalNum-action.decreaseNum)>=0?action.status:'',
                goodDatas:Object.assign(
                    {},
                    state.goodDatas,
                    // 查找当前项
    // 这里逻辑有问题！！！
                    (state.goodDatas.cur_good.map((itemOne) => {
                        if (itemOne._id === action.subItem._id && itemOne.shop_name === action.subItem.shop_name) return itemOne
                    }).filter((x) => {
                        return x !== undefined
                    }))[0].cur_num -1>0?
                        (state.goodDatas.cur_good.map((itemOne) => {
                        if (itemOne._id === action.subItem._id && itemOne.shop_name === action.subItem.shop_name){
                            return itemOne
                        }
                    }).filter((x) => {
                        return x !== undefined
                    }))[0].cur_num -=1
                        :
                        state.goodDatas.cur_good.map((itemOne,index) => {
                            if (itemOne._id === action.subItem._id && itemOne.shop_name === action.subItem.shop_name){
                                state.goodDatas.cur_good[index].cur_num = 0
                            }
                        })
                    )
            }
        case allActions.INIT_CART:
            return state = {
                totalNum:state.totalNum,
                status:state.status,
                goodDatas:
                    // 需要遍历去除对象里的undefined值
                    // 注意forEach是没有返回值的
                    Object.values(state.goodDatas).forEach((v,i) => {

                        if(v === undefined){
                            // 删除空值
                            delete(state.goodDatas[i])
                        }else if(Array.isArray(v) === true){
                            // 去除cur_good里面数量为0的项目
                            // 若cur_num为0，要删除该项，如cur_good为空，需删除该数组
                            v.map((item,index) => {
                                if(item.cur_num === 0){
                                    state.goodDatas.cur_good.splice(index,1)
                                }
                            })
                        }
                        if(state.goodDatas.cur_good.length === 0){
                            delete state.goodDatas.cur_good
                        }
                    }) || state.goodDatas
                }

        default:
            return state = {...state}
    }
}


// 异步
export const asyncDis =(state={},action) => {
    switch (action.type) {
        case allActions.ASYNC_ACTION:
            return state={name:'async'}
        default:
            return state
    }
}

