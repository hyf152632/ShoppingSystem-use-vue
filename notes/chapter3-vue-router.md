路由根据不同的url地址展示不同的内容或页面
前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据url的不同返回不同的页面实现的。

什么时候使用前端路由？
单页面应用中，大部分页面结构不变，只改变部分内容的时候使用。

单页面应用的特点
优点：
用户体验好，不需要每次都从服务器全部获取，快速展现给用户
缺点：
不利于SEO
使用浏览器的前进，后退键的时候会重新发送请求，没有合理的利用缓存
单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

vue-router用来构建SPA
<router-link></router-link>或者this.$router.push({path:''})
<router-view></router-view>

* get
动态路由匹配
嵌套路由
编程式路由
命名路由和命名视图

* 动态路由
```javascript
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '/component/Hello';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/goods/:goodsId/user/:name',
            name: 'Hello',
            component: Hello
        }
    ]
})
```
一个组件：
src/views/GoodsList.vue
```javascript
<template>
    <div>
        这是商品列表页面
    </div>
</template>
<style>
    body{
        background-color:#f00;
    }
</style>
<script>
    import HeaderComponent from './component/header.vue';
    import OtherComponent from './component/other.vue';
    export default{
        data() {
            return {
                msg: 'hello vue'
            }
        },
        components: {
            'other-component':OtherComponent,
            HeaderComponent,
        }
    }
</script>
```

* 嵌套路由
```javascript
import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from './../views/GoodsList';
import Title from '@/views/Title';
import Image from '@/views/Image';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/goods',
        name: 'GoodsList',
        component: GoodsList,
        children: [
            {
                path: 'title',    //注意这个路径不要在前面加"/"
                name: 'title',
                component: Title 
            },
            {
                path: 'img',
                name: 'img',
                component: Image 
            },
        ]
    }]
});
```
* 编程式路由
通过js来实现页面的跳转
$router.push('name');
$router.push({path:'name'});
$router.push({path:name?a=123}）或者$router.push({path:'name',query:{a:123}})
$router.go(1);

*命名路由和命名视图
  给路由定义不同的名字，根据名字进行匹配
  给不同的router-view定义名字，通过名字进行对应组件的渲染

