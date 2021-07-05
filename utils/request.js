
// loading配置，请求次数统计
function startLoading() {
  wx.showLoading({
    title: 'Loading...',
    icon: 'none',
    mask:true
  })
}
function endLoading() {
  wx.hideLoading();
}
// 声明一个对象用于存储请求个数
var needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

// request.js
const request = options => {
  showFullScreenLoading();
  return new Promise((resolve, reject) => {
    const { data, method } = options
    if(data && method !== 'get') {
      options.data = JSON.stringify(data)
    }
    wx.request({
      header: { 'Content-Type': 'application/json' },
      ...options,
      success: function(res) {
        if(res.data.code === 200) {
          resolve(res.data)
          tryHideFullScreenLoading();
        } else {
          resolve(res.data)
          // reject(res.data)
          tryHideFullScreenLoading();
        }
      },
      fail: function(res) {
        reject(res.data)
      }
    })
  })
}
export default request
