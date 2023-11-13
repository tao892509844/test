/*
 * @Description: 
 * @Author: 加修
 * @Date: 2020-11-12 20:51:55
 * @LastEditors: 似荆
 * @LastEditTime: 2023-11-12 19:15:53
 */
import { request } from '@/utils/request.js'
import config from '../config.js'
import { checkAndAuthorize } from '@/utils/wx'
export function login () {
  return new Promise((resolve, reject) => {
    uni.setStorageSync('token', '1')
    resolve()
  })
}


export function checkLogin () {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')
    if (!token) {
      goToLogin()
      reject(new Error('未登录'))
    } else {
      resolve()
    }
  })
}

export function bindDevice () {
  uni.setStorageSync('bindDeviceStatus', '1')
}

export function checkBindDevice () {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('bindDeviceStatus')
    if (!token) {
      goToLogin()
      reject(new Error('未绑定'))
    } else {
      resolve()
    }
  })
}

export function goToLogin () {
  uni.removeStorageSync('token')
  uni.removeStorageSync('bindDeviceStatus')
  uni.navigateTo({
    url: '/pages/login/index'
  });
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    checkAndAuthorize('scope.userInfo', '需要获取您的用户信息', false).then(res => {
      uni.getUserInfo({
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        }
      })
    }).catch(err => {
      reject(err)
    })

  })
}

export function getPhoneNum (data) {
  return request({
    url: '/restApi/paltform/wx/mini/phone',
    data: {
      appid: config.appid,
      ...data
    }
  })
}
