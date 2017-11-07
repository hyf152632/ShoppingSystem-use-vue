//Object.defineProperty()原理
var obj = {};
Object.defineProperties(obj,'userName',{
    //每次获取obj中的元素的时候，会触发get()
    get:function() {
        console.log('get init');
    },
    //每次设置obj的值的时候，会触发set()
    set:function() {
        console.log('set init');
    }
});
