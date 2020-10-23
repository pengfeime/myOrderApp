const Koa = require('koa')
const koaBody = require('koa-body')
const static = require('koa-static')
const path = require('path')
// const cors = require('koa-cors')
// const sslify = require('koa-sslify').default;//http强制HTTPS
// const https = require('https');//node内置https server
//const fs = require('fs')
// 引入session
const session = require('koa-session')
const router = require('./router')
// 创建app服务
const app = new Koa



// 用于session签名sign
app.keys = ['some secret hurr']
//session配置
// maxAge,这个是确定cookie的有效期，默认是一天。
// rolling, renew，这两个都是涉及到cookie有效期的更新策略
// httpOnly，表示是否可以通过javascript来修改，设成true会更加安全
// signed，这个涉及到cookie的安全性，下面再讨论
// store，可以传入一个用于session的外部存储

const CONFIG = {
    key:'koaKey', // cookie key
    maxAge:36e5, // 过期时间
    overwrite:true,
    httpOnly:true, //前端是否可见
    rolling:true, // 自动刷新过期时间
    signed:true // 设置签名
}



app.use(session(CONFIG,app))
// 配置服务器跨域 非常重要！
app.use(cors({
    origin: (ctx) => {
        const origin = ctx.headers.origin  // 实际生产请根据具体情况来进行规则配置
        return origin
    },
    // 表示允许跨域发送cookie
    credentials: true
}))
// 解析post请求体
app.use(koaBody())
// 挂载路由

app.use(router.routes())
    .use(router.allowedMethods())

// 静态文件处理
app.use(static(path.join(__dirname)))


// app.use(sslify()) // 使用ssl
// let options= {
//     key:fs.readFileSync('../../../keystore/4159847_www.lengendliu.cn.key'), //私钥文件
//     cert:fs.readFileSync('../../../keystore/4159847_www.lengendliu.cn.pem') //证书文件
// }
// // app.callback()是koa封装好的一个函数，作为原生nodejs的callback回调函数，接收req,res两个参数
// https.createServer(options,app.callback()).listen(3002,() => {
//     console.log('Your server is running at port:3002 successfully!')
// })
app.listen(3002,() => {
    console.log('Your server is running at port:3002 successfully!')
})
