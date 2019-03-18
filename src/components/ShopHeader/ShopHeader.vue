<template>
  <div class="shop-header">
    <!--ES6中的 动态字符串`url()`,${变量名}是一个整体-->
    <nav class="shop-nav" :style="{backgroundImage: `url(${info.bgImg})`}">
      <a class="back" @click="$router.back()">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-mangguogan"></use>
        </svg>
      </a>
    </nav>

    <div class="shop-content" @click="toggleShopShow">
      <img class="content-image" :src="info.avatar">
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{info.name}}</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{info.score}}</span>
          <span class="shop-message-detail">月售{{info.sellCount}}单</span>
          <span class="shop-message-detail">
            {{info.description}}
            <span>约{{info.deliveryTime}}分钟</span>
          </span>
          <span class="shop-message-detail">距离{{info.distance}}</span>
        </div>
      </div>
    </div>
    <!--
        这里的v-if很重要，因为异步加载数据的意思就是先加载页面的数据之后才会去加载后台数据,
        这会导致supportClasses[info.supports[0].type]成为supportClasses[undefined]
        的情况出现，直接报错
    -->
    <div class="shop-header-discounts" v-if="info.supports" @click="toggleSupportShow">
      <div class="discounts-left">
        <div class="activity" :class="supportClasses[info.supports[0].type]">
          <span class="content-tag">
            <span class="mini-tag">{{info.supports[0].name}}</span>
          </span>
          <span class="activity-content ellipsis">{{info.supports[0].content}}</span>
        </div>
      </div>
      <div class="discounts-right">
        {{info.supports.length}}个优惠
      </div>
    </div>
    <!--商家详情模态框-->
    <!--transition动画-->
    <transition name="fade">
      <div class="shop-brief-modal" v-show="shopShow">
        <div class="brief-modal-content">
          <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
            <span class="content-name">{{info.name}}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{info.score}}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{info.sellCount}}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{info.description}}</h3>
              <p>约{{info.deliveryTime}}分钟</p>
            </li>
            <li>
              <h3>{{info.deliveryPrice}}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{info.distance}}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title">
            <span>公告</span>
          </h3>
          <div class="brief-modal-notice">
            {{info.bulletin}}
          </div>
          <div class="mask-footer" @click="toggleShopShow">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-zhengdangao"></use>
            </svg>
          </div>
        </div>
        <div class="brief-modal-cover"></div>
      </div>
    </transition>
    <!--优惠详情模态框-->
    <transition name="fade">
      <div class="activity-sheet" v-show="supportShow">
        <div class="activity-sheet-content">
          <h2 class="activity-sheet-title">优惠活动</h2>
          <ul class="list">
            <li class="activity-item" v-for="(support, index) in info.supports" :key="index" :class="supportClasses[support.type]">
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </li>
          </ul>
          <div class="activity-sheet-close" @click="toggleSupportShow">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-zhengdangao"></use>
            </svg>
          </div>
        </div>
        <div class="activity-sheet-cover"></div>
      </div>
    </transition>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
        shopShow: false,
        supportShow: false
      }
    },
    computed: {
      ...mapState(['info'])
    },

    methods: {
      toggleShopShow () {
        this.shopShow = !this.shopShow
      },

      toggleSupportShow () {
        this.supportShow = !this.supportShow
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/ShopHeader.styl";
</style>
