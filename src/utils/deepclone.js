// 深拷贝
function deepClone(obj){
    if(typeof obj !== 'object' || obj === null){
        throw new Error('obj不是一个对象！')
    }
    let cloneObj = Array.isArray(obj)?[]:{}
    for(let key in obj){
        cloneObj[key] = (typeof obj[key] === 'object' && obj[key] !== null)?deepClone(obj[key]):obj[key]
    }
    return cloneObj
}
export default deepClone
