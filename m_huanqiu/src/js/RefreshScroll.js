const Event = require('./Event.js')

const RefreshScroll = function (config) {
  // 默认配置
  let defaultConfig = {
    getData: function () {}
  }
  // 合并配置
  config = {
    ...defaultConfig,
    ...config
  }

  // 全局变量
  this.getData = config.getData
  this.loading = false
  this.screenHeight = screen.height
  this.bodyHeight = document.body.clientHeight
}

RefreshScroll.prototype.watch = function () {
  console.log(window.scrollY, this.bodyHeight, this.screenHeight)
  if (!this.loading && window.scrollY > this.bodyHeight - this.screenHeight) {
    this.getData()
    this.bodyHeight = document.body.clientHeight
  }
}

RefreshScroll.prototype.init = function () {
  Event.addEvent(window, 'scroll', this.watch.bind(this))
}

module.exports = RefreshScroll
