<template>
  <div id="app">
    <router-view/>
    <!--$route表示当前路由-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
// import {reqFoodCategorys} from './api'
export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixins.styl';
  @import './common/stylus/app.styl';
</style>
