function Compile(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        this.fragment = this.nodeFragment(this.el); // copy一份副本
        this.compileNode(this.fragment); // 递归遍历节点
        this.el.appendChild(this.fragment); // 解析完成添加到元素中
    },
    nodeFragment: function (el) {
        const fragment = document.createDocumentFragment();
        let child = el.firstChild;
        // 将子节点，全部移动文档片段里
        // 这里并没有遍历完全
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileNode: function (fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(node => {

            if (this.isElementNode(node)) {
                this.compileElement(node);
            }
            // .匹配任何字符  * 0或多个
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;

            if (reg.test(text)) {
                let prop = reg.exec(text)[1];
                this.compileView(node, prop); //替换模板
            }

            //编译子节点
            if (node.childNodes && node.childNodes.length) {
                this.compileNode(node);
            }
        });
    },
    compileElement: function (node) {
        let nodeAttrs = node.attributes;
        [...nodeAttrs].forEach(attr => {
            let name = attr.name;
            let value = attr.value;
            // 如果添加其它命令，可以在这里添加
            switch (this.isDirective(name)) {
                case 'm':
                    this.compileModel(node, value);
                    break;
                case 's':
                    this.compileShow(node, value);
                    break;
                case 'o':
                    name = name.split(':')[1]
                    this.compileOn(node , name , value)
                    break;
                case 'o@':
                    name = name.split('@')[0]
                    this.compileOn(node , name , value)
                    break;
                default:
                    break;
            }
        });
    },
    compileModel: function (node, prop) {
        // 视图的更新触发 虚拟DOM 的更新
        // v-Model出现：则给该节点挂载监听函数
        let val = this.vm.$data[prop];
        this.updateModel(node, val);

        // new Watcher(this.vm, prop, (value) => {
        //     this.updateModel(node, value);
        // });
        // 监听对应事件，更改
        node.addEventListener('input', e => {
            let newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            this.vm.$data[prop] = newValue;
        });
    },
    compileShow: function (node, prop) {
        let isShow = this.vm.$data[prop]
        this.updateShow(node, isShow)
        new Watcher(this.vm, prop, (value) => {
            this.updateShow(node, value)
        })
    },
    compileOn: function (node, eType , prop) {
        node.addEventListener(eType , () => {
            console.log(this.vm);
            this.vm.$methods[prop].bind(this.vm)()
        })
    },
    compileView: function (node, prop) {
        // 对 {{}} 进行处理  ，将其中的 虚拟节点 data 属性 更新
        let text = this.vm.$data[prop];
        this.updateView(node, text);
        new Watcher(this.vm, prop, (value) => {
            this.updateView(node, value);
        });
    },

    updateModel: function (node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    updateView: function (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    updateShow: function (node, value) {
        node.style.display = !value ? 'none' : 'block'
    },
    isDirective: function (attr) {
        if (attr.startsWith('v-model')) {
            return 'm'
        } else if (attr.startsWith('v-show')) {
            return 's'
        } else if (attr.startsWith('v-on')) {
            return 'o'
        }else if(attr.startsWith('@')){
            return 'o@'
        }
        return -1
        // return attr.indexOf('v-') !== -1 || attr.startsWith('v-on') || attr.startsWith('@');
    },

    isElementNode: function (node) {
        return node.nodeType === 1;
    },
    isTextNode: function (node) {
        return node.nodeType === 3;
    }
}