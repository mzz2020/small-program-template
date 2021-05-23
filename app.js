/*
 * 小程序入口
 */

/*
 * API: 接口信息集
 * config: 项目配置
 * util: 公共工具集
 */

import API from './API/index'
import config from './utils/config'
import { showToast } from './utils/util'

App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch() {
    //获取当前设备像素信息 & 小程序胶囊信息
    const menuButton = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: result => {
        const statusBarHeight = result.statusBarHeight
        this.globalData.navbar = {
          // 导航高度
          height: statusBarHeight + menuButton.height - (menuButton.top - statusBarHeight) * 2,
          // 导航顶部距离
          top: statusBarHeight,
          // 导航右边距离
          right: (result.windowWidth - menuButton.right) * 2 + menuButton.width
        }
      },
      fail: () => {
        showToast('小程序胶囊信息获取失败 !')
      }
    })

    // 监听网络状态变化事件
    wx.onNetworkStatusChange((result) => {
      if (result.isConnected) {
        console.log(`已连接网络${result.networkType}网络 !`)
      } else {
        showToast('未连接网络 !')
      }
      console.log(getCurrentPages()[getCurrentPages().length - 1])
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(getCurrentPages())
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow() {},
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide() {}, 
  /**
   * 页面不存在监听函数
   */
  onPageNotFound() {},
  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError() {},
  
  /**
   * 全局数据
   */
  globalData: {
    navbar: { // 顶部导航栏信息
      height: 0,
      top: 0,
      right: 0
    },
    config
  },
  /**
   * 注册全部API方法
   */
  API
})
