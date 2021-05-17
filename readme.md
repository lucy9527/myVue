<!--
 * @Author: luhongxuant
 * @Date: 2021-05-17 20:17:27
 * @LastEditors: luhongxuan
 * @LastEditTime: 2021-05-17 20:38:32
 * @Description: Do no edit
-->
### Observer：Object.defineProperty 数据劫持,

### Dep：订阅器 Watcher 的容器

### Watcher：update的容器，两种类型：
##### DOM 元素变化 => 原生监听事件 => $data属性变化 
##### $data属性变化 => 监听器 => DOM元素重新渲染