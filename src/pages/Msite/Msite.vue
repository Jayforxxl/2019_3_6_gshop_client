<template>
  <div class="msite">
    <!--首页头部,引入自定义组件HeaderTop-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-regou"></use>
        </svg>
      </router-link>

      <router-link class="header_login" slot="right" :to=" userInfo._id ? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icon-buding"></use>
          </svg>
        </span>
      </router-link>

    </HeaderTop>
    <!--首页导航,使用swiper-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src=" baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      this.$store.dispatch('getCategorys')
    },
    computed: {
      ...mapState(['address', 'categorys','userInfo']),
      // 生成二维数组categorysArr
      categorysArr () {
        const {categorys} = this
        // 大数组
        const arr = []
        // 小数组
        let minArr = []
        categorys.forEach(c => {
          if (minArr.length === 8) {
            minArr = []
          }
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          minArr.push(c)
        })
        console.log(arr)
        return arr
      }
    },
    watch: {
      categorys (value) {
        /* eslint-disable no-new */
        // 界面更新(即Dom更新)后才立即更新组件对象
        this.$nextTick(() => {
          // 一旦更新立即调用
          new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination'
            },
            direction: 'horizontal'
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/msite.styl";
</style>
