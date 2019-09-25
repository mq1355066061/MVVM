// 渲染模板
function Compilter(vm){
    this.vm  = vm
    this.compile(vm.$el)
}
// 编译模板
Compilter.prototype.compile = function(el)  {
    // 遍历el中的所有子节点  根据节点类型进行不听操作
    Array.from(el.childNodes).forEach(node=>{
        if(this.isTextNode(node)){
            this.textNode(node)
        }else if(this.isElementNode(node)){
            this.elementNode(node)
            // 元素节点可能包含其他节点  所以要继续进行遍历  利用递归
            this.compile(node)
        }
    })
}

// 编译文本节点  插值
Compilter.prototype.textNode = function(node){
    // {{name}}
    const txt = node.textContent
    // 进行处理
    const reg = /\{\{(.+)\}\}/
    if(reg.test(txt)){
        // name
        const key = RegExp.$1.trim()
        // 把node.textcontent中的{{}}部分替换为$data中对应的值
        node.textContent=txt.replace(reg,this.vm.$data[key])
        // 注册事件
        em.$on(key,()=>{
            node.textContent = this.vm[key]
        })
    }
    
}
// 编译元素节点  指令
Compilter.prototype.elementNode = function(node){
    // Array.from  伪数组转为数组  遍历属性
    Array.from(node.attributes).forEach(attr=>{
        // 判断属性是否为指令
        const name = attr.name
        if(this.isDirective(name)){
            // 得到指令对应的值  根据这个进行替换
            const value = attr.value
            if(name === 'v-model'){
                node.value = this.vm.$data[value]
                // 注册事件  数据变化更新视图
                em.$on(value,()=>{
                    node.value = this.vm[value]
                })
                // 视图更新  更新数据
                node.oninput = () => {
                    this.vm[value] = node.value
                }
            }else if(name === 'v-text'){
                node.textContent = this.vm.$data[value]
                // 注册事件  数据变化更新视图
                em.$on(value,()=>{
                    node.textContent = this.vm[value]
                })
                // 不用实现双向数据绑定
            }
        }
    })
}
// 下面三个用来判断的函数
Compilter.prototype.isTextNode = function(node){
    return node.nodeType === 3
}
Compilter.prototype.isElementNode = function(node){
    return node.nodeType === 1
}
Compilter.prototype.isDirective = function(attrName){
   return attrName.startsWith('v-')
}