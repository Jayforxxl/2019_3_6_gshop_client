<template>
  <div id="app">
    <router-view/>
    <!--$route表示当前路由-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {mapActions} from 'vuex'
export default {
  mounted () {
    // this.$store.dispatch('getAddress')
    this.getAddress()
  },
  name: 'App',
  components: {
    FooterGuide
  },
  methods: {
    ...mapActions(['getAddress'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixins.styl';
  @import './common/stylus/app.styl';
</style>
