<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(starClass, index) in starClasses" :class="starClass" :key="index"></span>

  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starClasses () {
        const {score} = this
        const scs = []
        const scoreInteger = Math.floor(score)
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        if ((score - scoreInteger) * 10 >= 5) {
          scs.push(CLASS_HALF)
        }
        while (scs.length < 5) {
          scs.push(CLASS_OFF)
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/Star.styl";
</style>
