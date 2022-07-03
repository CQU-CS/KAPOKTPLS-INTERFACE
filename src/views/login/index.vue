<template>
  <div class="login-container">
    <star-background />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <div class="title">K A P O K T P L S</div>
      </div>
      <div class="title-container">
        <div class="title2">攀 枝 花 物 流 系 统</div>
      </div>

      <el-form-item prop="account_account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="account_account" v-model="loginForm.account_account" placeholder="Username" name="username"
          type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="account_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="account_password" v-model="loginForm.account_password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item>
        <!--        <span class="svg-container">-->
        <!--          <svg-icon icon-class="el-icon-key" />-->
        <!--        </span>-->
        <span class="svg-container">
          <i class="el-icon-key" style="font-size: 15px;font-weight: bold;"></i>
        </span>
        <el-input v-model="loginForm.validCode" style="width: 50%;" placeholder="请输入验证码"
          @keyup.enter.native="handleLogin">
        </el-input>
        <ValidCode style="padding-top: 5px; float: right;margin-right: 0px" @input="createValidCode" />
      </el-form-item>

      <el-button :loading="loading" type="primary"
        style="width:100%;margin-bottom:50px;margin-top: 20px; border-radius: 15px;"
        @click.native.prevent="handleLogin">登 录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">account_account: admin</span>
        <span> account_password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
  import {
    validUsername
  } from '@/utils/validate'
  import StarBackground from '../../components/StarBackground'
  import ValidCode from '@/components/ValidCode'
  export default {
    name: 'Login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else if (value.length > 20) {
          callback(new Error('The password can not be more than 20 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          account_account: '',
          account_password: '',
          validCode: ''
        },
        loginRules: {
          account_account: [{
            required: true,
            trigger: 'blur'
          }],
          account_password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        loading: false,
        passwordType: 'password',
        validCode: '',
        redirect: undefined
      }
    },
    beforeCreate: function() {
      document.getElementsByTagName('body')[0].className = 'body-bg'
    },
    components: {
      StarBackground,
      ValidCode
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      createValidCode(data) {
        this.validCode = data
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.account_password.focus()
        })
      },
      handleLogin() {
        console.log(1)
        this.$refs.loginForm.validate(valid => {
          console.log(2)
          if (valid) {
            if (!this.loginForm.validCode) {
              this.$message.error('请填写验证码')
              return
            }
            if (this.loginForm.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
              this.$message.error('验证码错误')
              return
            }
            console.log(3)
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(res => {
              // localStorage.setItem('user', JSON.stringify({ 'user': 'Jack' }))// 存储用户信息到浏览器
              console.log(res)
              console.log(4)
              this.$router.push({
                path: this.redirect || '/'
              })
              console.log(5)
              this.loading = false
            }).catch(() => {
              console.log(6)
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden !important;
    position: relative;
    z-index: 1;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 0px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    height: 100%;
    width: 100%;
    background-image: -webkit-radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    background-image: radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    overflow: hidden !important;

    .login-form {
      position: relative;
      width: 500px;
      max-width: 100%;
      padding: 0px 50px 0;
      margin: 0 auto;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding-top: 50px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 48px;
        color: $light_gray;
        margin: 0px auto 20px auto;
        text-align: center;
        font-weight: bold;
      }

      .title2 {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 60px auto;
        text-align: center;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .body-bg {
      background-attachment: fixed;
      overflow: hidden !important;
    }
  }
</style>
