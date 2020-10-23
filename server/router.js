const Router = require('koa-router')
const router = new Router()
// 引入加密模块utility
const utils = require('utility')
const model = require('./model')
const mockData = require('../src/mock/data/deliverList');
let User = model.getModel('user')
let UserRel = model.getModel('userrel')
// 该文件用于注册路由中间件

// 加密函数
function my_md5(pwd) {
    const complication = '#A$@*dskfhiusdf*lhp'
    return utils.md5(utils.md5(pwd + complication))
}

// 登录或注册时查找数据库操作
function findNick(nickname) {
    return new Promise((resolve, reject) => {
        User.findOne({nickname}, (err, doc) => {
            if (err) {
                reject(err)
            } else if (doc) {
                console.log('查找到用户资料:/br', doc._doc)
                resolve({
                    code: 0,
                    status: 'Finded',
                    msg: '该用户名已存在',
                    pwd: doc._doc.password,
                    _id: doc._doc._id
                })
            } else {
                // nick未被注册
                console.log('nickname还没注册')
                resolve({
                    code: 0,
                    status: 'Pending',
                    msg: '该用户名可以使用'
                })
            }
        })
    })
}

// 保存新注册用户
function saveUser(data) {
    return new Promise((resolve, reject) => {
        User.create(data, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve({
                    code: 1,
                    status: 'SUCCESS',
                    msg: '用户注册成功'
                })
            }
        })
    })
}

// 由于前端使用了mockjs模拟后端数据，导致请求真实的后端时候被mock拦截，这也是使用ctx.cookies.set方法而前端浏览器却没能拿到cookie数据的原因
// 解决冲突方法：在服务端设置一个路由，在这里使用monck直接返回前端需要的mock数据
router.get('/restaurantInfo', async (ctx, next) => {
    // 返回mock生成的模拟数据
    ctx.response.body = {
        code: 100,
        status: '200',
        mockData
    }

})

// 验证是否登录
router.get('/info', async (ctx, next) => {
    // cookie中用户名和服务端session储存的一致,说明用户已登录
    if (ctx.cookies.get('nickname') && new Buffer(ctx.cookies.get('nickname'), 'base64').toString() === ctx.session.nickname) {
        ctx.response.body = {
            code: 1,
            status: 'ok',
            msg: 'logined',
            nickname: ctx.session.nickname
        }
    } else if (!ctx.cookies.get('nickname')) {
        ctx.response.body = {
            code: 0,
            status: 'failed',
            msg: '未登录！'
        }
    }
})

// 注册----------
router.post('/reg', async (ctx, next) => {
    // 使用koa-body获取post的请求参数
    let ctxdata
    // 拿到前端form表单提交过来的数据，先要到数据库查询看用户名是否存在
    let {nickname, password} = ctx.request.body
    // 注意这里要使用await 因为是异步操作，否则无返回值给前端，前端会报错

    // 在 async 函数内，使用await来执行异步操作，而await 会直接解析 Promise 的resolve 或者reject 中的值。对于有回调函数的操作，并不会被 async 等待，而直接执行，所以在回调函数中书写的ctx.body = results 操作时 页面已经返回，且并未获取到数据库返回的值

    ctxdata = await findNick(nickname, password)
    // nick可以使用
    if (ctxdata.status === 'Pending') {
        ctxdata = await saveUser({nickname, password: my_md5(password)})
    }
    ctx.response.body = ctxdata

})

// 游客模式登录
router.get('/guestLogin',(ctx) => {
    const letter = 'ab1cdef3g9hijk62lm5npqrst7uvw4x8yz'
    const nickname = 'user'+letter.charAt(Math.floor(Math.random()*33))+letter.charAt(Math.floor(Math.random()*33))+letter.charAt(Math.floor(Math.random()*33))+letter.charAt(Math.floor(Math.random()*33))+letter.charAt(Math.floor(Math.random()*33))
    ctx.cookies.set('nickname', new Buffer(nickname).toString('base64'), {
        domain: 'localhost', // cookie作用区域,所在域名
        path: '/', // 前端哪些路由可以使用
        httpOnly: false, // 前端是否可见
        maxAge: 1000 * 60 * 60, // 过期时间
        overwrite: false,
        //secure:false
    })

    // 安全性起见，不能给前端暴露太多私密信息,仅仅暴露一个islogin
    ctx.cookies.set('isLogin', true, {
        domain: 'localhost',
        path: '/',
        httpOnly: false,
        maxAge: 36e5,
        overwrite: false
    })
    //console.log(ctx.cookies)
    ctx.session = {
        nickname
    }
    ctx.response.body = {
        code:1,
        msg:'logined',
        nickname:nickname
    }
})

