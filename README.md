# 一个基于vue2.0 + express + mongoDB 的全栈商城系统项目

## 项目说明
这个项目来源于慕课网的一个[实战项目](http://coding.imooc.com/class/113.html?mc_marking=58fc4a3eef797bb53e2a572b4492e1cb&mc_channel=syb9)  
这里是[项目效果](http://imooc.51purse.com/#/goods)  
项目的前端静态部分(页面结构+样式)是讲师提供的，其他部分都是我跟着讲师一行行敲出来的。  
在之后我回过头来整理这个项目的时候，去掉了其中vuex的部分，因为讲师在这个项目中对vue的运用有些牵强，数据量不大，数据关系也没有复杂到需要运用vuex的地步。  
但是不管怎样，在一步步跟随讲师完成这个实战项目的过程中我还是收获了很多，以前只是通过vue官网，浏览一些博客和通过一些小的demo学习vue,这是我做的第一个  算是比较完整的项目。虽然项目规模不是很大，但是通过这个项目使我对vue的认识更加具体和完整。  

## 项目组成介绍  
这是一个全栈的商城系统，具备完整的商城系统功能，其中：  
### 后端部分包括：  
基于node.js的express实现的服务器，与前端进行数据的交换；  
基于mongoDB的数据库；  
### 前端部分包括：  
商品信息展示页面：用来实现商品的展示，商品的排序，筛选，商品添加到购物车；  
购物车页面：修改商品数量，商品的选择，删除，提交购物车；  
地址页面：地址的选择，删除，默认地址的设置；  
结算确认页面：确认商品信息和结算信息；  
结算成功页面：展示购物成功的信息。  

## 技术栈&功能点
* vue-cli 脚手架工具构建前端项目
* vue-router 作为路由工具
* axios 作为前端的数据请求工具
* vue-lazyload 实现图片懒加载
* vue-infinite-scroll 实现内容分页和滚动加载
* mongoose 作为后端服务器与数据库的交互工具

## 补充说明  
* 目录中的notes文件夹是我的笔记，不是完整的笔记，另外的一部分在onenote里。
* 回过头来整理的时候，发现了几个挺重要的知识点，这里记录一下：  
1. 路由传参  
> 声明式的路由传参：  
``` html
<router-link :to="{path:'orderConfirm',query:{'addressId':selectAddrId}}">Next</router-link>
```  
> 编程式的路由传参：  
``` javascript
this.$router.push({
    path:'/orderSuccess?orderId=' + this.result.orderId
})
```
> 获取路由中的参数
``` javascript
//这里是route而不是router
let addressId = this.$route.query.orderId
```  
2. 限制购物地址的显示数量，默认显示3条，点击更多按钮，显示全部。  
   1. 从后端请求数据，保存在一个data属性中；  
   2. 设置一个data属性，用来表示默认显示的数量，在这里是3；  
   3. 设置一个计算属性，用来将源数据返回截取的数据  
   4. 给显示更多按钮绑定一个事件，更改限制变量的值，如果是3就设置成源数据的长度，否则就是3.   
3. v-for 和 v-if 一起使用的时候，v-for 的优先级要高于 v-if.
