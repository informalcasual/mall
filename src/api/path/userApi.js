import { axiosBase } from '../axiosBaseConfig'
import * as axios from 'axios'
let instance = axios.create()
// 类名需要大写
export default class UserApi {
  // 注册
  signup(data) {
    let url = '/user/quick_regist_by_phone'
    return axiosBase(url, data)
  }
  // 手机号和验证码登录
  codeLogin(data) {
    let url = '/user/login_by_smcode'
    return axiosBase(url, data)
  }
  // 手机号和密码登录
  login(data) {
    let url = '/user/login'
    return axiosBase(url, data)
  }
  logout() {
    let url = '/user/logout'
    return axiosBase(url)
  }
  checkPhoneNumExist(phoneNum) {
    let url = '/user/existence'
    return axiosBase(url, phoneNum)
  }
  currentUser() {
    let url = `/users`
    return axiosBase(url, {}, {}, 'GET')
  }
  // 发送搜索内容
  userSearch(data) {
    let url = `/sale/search`
    return axiosBase(url, data)
  }
  // 提交企业信息
  setComInfo(data) {
    let url = `users/company`
    return axiosBase(url, data, {}, 'PUT')
  }
  setUserInfo(data) {
    let url = `/users`
    return axiosBase(url, data, {}, 'PUT')
  }
  getComInfo() {
    let url = `/users/company`
    return axiosBase(url, {}, {}, 'GET')
  }
  // 设置头像
  setUserAvatar(data) {
    let url = `/user/set_avatar`
    return axiosBase(url, data)
  }
  // 忘记密码
  userForgot(data) {
    let url = `/user/fdpwd_by_phone`
    return axiosBase(url, data)
  }
  // 重置密码
  userReset(data) {
    let url = `/user/chpwd`
    return axiosBase(url, data)
  }

  uploadFile(uploadData) {
    let url = `/upload-token?suffix=${uploadData.suffix}&prefix=${uploadData.prefix}`
    return axiosBase(url, {}, {}, 'GET')
  }

  // 上传图片
  postAvatar(data) {
    return instance({
      url: 'https://up.qbox.me/',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
      withCredentials: false,
      responseType: 'json',
      data
    })
  }
  validateCode(user) {
    let url
    if (user.phone) {
      url = `/users/code?phone=` + user.phone
    } else {
      url = `/users/code?email=` + user.email
    }
    return axiosBase(url, {}, {}, 'GET')
  }

  // 外链点击统计
  statisticsIP(data) {
    let url = `/users/click-source-channels`;
    return axiosBase(url, data);
  }
}