// 登录----------
router.post('/login', async (ctx, next) => {
    let {nickname, password} = ctx.request.body
    password = my_md5(password)
    //console.log('前面的',ctx)
    await findNick(nickname)
        .then((res) => {
            if (res.status === 'Pending') {
                // 用户名不存在
                ctx.response.body = {
                    code: 0,
                    status: 'Rejected',
                    msg: '用户名不存在,请重新输入！'
                }
            } else if (res.pwd && res.pwd === password) {
                // http协议的Header头有字符限制，http的header字符集支持US-ASCII子集的字符集，故设置中文是'utf8'时就会报错
                // 把字符串转成base64即可
                // this.cookies.set('test', new Buffer('我是koajs').toString('base64'))

                // base64转到字符串
                // new Buffer(str, 'base64').toString();//str是base64编码的字符串


                ctx.cookies.set('nickname', new Buffer(nickname).toString('base64'), {
                    domain: 'localhost', // cookie作用区域,所在域名
                    path: '/', // 前端哪些路由可以使用
                    httpOnly: false, // 前端是否可见
                    maxAge: 1000 * 60 * 60, // 过期时间
                    overwrite: false,
                    //secure:false
                })

                // 用户在数据库的id
                ctx.cookies.set('uId', res._id, {
                    domain: 'localhost', // cookie作用区域
                    path: '/', // 前端哪些路由可以使用
                    httpOnly: true, // 前端是否可见
                    maxAge: 36e5, // 过期时间
                    overwrite: false,
                    //secure:false
                })

                // 安全性起见，不能给前端暴露太多私密信息,仅仅暴露一个islogin
                ctx.cookies.set('isLogin', true, {
                    domain: 'localhost',
                    path: '/',
                    httpOnly: false,
                    maxAge: 36e5,
                    overwrite: false
                })

                // 后端相应设置session保存用户登录信息
                ctx.session = {
                    nickname,
                    uId: res._id
                }
                ctx.response.body = {
                    code: 2,
                    status: 'SUCCESS',
                    msg: '用户登录成功'
                }
            } else {
                ctx.response.body = {
                    code: 1,
                    status: 'Failed',
                    msg: '密码错误！'
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })

    // 登录成功，后台需要用session记录用户信息，并设置前端的cookie以记录登录状态


})


// 退出登录-------
router.get('/logout', async (ctx) => {
    // 这里的cookie是后端给前端设置的
    ctx.cookies.set('nickname', null, {
        maxAge: 0
    })
    ctx.cookies.set('uId', null, {
        maxAge: 0
    })
    ctx.cookies.set('isLogin', null, {
        maxAge: 0
    })
    ctx.session = null

    ctx.response.body = {
        code: 0,
        status: "loginOut success",
        msg: '退出登录成功！'
    }
    //ctx.redirect("/")
})

// 向当前用户添加商品信息
router.post('/submitData', async (ctx) => {
    let {username, currentGood} = ctx.request.body
    //console.log('收到前端数据',username,'-----',currentGood)

    // 需要根据用户名来储存数据
    await UserRel.findOne({username}, async (err, doc) => {
        if (err) {
            console.log('发生错误')
        } else if (doc) {
            // 使用toObject方法过滤掉多余的属性
            let curRent = doc._doc.currentGood.toObject()
            let findOne = doc._doc.currentGood.toObject().filter((item) => {
                return ((item.shop_name === currentGood.shop_name) && (item._id === currentGood._id))
            })
            if (!findOne.length) {
                curRent.push(currentGood)
                UserRel.update({username}, {currentGood: curRent}, (err) => {
                    if (err) {
                        console.log('数据库更新失败')
                    }
                })
            } else {
                // 若是同一商品整合信息即可

                // 若是商品数量减少为0
                if (currentGood.cur_num === 0) {
                    if (curRent.length === 1) {
                        // 如果没有数据了，应该清除掉这一组空数据
                        UserRel.remove({username}, (err, res) => {
                            if (err) {
                                console.log('删除失败')
                            } else {
                                // 这里的res是一个CommandResult对象
                                //console.log('移除成功', res)
                            }
                            return
                        })
                    } else {
                        for (let i = 0; i < curRent.length; i++) {
                            if (curRent[i].shop_name === currentGood.shop_name && curRent[i]._id === currentGood._id) {
                                curRent.splice(i, 1)
                                break
                            }
                        }
                    }
                }

                curRent.map((item, index) => {
                    if ((item.shop_name === currentGood.shop_name) && (item._id === currentGood._id)) {
                        // 注意这里直接操作item是不会修改原数组的！！
                        curRent[index] = currentGood

                    }
                })
                UserRel.update({username}, {currentGood: curRent}, (err) => {
                })
            }
        } else {
            await new UserRel({
                username,
                currentGood: [currentGood]
            })
                .save()
                .then((data, error) => {
                    if (error) {
                        console.log('保存出错')
                    } else if (data) {
                        // 这里的data到底是什么？？data附带不可用正常对象的附加属性和方法模型实例的集合。这些属性和方法是循环中出现的。通过使用toObject，将得到一个没有所有这些附加属性和方法的普通对象
                    }
                })
        }
    })

    ctx.response.body = {
        msg: '递交成功！'
    }
})

// 用户请求之前存储的数据
router.get('/relData',async (ctx) => {
    // 根据当前用户名来返回数据
    let resData = []
    const username = new Buffer(ctx.cookies.get('nickname'),'base64').toString()
    await UserRel.findOne({username})
        .then((res) => {
            console.log('找到了',resData = res._doc.currentGood.toObject())
        })
        .catch((err) => {
            console.log('无相关数据')
        })
    ctx.response.body = {
        msg:'这是储存的数据',
        code:3,
        the_data:resData
    }
})
// 将商品信息存入数据库成功，下一步---根据数据库将用户相关商品信息渲染至订单页面


module.exports = router
