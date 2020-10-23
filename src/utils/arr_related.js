// 数组去重 最好不要把方法挂载到原型上面，深拷贝会出问题的
function unique(arr){
    const newArr = []
    for(let i=0,len=arr.length;i<len;i++){
        if(newArr.indexOf(arr[i]) === -1){
            newArr.push(arr[i])
        }
    }
    return newArr
}
export default unique
