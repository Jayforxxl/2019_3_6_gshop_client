<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  export default {
    mounted () {
      this.$store.dispatch('getShopInfo')
    },
    components:{
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/shop.styl";
</style>
