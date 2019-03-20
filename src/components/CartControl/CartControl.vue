<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="updateFoodCount(false)">
        <svg class="icon svg-icon" aria-hidden="true" style="width: 1em;height: 1em">
          <use xlink:href="#icon-buding"></use>
        </svg>
      </div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <!--.stop必须停止事件冒泡，否则会出现点击添加但是也会出现详情模态框的情况-->
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)">
      <svg class="icon svg-icon" aria-hidden="true" style="width: 1em;height: 1em">
        <use xlink:href="#icon-buding"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },

    methods: {
      updateFoodCount (isAdd) {
        this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/CartControl.styl";
</style>





