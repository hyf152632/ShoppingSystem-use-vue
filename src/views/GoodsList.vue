<template>
<div>
<nav-header></nav-header>
<nav-bread>
  <span>goods</span>
</nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur"  >Default</a>
      <a href="javascript:void(0)" class="price "  @click="sortGoods">
        Price
        <svg  class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" >
        <g>
	   <polygon points="48.121,37.224 34.619,50.726 34.619,3.249 29.382,3.249 29.382,50.729 15.878,37.224 12.175,40.928 32,60.751
		51.825,40.928 	"/>
      </g>
      </svg>
    </a>
      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)"  v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceChecked">All</a></dd>
          <dd v-for="(price,index) in priceFilter" >
            <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
          </dd>
        </dl>
      </div>
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList">
              <div class="pic">
                <a href="#"><img v-lazy="'/static/' + item.productImage " alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
          <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40">
              <img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="加载中..." v-show="showLoading">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
<modal v-bind:mdShow="mdShow" v-on:close="closeModal">
  <p slot="message">
    请先登录，否则无法加入到购物车。
  </p>
  <div slot="btnGroup">
    <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
  </div>
</modal>
<modal :mdShow="mdShowCart" @close="closeCartModal">
  <p slot="message">
    <span>加入购物车成功。</span>
  </p>
  <div slot="btnGroup">
    <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
    <router-link class="btn btn--m" href="javascript:;" to="/cart"> 查看购物车</router-link>
  </div>
</modal>
<nav-footer></nav-footer>
</div>
</template>
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .sort-up {
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
  .btn:hover {
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
</style>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread  from '@/components/NavBread.vue'
    import Modal from "./../components/Modal.vue"
    import axios     from 'axios'
    import VueLazyLoad from 'vue-lazyload'
    import Vue   from 'vue'
    import infiniteScroll from 'vue-infinite-scroll'

    Vue.use(infiniteScroll);
    Vue.use(VueLazyLoad,{
      loading:"/static/loading-svg/loading-bars.svg",

    });

    export default{
      data() {
        return{
          goodsList:[],
          sortFlag:true,
          page:1,
          pageSize:8,
          busy:true,
          showLoading:false,
          priceChecked:'all',
          mdShow:false,
          mdShowCart:false,
          cartCount: 0,
          priceFilter: [
            {
              startPrice:'0',
              endPrice:'100'
            },
            {
              startPrice:'100',
              endPrice:'500'
            },
            {
              startPrice:'500',
              endPrice:'1000'
            },
            {
              startPrice:'1000',
              endPrice:'5000'
            }
          ],
        filterBy:false,
        overLayFlag:false
        }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Modal
      },
      mounted:function() {
        this.getGoodsList();
      },
      methods:{
        getGoodsList(flag) {

          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel: this.priceChecked
          }
          this.showLoading = true;
          axios.get('/goods/list',{
            params:param
          }).then((response) => {
            var res = response.data;
            this.showLoading = false;
            if(res.status == "0") {
              if(flag) {
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.count ==0) {
                  this.busy =true;
                }else{
                  this.busy = false;
                }
              }else{
                this.goodsList = res.result.list;
                this.busy = false;
              }
            }else{
              this.getGoodsList =[];
            }
          });
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        showFilterPop() {
          this.filterBy = true;
          this.overLayFlag = true;
        },
        closePop() {
          this.filterBy =false;
          this.overLayFlag = false;
        },
        setPriceFilter(index) {
          this.priceChecked = index;
          this.overLayFlag = false;
          this.filterBy = false;
          this.page =1;
          this.getGoodsList();

        },
        loadMore() {
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 500);
        },
        setPriceChecked() {
          this.priceChecked = 'all';
          this.page=1;
          this.getGoodsList();
        },
        addCart(productId) {
          axios.post('/goods/addCart',{
            productId:productId
          }).then((res)=> {
            if(res.data.status == 0) {
              this.mdShowCart = true;
              this.cartCount = 1;
            }else{
              this.mdShow = true;
            }
          })
        },
        closeModal() {
          this.mdShow = false;
        },
        closeCartModal() {
          this.mdShowCart = false
        }

      }
    }
</script>



