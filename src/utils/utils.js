/* global JSEncrypt */

var utilHelper = {
  /**
   * 获取cookie
   */
  cookie(name) {
    var arrstr = document.cookie.split('; ')

    for (var i = 0; i < arrstr.length; i++) {
      var temp = arrstr[i].split('=')
      if (temp[0] == name) {
        return decodeURIComponent(temp[1])
      }
    }
    return ''
  },
  /**
   * 设置cookie
   */
  setCookie(name, value, time, path, domain) {
    var cookie_str = name + '=' + encodeURIComponent(value) + ';';
    time = time || 0;
    if (time > 0) {
      var exp = new Date(time*1000);
      cookie_str += 'expires=' + exp.toGMTString() + ';';
    }
  
    path = path || '/';
    cookie_str += 'path=' + path + ';';
    if(domain) {
      cookie_str += 'domain=' + domain + ';';
    }
    document.cookie = cookie_str;
  },
  rsa_encrypt(string) {
    if (string === '') {
      return ''
    } else {
      let publicKey =
          '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCs6vwV3PlvgLqkJ9bjYfbuhvloXKdEtJKHQ0vNLlJZkdKutEVNqsiGy/+iB3CkG9TzSoSVZHU0HVM0vDoYG+ODPi1qzvPhzeFThFUbMW9KhDQlQOL+O/L6DqLQdHGDmwpk6eJcfjlqhM8EKFFQAmlLaYx0WAfNKJAAWjwFJMBjvwIDAQAB-----END PUBLIC KEY-----',
        rsa = new JSEncrypt()
      rsa.setKey(publicKey)
      return rsa.encrypt(string)
    }
  },
  getWindowHeight() {
    var windowHeight = 0
    if (document.compatMode === 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight
    } else {
      windowHeight = document.body.clientHeight
    }
    return windowHeight
  },
  getWindowWidth() {
    var windowWidth = 0
    if (document.compatMode === 'CSS1Compat') {
      windowWidth = document.documentElement.clientWidth
    } else {
      windowWidth = document.body.clientWidth
    }
    return windowWidth
  },
  viewportSize() {
    let e = window,
      a = 'inner'

    if (!('innerWidth' in window)) {
      a = 'client'
      e = document.documentElement || document.body
    }

    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    }
  },
  getBrowser() {
    var userAgent = navigator.userAgent
    var isOpera = userAgent.indexOf('Opera') > -1
    var isMaxthon = userAgent.indexOf('Maxthon') > -1
    var isIE =
      userAgent.indexOf('compatible') > -1 &&
      userAgent.indexOf('MSIE') > -1 &&
      !isOpera
    var isEdge = userAgent.indexOf('Edge') > -1
    var isFF = userAgent.indexOf('Firefox') > -1
    var isSafari =
      userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') < 1
    var isChrome = userAgent.indexOf('Chrome') > -1

    if (isEdge) {
      return 'Edge'
    }
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+)')
      reIE.test(userAgent)
      var fIEVersion = parseFloat(RegExp['$1'])
      if (userAgent.indexOf('MSIE 6.0') != -1) {
        return 'IE6'
      } else if (fIEVersion == 7) {
        return 'IE7'
      } else if (fIEVersion == 8) {
        return 'IE8'
      } else if (fIEVersion == 9) {
        return 'IE9'
      } else if (fIEVersion == 10) {
        return 'IE10'
      } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
        return 'IE11'
      } else {
        return '0' // IE版本过低
      }
    }
    if (isFF) {
      return 'Firefox'
    }
    if (isMaxthon) {
      return 'Opera-webkit'
    }
    if (isOpera) {
      return 'Opera'
    }
    if (isSafari) {
      return 'Safari'
    }
    if (isChrome) {
      return 'Chrome'
    }
    return 'unknow'
  },
  time(x = 0) {
    return (Date.parse(new Date()) + x) / 1000
  },
  // 针对safari的时间问题
  safariTime(time){
    let splt = time.split('.')[0]
    let Ntime = splt.replace(/\-/g,'/').replace('T',' ')
    let _new = new Date(Ntime)
    return _new
  },
  YMDTime(date, div) {
    div = div || '-'  
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(month < 10) {
      month = '0' + month
    }
    if(day < 10) {
      day = '0' + day
    }
    return date.getFullYear() + div + month + div + day
  },
  specificTime(date, div){
    div = div || '-'  
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes =  date.getMinutes();
    let second = date.getSeconds();
    if(month < 10) {
      month = '0' + month
    }
    if(day < 10) {
      day = '0' + day
    }
    if(hours < 10){
      hours = '0' + hours
    }
    if(minutes < 10){
      minutes = '0' + minutes
    }
    if(second < 10) {
      second = '0' + second
    }
    return date.getFullYear() + div + month + div + day + ' ' + hours + ':' + minutes + ':' + second;
  },
  getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  },
  isEmptyObj(object) {
    if (!object) {
      return false
    }

    for (var name in object) {
      return false
    }
    return true
  },
  random(min, max) {
    if (max == null) {
      max = min
      min = 0
    }
    return min + Math.floor(Math.random() * (max - min + 1))
  },
  shuffle(arr) {
    var length = arr.length,
      shuffled = Array(length)
    for (var index = 0, rand; index < length; index++) {
      rand = this.random(0, index)
      if (rand !== index) shuffled[index] = shuffled[rand]
      shuffled[rand] = arr[index]
    }
    return shuffled
  }
}

export default utilHelper
