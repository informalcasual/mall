import { axiosBase, axiosGet } from '../axiosBaseConfig'

// 类名需要大写
export default class LoginApi {
  // 获取验证码
  validateCode(user)  {
    let url
    if (user.phone) {
      url = `//api0.paixin.com/users/code?phone=` + user.phone
    } else {
      url = `//api0.paixin.com/users/code?email=` + user.email
    }
    return axiosGet(url, user)
  }

  //扫码成功判断
  scanVX(sceneId) {
    const url = `//api0.paixin.com/users/wx-scan?sceneId=` + sceneId
    return axiosGet(url)
  }
  //获取二维码
  getVX() {
    const url = `//api0.paixin.com/users/wx-qrcode`
    return axiosGet(url)
  }
  //绑定微信
  bindVX(sceneId) {
    const url = `//api0.paixin.com/users/wx-bind?sceneId=` + sceneId
    return axiosGet(url)
  }
  // 登录
  userLogin(user) {
    let url = `//api0.paixin.com/users/login`
    return axiosBase(url, user)
  }
  // 注册
  register(user) {
    let url = `//api0.paixin.com/users`
    return axiosBase(url, user)
  }
  // 保存修改的用户信息
  setUserInfo(data) {
    let url = `//api0.paixin.com/users`
    return axiosPut(url, data)
  }
}