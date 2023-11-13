/*
 * @Description: 
 * @Author: 似荆
 * @Date: 2020-10-30 22:23:53
 * @LastEditors  : 似荆
 * @LastEditTime : 2020-11-24 20:42:32
 */
import config from '../config.js'
import { msg } from './wx.js'
import { goToLogin } from '@/apis/auth.js'
export function request (options) {
  return new Promise(async (resolve, reject) => {
    const token = uni.getStorageSync('token')
    uni.request({
      method: 'POST',
      header: { Authorization: 'Bearer ' + token },
      ...options,
      url: config.apiServer + options.url,
      success (res) {
        if (res.data.code === 200) {
          resolve(res.data.result)
        } else if (res.data.code === 401) {
          goToLogin()
          reject(new Error('未登录'))
        } else {
          if (res.data.message) {
            uni.hideLoading()
            msg({ title: res.data.message })
            reject(new Error(res.data.message))
          } else {
            uni.hideLoading()
            msg({ title: '接口请求错误' })
            reject(new Error('接口请求错误'))
          }
        }
      },
      fail (err) {
        uni.hideLoading()
        msg({ title: err.errMsg })
        reject(new Error(err))
      }
    })
  })
}
