/*
 * @name: request
 * @describe: 网络请求方法
 * @Author: Liam
 * @Date: 2021-05-23
 */

/*
 * config: 项目配置
 * serverUrl： 服务器地址
 * utils: 公共方法
 * showToast: 全局提示方法
 */

 import { serverUrl } from './config'
 import { showToast } from './util'

 /*
 * 请求配置
 * 基本配置
 * option {
 *   url: 请求地址
 *   method: 请求方式
 *   data: 请求参数
 * }
 * 其它配置
 * rest {
 *   isLoading: 是否显示加载框
 *   loadingText:　加载框文本
 * }
 */

let isLogin = true
module.exports = (option, rest) => {
  // 显示加载框
  if (rest.isLoading) {
    wx.showLoading({
      title: rest.loadingText
    })
  }

  // 返回 请求后的 Promise 结果
  return new Promise((resolve, reject) => {
    // 改送请求
    wx.request({
      url: `${serverUrl}${option.url}`, // 请求地址
      method: option.method, // 请求方式
      data: option.data, // 请求参数
      header: { // 请求头
        mzz_token:　`mzz ${wx.getStorageSync('mzz_token')}` // 获取缓存token
      },
      timeout: 30000, // 请求超时间
      dataType: 'json', // 请求数据格式
      responseType: 'text', // 响应数据格式
      success: (result) => { // 请求成功
        const { code } = result.data
        if (code === 401) {
          // 是否重新登陆对话框
          if (isLogin) {
            isLogin = false
            wx.showModal({
              title: '温馨提示',
              content: '检测到您的登录状态已过期，是否重新登录 ?',
              cancelText: '暂不登录',
              cancelColor: '#666',
              confirmText: '去登录',
              confirmColor: '#00cccc',
              success: (res) => {
                // 点击confirm
                isLogin = true
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              },
              fail: (err) => {}
            })
          }
        } else {
          resolve(result.data)
        }
      },
      fail: (error) => {
        if (error.errMsg === 'request:fail -109:net::ERR_ADDRESS_UNREACHABLE') {
          showToast('网络异常，请重试 !')
        } else if (error.errMsg === 'request:fail timeout') {
          showToast('网络超时 !')
        } else {
          showToast('服务器异常，请重试 !')
        }
        reject(error)
      },
      complete: () => { // 请求完成
        if (rest.isLoading) {
          // 关闭加载框
          wx.hideLoading()
        }
      }
    })
  })
}