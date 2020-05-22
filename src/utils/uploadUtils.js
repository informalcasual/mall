const uploadUtils = {
  uploadConfig: {
    async: false,
    url: 'http://api.paixin.com/thirdpart/qiniu',
    data: '',
    method: 'post',
    credentials: true,
    crossDomain: true
  },
  today: new Date(),
  getYear: function() {
    return this.today.getFullYear()
  },
  getMonthAndDate: function() {
    // 获取当前月份，默认一月以 0 开始所以需要加一
    let month = this.today.getMonth() + 1,
      date = this.today.getDate()

    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date

    return month + '' + date
  },
  getAll: function() {
    return this.getYear() + '/' + this.getMonthAndDate()
  },
  getDir: function() {
    return 'photos/' + this.getYear() + '/' + this.getMonthAndDate() + '/'
  },
  getUploadData() {
    let date = this.getAll(),
      dataObj = {
        type: 'uptoken',
        bucket: 'images',
        file_ext: 'jpg',
        file_dir: 'photos/' + date
      }
    return dataObj
  },
  getUploadDataSimilar() {
    let date = this.getAll(),
      dataObj = {
        type: 'uptoken',
        bucket: 'images',
        file_ext: 'jpg',
        file_dir: 'temp/' + date
      }
    return dataObj
  },
  getUploadDataCards() {
    let date = this.getAll(),
      dataObj = {
        type: 'uptoken',
        bucket: 'private',
        file_ext: 'jpg',
        file_dir: 'cards/' + date
      }
    return dataObj
  },
  // 已经弃用
  getUptoken(data, callback) {
    const url = '//api.paixin.com/thirdpart/qiniu'
    const pToken = localStorage.getItem('p-token')

    let xhr = new XMLHttpRequest()

    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(xhr)
        } else {
          console.error(xhr.statusText)
        }
      }
    }

    xhr.open('POST', url, true)

    xhr.withCredentials = true

    if (pToken) {
      xhr.setRequestHeader('p-token', pToken)
    }

    xhr.setRequestHeader('no-cookie', '1')

    xhr.send(JSON.stringify(data))
  }
}

export default uploadUtils
