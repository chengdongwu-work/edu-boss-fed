/*
 * @Author: cdw
 * @Date: 2021-05-06 09:53:11
 * @LastEditTime: 2021-05-08 11:43:18
 * @LastEditors: cdw
 * @Description: TODO
 * @FilePath: /edu-boss-fed/src/utils/request.ts
 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({

})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    headers: {
      Authorization: store.state.user.access_token
    },
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use((config) => {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
let isRfreshing = false // 控制刷新 token 状态
let requests : any[] = [] // 存储刷新token期间过来的401请求
request.interceptors.response.use((response) => {
  return response
}, async (error) => {
  // console.dir(error)
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data)
    // console.log(error.response.status)
    // console.log(error.response.headers)
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效 过期 没有
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新token
      if (!isRfreshing) {
        isRfreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新token失败')
          }

          // 刷新token成功
          store.commit('setUser', res.data.content)
          // 把requests队列中的请求重新发送
          requests.forEach(cb => cb())
          // 重置requests数组
          requests = []
          return request(error.config)
        }).catch(error => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          // 重置刷新状态
          isRfreshing = false
        })
      }

      // 刷新状态下把请求挂起
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限,请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误,请联系管理员')
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    Message.error('请求超时,请重试')
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    Message.error(`请求失败${error.message}`)
  }
  return Promise.reject(error)
})

export default request
