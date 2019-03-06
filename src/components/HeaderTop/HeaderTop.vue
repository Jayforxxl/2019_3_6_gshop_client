<template>
  <header class="header">
    <!--props传递的是数据，slot传递的是标签-->
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/HeaderTop.styl";
</style>
