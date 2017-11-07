* 模板语法
Mustache语法：{{msg}}
HTML赋值: v-html=''
绑定属性：v-bind:id=''
使用表达式：{{ok?'YES':'NO'}}
文本赋值： v-text=''
指令： v-if=''
过滤器： {{message | capitailize}} 和 v-bind:id='rawid | formatid'

* Class和Style绑定
对象语法： v-bind:class='{active:isActive,'text-danger':hasError}'
数组语法：
style绑定：对象绑定

* 条件渲染
v-if
v-else
v-else-if
v-show
v-cloak

* 事件处理器
v-on:click='greet'
  修饰符
v-on:click.stop  阻止冒泡
v-on:click.stop.prevent  阻止默认事件
v-on:click.self  只能在自身触发事件
v-on:click.once  只生效一次

v-on:keyup.enter
          .tab
          .delete
          .esc
          .space
          .up
          .down
          ...

* 组件
全局组件和局部组件
父子组件通讯.数据传递
Slot




