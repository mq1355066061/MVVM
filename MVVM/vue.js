// Vue 构造函数
// 初始化数据  把data中的属性挂载到Vue实例中  设置getter、setter
function Vue(options){
    this.$options = options
    this.$data = options.data || {}
    const el = options.el
    // 进行el的类型判断   字符串  或者   DOM元素
    this.$el = typeof el === 'string'?document.querySelector(el):el
    this.proxyData()
    // 传入数据
    new Obsever(this.$data)
    // 传入vue实例  编译模板
    new Compilter(this)
}
// 在这里设置在Vue实例里面可以直接this点调用
Vue.prototype.proxyData = function(){
    // 用来遍历data中的属性   key就是遍历出来的属性
    Object.keys(this.$data).forEach(key => {
        // 在遍历的过程中  把遍历的属性挂载到vue实例中  并设置setter/getter
        Object.defineProperty(this,key,{
            configurable:false,
            enumerable:true,
            get(){
                return this.$data[key]
            },
            set(value){
                if(value === this.$data[key]){return}
                
                this.$data[key] = value
            }
        })
    })
}