import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

//声明使用
Vue.use(VeeValidate)

//自定义检测规则
//手机号的验证
VeeValidate.Validator.extend('phone', {
    validate: value => {
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
  })

  //验证码检验规则

  VeeValidate.Validator.extend('code', {
    validate: value => {
      return /^\d{4,6}$/.test(value)
    },
    getMessage: field => field + '必须是4-6位数字'
  })

  //提示信息本地化
  VeeValidate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
      phone: '手机号',
      code: '验证码',
      username: '用户名',
      pwd: '密码',
      captcha: '验证码'
    }
  })
