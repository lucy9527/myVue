/*
 * @Author: luhongxuant
 * @Date: 2021-05-17 10:23:01
 * @LastEditors: luhongxuan
 * @LastEditTime: 2021-05-17 17:30:23
 * @Description: Do no edit
 */
function Mvue(options, prop) {
    this.$options = options;
    this.$data = options.data;
    this.$prop = prop;
    this.$el = document.querySelector(options.el);
    //数据代理 或者说是数据劫持
    Object.keys(this.$data).forEach(key => {
        // 先代理外面一层
        this.proxyData(key);
    });
    this.init();
}

Mvue.prototype.init = function () {
    observer(this.$data);
    new Compile(this);
}
Mvue.prototype.proxyData = function (key) {
    Object.defineProperty(this, key, {
        get: function () {
            console.log('index');
            return this.$data[key]
        },
        set: function (value) {
            this.$data[key] = value;
        }
    });
}