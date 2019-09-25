function EventEmitter () {
    // 存储注册的事件名称和处理函数
    this.subs = {}
  }
  
  // 注册事件
  //  click, fn
  EventEmitter.prototype.$on = function (eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }
  
  // ...rest 剩余参数，rest是数组，剩余参数必须是所有参数中的最后一个
  EventEmitter.prototype.$emit = function (eventType, ...rest) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handler => {
        // 调用函数的时候...rest 展开运算符
        // 此处的this，是em的实例
        handler.call(this ,...rest)
      })
    }
  }
  
  // 创建一个em对象
  const em = new EventEmitter()
  