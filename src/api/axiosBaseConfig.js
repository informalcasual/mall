import axios from 'axios'
import utilHelper from '@/utils/utils.js'

const { cookie } = utilHelper

// const getUrl = () => {
//   let obj = {}
//     obj.Url = 'http://192.168.1.246:8082/'
//     obj._loginUrl = '//api0.paixin.com/'
//   return obj
// }
// const baseUrl = getUrl()
const baseURL = 'http://192.168.1.247:8082/'
axios.interceptors.request.use(
  config => {
    const pToken = cookie('p-token')
    if (pToken) {
      config.headers['authorization'] = pToken
    }
    return config
  },
  err => {
    return err
  }
)

// http response 拦截器
axios.interceptors.response.use(

  response => {
    const uid = response.data && response.data.data && response.data.data['id']
    if (uid) {
      localStorage.setItem('user', uid)
    }

    return response
  },
  error => {
    return error.response
  }
)

/**
 * 删除空的属性
 * @param {*} object 想要删除空属性的对象
 */
function deleteEmptyProperty(object) {
  let objCopy = JSON.parse(JSON.stringify(object))

  for (let i in objCopy) {
    let value = objCopy[i]
    if (value === '' || value === null || value === undefined) {
      delete objCopy[i]
    }
  }

  return objCopy
}

/**
 * 基础下请求接口的封装
 * @param {*} url 不带域名的url，域名将在baseURL中设置
 * @param {*} method 请求的方法
 * @param {*} data 请求的参数，数据放在request rody
 * @param {*} params 请求的参数，将数据放在URL之后，以?连接，参数之间以&进行拼接
 */
export const axiosBase = (url, data = {}, params = {}, method = 'POST') => {
  let config = {
    baseURL: baseURL,
    method: method,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'text'
  }
  config.url = url
  config.data = deleteEmptyProperty(data)
  config.params = deleteEmptyProperty(params)
  return axios(config)
}

export const axiosGet = (url, data = {}, params = {}, method = 'GET') => {
  let config = {
    baseURL: baseURL,
    method: method,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'text'
  }

  config.url = url
  config.data = deleteEmptyProperty(data)
  config.params = deleteEmptyProperty(params)
  return axios(config)

}

export const axiosPut = (url, data = {}, params = {}, method = 'PUT') => {
  let config = {
    baseURL: baseURL,
    method: method,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'text'
  }

  config.url = url
  config.data = deleteEmptyProperty(data)
  config.params = deleteEmptyProperty(params)


  return axios(config)
}

export const axiosDelete = (url, data = {}, params = {}, method = 'DELETE') => {
  let config = {
    baseURL: baseURL,
    method: method,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'text'
  }

  config.url = url
  config.data = deleteEmptyProperty(data)
  config.params = deleteEmptyProperty(params)

  return axios(config)
}