function defineReactive(data, key, value) {
    //递归调用，监听所有属性
    observer(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        get: function () {
            // 覆盖了第一层监听函数
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return value;
        },
        set: function (newVal) {
            if (value !== newVal) {
                value = newVal;
                dep.notify(); //通知订阅器
            }
        }
    });
}

function observer(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
}

function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify = function () {
    // 将订阅在这个对象上的所有监听器全部触发
    this.subs.forEach(sub => {
        sub.update();
    })
}
Dep.target = null;