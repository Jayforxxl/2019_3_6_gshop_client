<template>
  <div id="app">
    <router-view/>
    <!--$route表示当前路由-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixins.styl'
  #app
    width 100%
    height 100%
    background #f5f5f5
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    bottom 0px
    left 0px
    width 100%
    background #fff
    height 55px
    padding-top 10px
    padding-bottom 10px
    text-align center

  .guide_item
    display inline-block
    width 23%
    text-align center
  .guide_item div
    /*width 25%*/

  .on
    color green
</style>
