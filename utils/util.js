const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/* 全局提示方法 */
const showToast = (title, icon = 'none', image = '') => {
  wx.showToast({
    title,
    duration: 1500,
    icon,
    image,
    mask: false,
    success: (res) => {},
    fail: (res) => {},
    complete: (res) => {}
  })
}

module.exports = {
  formatTime,
  showToast
}
