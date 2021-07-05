// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
     // 新版本更新 强制使用新版本
     const updateManager = wx.getUpdateManager()
     updateManager.onCheckForUpdate(function (res) {
       // 请求完新版本信息的回调
       console.log(res.hasUpdate,'请求更新')
     })
 
     updateManager.onUpdateReady(function () {
       wx.showModal({
         title: '更新提示',
         content: '新版本已经准备好，是否重启应用？',
         success: function (res) {
           if (res.confirm) {
             // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
             updateManager.applyUpdate()
           }
         }
       })
     })
 
     updateManager.onUpdateFailed(function () {
       // 新版本下载失败
       wx.showModal({
         title: "已经有新版本了哟~",
         content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
       })
     })
  },
  globalData: {
    userInfo: null
  }
})
