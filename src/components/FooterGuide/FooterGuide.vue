<template>
  <div class="footer_guide">
    <!--$route获得当前页面请求的路径-->
    <div class="guide_item" :class="{on:'/msite' === $route.path}" @click="goTo('/msite')">
      <span class="item_icon">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-niunai"></use>
        </svg>
      </span>
      <div>外卖</div>
    </div>
    <div class="guide_item" :class="{on:'/search' === $route.path}" @click="goTo('/search')">
      <span class="item_icon">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-hanbaobao"></use>
        </svg>
      </span>
      <div>搜索</div>
    </div>
    <div class="guide_item" :class="{on:'/orders' === $route.path}" @click="goTo('/orders')">
      <span class="item_icon">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-zhengjiao"></use>
        </svg>
      </span>
      <div>订单</div>
    </div>
    <div class="guide_item" :class="{on:'/profile' === $route.path}" @click="goTo('/profile')">
      <span class="item_icon">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-tiantianquan"></use>
        </svg>
      </span>
      <div>我的</div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      goTo (path) {
        this.$router.replace(path)
      }
    }
  }
</script>
