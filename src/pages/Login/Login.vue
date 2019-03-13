<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Demo外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                {{computeTime>0 ? '已发送('+computeTime+'s)' :'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">

                <div class="switch_button" @click="showPwd = !showPwd" :class="showPwd?'on':'off'">
                  <div class="switch_circle" :class="{'right':showPwd}"></div>
                  <span class="switch_text">{{showPwd?'on':'off'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click.prevent="$router.back()">
        <span class="item_icon">
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icon-regou"></use>
          </svg>
        </span>
      </a>
    </div>
    <!--注意这里用的是@closeTip而不是@click-->
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
  export default {
    data () {
      return {
        loginWay: true,//true代表短信登录,false代表密码登录
        phone: '',//手机号
        computeTime: 0,//计时时间
        showPwd:false, //是否显示密码
        pwd: '',//密码
        code: '',//短信验证码
        name: '',//用户名
        captcha: '',//密码登录中的验证码
        alertText: '',//提示文本
        alertShow: false ,//是否显示模态框

      }
    },
    computed:{
      //返回一个布尔值来验证输入的电话号码是不是符合要求
      rightPhone(){
        return /^1[34578]\d{9}$/.test(this.phone)
      }
    },
    methods:{
      showAlert(alertText){
        this.alertText = alertText
        this.alertShow = true
      },
      async getCode(){
        //如果当前没有计时
        if(!this.computeTime){
          //启动倒计时
          this.computeTime = 10;
          this.intervalId = setInterval(()=>{
            this.computeTime--
            if(this.computeTime <= 0){
              clearInterval(intervalId)
            }
          },1000)
          //发起ajax请求,获得短信验证码
          const result = await reqSendCode(this.phone);
          if(result.code === 1){
            //显示模态框
            this.showAlert(result.msg)
            //停止倒计时
            if(this.computeTime){
              this.computeTime= 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }
      },
      login(){
        //前端表单验证
        if(this.loginWay){
          //短信登录
          const {rightPhone,phone,code} = this
          if(!this.rightPhone){
            this.showAlert('手机号不正确')
          }else if(!(/^\d{6}$/.test(code))){
            this.showAlert('验证码不正确')
          }else{
            console.log("验证成功")
          }
        }else {
          //密码登录
          const {name,pwd,captcha} = this
          if(!this.name){
            this.showAlert('用户必须指定')
          }else if(!this.pwd){
            this.showAlert('密码必须指定')
          }else if(!this.captcha){
            this.showAlert('验证码必须指定')
          }else{
            console.log("验证成功")
          }
        }
      },
      closeTip(){
        console.log("closeTip")
        this.alertText = ''
        this.alertShow = false
      },
      getCaptcha(event){
        //每次指定的src值需要不一样才能触发
        event.target.src = 'http://localhost:4000/captcha?time='+Date.now()
      }
    },
    components:{
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  @import "../../common/stylus/login.styl";
</style>
