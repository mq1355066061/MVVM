// 数据劫持
// 吧$data 中的数据设为响应式，设置getter、setter 数据变化发送通知来改变视图
function Obsever (value){
    this.walk(value)
}
// 
Obsever.prototype.walk = function(data){
    // 遍历属性
    Object.keys(data).forEach(key=>{
        this.defineReactive(data,key,data[key])
    })
}
Obsever.prototype.defineReactive = function(data,key,value){
        // 进行设置
    Object.defineProperty(data,key,{
        configurable:false,
        enumerable:true,
        get(){
            return value
        },
        set(newVal){
            if(value === newVal)
            return
            value = newVal
            //数据变化发送通知来改变视图
            em.$emit(key)
        }
    })
}