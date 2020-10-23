// 使用非关系型数据库mongodb
const mongoose = require('mongoose')
// mongoose 做异步操作时，为了向后兼容，Mongoose 4 默认使用mpromise 作为返回值。mpromise已被废弃，推荐使用 ES6风格的 promises库或者ES6原生的Promise库
mongoose.Promise = global.Promise
//官方给出了一个建议, 因为在创建字段时, 数据库会自动根据自动排序(ensureIndex). 有可能严重拖慢查询或者创建速度,所以一般而言,我们需要将该option 关闭.
mongoose.connect('mongodb://127.0.0.1:27017/myordersystem',{useNewUrlParse:true})

mongoose.connection.on('error',function (){
    console.log('数据库连接失败')
})
mongoose.connection.once('open',function(){
    console.log('数据库连接成功')
})
const models = {
    user:{
        'nickname':{
            type:String,
            required:[true,'name是必须填写的'] // required第二个参数是错误提示信息
        },
        'password':{
            type:String,
            match:/^(?!\d+$)[\da-zA-Z]+$/,  //密码不能是纯数字，必须是字母或字母数字组合
            required:true
        }
    },

    // 存储用户的商品信息
    userrel:{
        'username':{
            type:String,
            required:true
        },
        'currentGood':{
            type:Array,
            required:true
        }
    }
}

// // 遍历生成数据模型
// for(let m in models){
//     // 版本信息不需要
//     mongoose.model(m,new mongoose.Schema(models[m],{versionKey:false}))
// }
// 导出供其他地方查找
module.exports = {
    getModel:function (m) {
        return mongoose.model(m,new mongoose.Schema(models[m],{versionKey:false}))
    }
}
