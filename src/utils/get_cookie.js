// 设置cookie


// 根据cookie名从documeng.cookie获取相应值
function getCookie(key) {
    if(!document.cookie)return
    let val
    let cookiesStr = document.cookie
    // 去掉字符里多余空格
    cookiesStr = cookiesStr.replace(/\s/g,'')
    // 将缓存字符串切割成数组
    let cookiesArr = cookiesStr.split(';'),
        len = cookiesArr.length
    for(let i=0;i<len;i++){
        let cookieArr = cookiesArr[i].split('=')
        if(cookieArr[0] === key){
            val = cookieArr[1]
            break
        }
    }
    // 如果key是昵称，可能存在中文，需要解码
    if(key === 'nickname' && !!val){
        // base64转到字符串
        // new Buffer(str, 'base64').toString();//str是base64编码的字符串
        val = new Buffer(val, 'base64').toString()
    }
    return val
}
export default getCookie
