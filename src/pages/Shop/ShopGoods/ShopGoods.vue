<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index===currentIndex}">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" >
                <div class="icon" style="width: 2em;height: 4em">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--<CartControl :food="food"/>-->
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--<ShopCart />-->
    </div>
    <!--<Food :food="food" ref="food"/>-->
  </div>
</template>



<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        scrollY:0,
        tops:[]
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods',() => {
        //组件收到action数据更新了的消息之后才会执行这里
        this.$nextTick(() => {//列表数据更新显示后才执行
          // 第一步：列表显示之后创建BScroll
          this._initScrol();
          // 第二步：列表第一次显示后，收集tops
          this._initTops();
        })
      })
    },
    computed: {
      ...mapState(['goods']),
      // 第三步：计算得到当前分类的下标
      currentIndex () {
        //得到条件数据
        const{scrollY,tops} = this;
        const index = tops.findIndex((top,index) => {
          return scrollY >= top && scrollY < tops[index+1]
        })
        //返回结果
        return index
      }
    },
    methods: {
      // 初始化滚动(加下划线只是为了区别和事件的回调函数)
      _initScrol () {
        const menuScroll = new BScroll('.menu-wrapper')
        const foodsScroll = new BScroll('.foods-wrapper',{
          probeType:2
        })
        // 给右侧列表绑定scroll监听
        foodsScroll.on('scroll',({x,y}) => { // on的参数为事件名称和事件的回调函数
          this.scrollY = Math.abs(y)
        })
        // 因为probeType:2，所以在快速滑动的时候会出现计算出错的情况。所以在不使用3的情况下，需要做些特殊处理
        // 给右侧列表绑定scroll结束的监听
        foodsScroll.on('scrollEnd',({x,y}) => { // on的参数为事件名称和事件的回调函数
          this.scrollY = Math.abs(y)
        })
      },
      // 初始化Tops
      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops;
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../common/stylus/ShopGoods.styl';
</style>
