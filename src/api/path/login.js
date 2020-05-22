import { axiosBase, axiosGet } from '../axiosBaseConfig'

// 类名需要大写
export default class LoginApi {
  // 获取验证码
  validateCode(user)  {
    let url
    if (user.phone) {
      url = `users/code?phone=` + user.phone
    } else {
      url = `users/code?email=` + user.email
    }
    return axiosGet(url, user)
  }
  //  推广统计
  statistics(data) {
    const url = `users/source-channels`
    return axiosBase(url, data)
  }
  //扫码成功判断
  scanVX(sceneId) {
    const url = `users/wx-scan?sceneId=` + sceneId
    return axiosGet(url)
  }
  //获取二维码
  getVX() {
    const url = `users/wx-qrcode`
    return axiosGet(url)
  }
  //绑定微信
  bindVX(sceneId) {
    const url = `users/wx-bind?sceneId=` + sceneId
    return axiosGet(url)
  }
  // 登录
  userLogin(user) {
    let url = `users/login`
    return axiosBase(url, user)
  }
  // 注册
  register(user) {
    let url = `users`
    return axiosBase(url, user)
  }
  // 是否为新媒体会员
  newMedia() {
    let url = `users/title/new-media`
    return axiosGet(url)
  }
  // 保存修改的用户信息
  setUserInfo(data) {
    let url = `users`
    return axiosPut(url, data)
  }
}