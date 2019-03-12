<template>
  <div class="shop_container">
    <ul class="shop_list" v-if="shops.length">
      <li class="shop_li border-1px" v-for="(shop, index) in shops" :key="index">
        <a>
          <div class="shop_left">
            <img class="shop_img" :src="shop.image_path">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{shop.name}}</h4>
              <ul class="shop_detail_ul">
                <li class="supports" v-for="(support,index) in shop.supports" :key="index" >{{support.icon_name}}</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <!--<div class="star star-24">-->
                  <!--<span class="star-item on"></span>-->
                  <!--<span class="star-item on"></span>-->
                  <!--<span class="star-item on"></span>-->
                  <!--<span class="star-item half"></span>-->
                  <!--<span class="star-item off"></span>-->
                <!--</div>-->
                <Star :score="shop.rating" :size="24"></Star>
                <div class="rating_section">
                  {{shop.recent_order_num}}
                </div>
                <div class="order_section">
                  月售{{shop.rend}}单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{shop.float_minimum_order_amount}}起送</span>
                <span class="segmentation">/</span>
                <span>{{shop.piecewise_agent_fee.tips}}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in 6" :key="item">
        <img src="./images/shop_back.svg" alt="back">
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Star from '../../components/Star/Star.vue'
  export default {
    mounted () {
      this.$store.dispatch('getShops')
    },
    computed: {
      ...mapState(['shops'])
    },
    components: {
      Star
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/ShopList.styl";
</style>
