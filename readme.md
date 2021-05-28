<!--
 * @Author: luhongxuant
 * @Date: 2021-05-17 20:17:27
 * @LastEditors: luhongxuan
 * @LastEditTime: 2021-05-17 20:38:32
 * @Description: Do no edit
-->
### Observer：Object.defineProperty 数据劫持,

### Dep：订阅器 Watcher 的容器
+ 属性data的每一个key都会添加独立的dep
  + 如果碰到 Object ，会继续递归去添加 dep   
  + 与一个属性有关的监听时间都会赋值给Watcher的update属性上，此watcher作为sub
添加到该属性对应dep的 subs 属性中
### Watcher：update的容器，两种类型：
##### DOM 元素变化 => 原生监听事件 => $data属性变化 
##### $data属性变化 => 监听器 => DOM元素重新渲染



<hr>

#### ES6允许在对象属性名与value变量名相同二点情况可简写

```
new Mvue({
      // 相当于 mounted: function mounted(){}
      mounted(){}
});
```
