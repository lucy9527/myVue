function Watcher(vm, prop, callback) {
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    this.value = this.get();
}
Watcher.prototype.update = function () {
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
        this.value = value;
        this.callback(value,oldVal);
        // newVal oldVal 都传，需要在自己监听的回调函数中 加入第二个参数（比如 watch 属性）
    }
}
Watcher.prototype.get = function () {
    Dep.target = this; //储存订阅器
    // 这里触发 Dep 容器装 Watcher
    const value = this.vm.$data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法
    Dep.target = null;
    return value;
}