# Vuex介绍
state
getters
mutations
actions
modules

## 使用
* 安装
npm i vuex --save
* 加载
在main.js中：
   引入：
   import Vuex from "vuex"
   使用：
   Vue.use(Vuex);
   实例化：
    const store = new Vuex.Store({})
    在Vue实例加载：
    store,

中大型项目
在src目录中，建立store文件夹，





















## 语法介绍
```javascript
//引入vuex，并定义vuex实例
const store = new Vuex.Store({    //创建vuex实例
            state:{
                count:1000
            }
        })
        new Vue({
            el:'#app',
            store,              //引入vuex实例，如果键值不同，需要键值形式
            
            data:{
                message:'vuex使用',
                precount:12
            },
            components:{
                counter
            }
        })
```

```javascript
//组件中使用vuex中的state
//html结构
`<div id='app'>
<h2>{{msg}}</h2>
<counter><counter>
</div>
`
const counter = {
    template:`
    <div>{{count}}</div>
    `,
    computed:{
        count(){
            return this.$store.state.count;
        }
    }
};
const store = new Vuex.Store({
    state:{
        count:0
    }
});

new Vue({
    el:'#app',
    store,
    data:{
        msg:''
    },
    components:{
        counter
    }
})
```

```javascript
//父子组件传值
//html结构
`<div id='app'>
<h2>{{msg}}</h2>
<counter v-bind:count='precount'><counter>
</div>
`
const counter = {
    template:`
    <div>{{count}}</div>
    `,
    props:['count']     //接收父组件的值
};

new Vue({
    el:'#app',
    store,
    data:{
        precount:20,
        msg:''
    },
    components:{
        counter
    }
})
```
```javascript
//使用mutations改变状态,并触发提交
//html结构
`<div id='app'>
<h2>{{msg}}</h2>
<a href='javascript:;' @click='add'>点击</a>
<counter><counter>
</div>
`
const counter = {
    template:`
    <div>{{count}}</div>
    `,
    computed:{
        count(){
            return this.$store.state.count;
        }
    }
};
const store = new Vuex.Store({
    state:{
        count:10
    },
    mutations:{
        // increment(state){          第一个默认参数是state，还可以另外传参
        //     state.count++;
        // }
        increment(state,num) {
            state.count = num;
        }
    }
});

new Vue({
    el:'#app',
    store,
    data:{
        msg:''
    },
    components:{
        counter
    },
    methods:{
        add(){
            // this.$store.commit('increment');    //提交
            this.$store.commit('increment',100);   //提交
        }
    }
})
```

```javascript
//提交
//html结构
`<div id='app'>
<h2>{{msg}}</h2>
<a href='javascript:;' @click='add'>点击</a>
<counter><counter>
</div>
`
const counter = {
    template:`
    <div>
    <div>{{count}}</div>
    <div>{{name}}</div>
    </div>
    `,
    computed:{
        count(){
            return this.$store.state.count;
        },
        name() {
            return this.$store.state.name;
        }
    }
};
const store = new Vuex.Store({
    state:{
        count:10,
        name:'jack'
    },
    mutations:{
        // increment(state){      第一个默认参数是state，还可以另外传参
        //     state.count++;
        // }
        increment(state,num) {
            state.count = num;
        },
        updateName(state,userName) {
            state.name = userName;
        }
    }
});

new Vue({
    el:'#app',
    store,
    data:{
        msg:''
    },
    components:{
        counter
    },
    methods:{
        add(){
            // this.$store.commit('increment');    //提交
            this.$store.commit('increment',100);  
            this.$store.commit('updateName','马云'); //提交
        }
    }
})
```

```javascript
//使用actions触发提交，它可以执行异步操作，
//html结构
`<div id='app'>
<h2>{{msg}}</h2>
<a href='javascript:;' @click='add'>点击</a>
<counter><counter>
</div>
`
const counter = {
    template:`
    <div>
    <div>{{count}}</div>
    <div>{{name}}</div>
    </div>
    `,
    computed:{
        count(){
            return this.$store.state.count;
        },
        name() {
            return this.$store.state.name;
        }
    }
};
const store = new Vuex.Store({
    state:{
        count:10,
        name:'jack'
    },
    mutations:{
        // increment(state){          
        //     state.count++;
        // }
        increment(state,num) {
            state.count = num;
        },
        updateName(state,userName) {
            state.name = userName;
        }
    },
    actions:{
        incrementAction(context,num) {              //1.定义事件
            context.commit('increment',num)
        }
    }
});

new Vue({
    el:'#app',
    store,
    data:{
        msg:''
    },
    components:{
        counter
    },
    methods:{
        add(){
            // this.$store.commit('increment');    //提交mutaions
            // this.$store.commit('increment',100);    //提交mutaions
            // this.$store.commit('updateName','马云');
            this.$store.dispatch('incrementAction',5)  //提交actions
        }
    }
})
``` 

```javascript
//使用getters,过滤和装饰state中的值,但是不会改变state中的值。
//html结构
`<div id='app'>
<h2>{{msg}}</h2>
<a href='javascript:;' @click='add'>点击</a>
<counter><counter>
</div>
`
const counter = {
    template:`
    <div>
    <div>{{count}}</div>
    <div>{{userName}}</div>                         //第三步，使用
    </div>
    `,
    computed:{
        count(){
            return this.$store.state.count;
        },
        name() {
            return this.$store.state.name;
        },
        userName(){
            return this.$store.getters.userName;     //第二步，使用
        }
    }
};
const store = new Vuex.Store({
    state:{
        count:10,
        name:'jack'
    },
    getters:{
        userName(state) {                   //第一步定义
            state.name + ',Hello';
        }
    }
    mutations:{
        // increment(state){          
        //     state.count++;
        // }
        increment(state,num) {
            state.count = num;
        },
        updateName(state,userName) {
            state.name = userName;
        }
    },
    actions:{
        incrementAction(context,num) {              //1.定义事件
            context.commit('increment',num)
        }
    }
});

new Vue({
    el:'#app',
    store,
    data:{
        msg:''
    },
    components:{
        counter
    },
    methods:{
        add(){
            // this.$store.commit('increment');    //提交mutaions
            // this.$store.commit('increment',100);    //提交mutaions
            // this.$store.commit('updateName','马云');
            this.$store.dispatch('incrementAction',5)  //提交actions
        }
    }
})
``` 