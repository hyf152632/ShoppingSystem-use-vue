let [a,b,c] = 'ES6';
//a:'E'
//b:'S'
//c:'6'

let arr1 = [1,2,3];
let arr2 = [4,5,6];
[...arr1,...arr2];

var [x,...y] = [2,3,5,7,8]

let b = [...'es6'];

//Promise
```javascript
let checkLogin = function() {
    return new Promise(function(resolve,reject) {
        let flag = document.cookie.indexOf("userId") > -1?true:false;
        if(flag) {
            resolve({
                status:0,
                result:true
            });
        }else{
            reject('error');
        }
    });
};

let getUserInfo = () => {
    return new Promise((resolve,reject) => {
        let userInfo = {
            userId: '101'
        };
        resovle(userInfo);
    });
};

checkLogin().then(function(res){
    if(res.status ===0) {
        console.log('login success');
        return getUserInfo();
    }
}).catch((error) => {
    console.log(`errors: ${error}`);
}).then((res2) => {
    console.log(res2.userId);
});

Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2]) => {
    console.log(res1,res2);
})

//import ,export
//export default 
//if export let a = ...
//use 对象的解构方式
//import { a } from 'a'
//只要是export有名字的变量，import需要用对象解构,即，import {a,b} from '..';

//util.js
export let sum = () => {};
export let minus = () => {};

//main.js
import {sum,minus} from './util.js';
sum();
minus();

import * as util from './util.js';

//使用import进行异步请求,异步加载文件：
//in new Vue
new Vue({
    data:{
        msg:''
    },
    methods:{
        increment() {
            import('./../util.js');
        }
    }
});
```

