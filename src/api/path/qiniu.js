import * as axios from 'axios'
let instance = axios.create()

export default class Qiniu {
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

  uploadSmilarFile(data) {
    return instance({
      url: 'https://up.qbox.me/',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
      withCredentials: false,
      responseType: 'json',
      data
    })
  }
}
