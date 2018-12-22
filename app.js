//app.js
//var app = getApp
var scence =0;
App({
  $_SERVER: {
    TEST: 'http://localhost:9951',
    //TEST: 'http://192.168.1.22:9951/',
    // TEST: 'http://192.168.1.46:9951/',
    API: 'https://www.pengyoujuhui.com/clothing'
  },
  //通用发送请求
  apiRequest: function (url, methods, post, cb) {
    var that = this;
    wx.request({
      url: that.$_SERVER.API + url,
      data: post,
      method: methods,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (200 === res.statusCode) {
          //请求成功
          'function' === typeof cb && cb(res.data);
        } else {
          // wx.showToast({
          //   title: '系统错误',
          //   icon: 'none',
          //   duration: 2000
          // });
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '您的网络异常，请检查网络是否正常！',
          showCancel: false
        });
      }
    })
  },
  //通用发送请求本地测试
  apiTestRequest: function (url, methods, post, cb) {
    var that = this;
    wx.request({
      url: that.$_SERVER.TEST + url,
      data: post,
      method: methods,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (200 === res.statusCode) {
          //请求成功
          'function' === typeof cb && cb(res.data);
        } else {
          wx.showToast({
            title: '',//系统错误
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '您的网络异常，请检查网络是否正常！',
          showCancel: false
        });
      }
    })
  },
  onLaunch: function () {
    // console.log("app.onLaunch");
    // wx.reLaunch({
    //   url: '/pages/home/home',
    // })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },
  // onShow:function(){
  //   console.log("app.onShow");
  //   if(this.globalData.scence){
  //     wx.redirectTo({
  //       url: '/pages/home/home',
  //     })
  //     console.log("去首页");
  //   }else{
  //     wx.redirectTo({
  //       url: '/pages/loginone/loginone',
  //     })
  //     console.log("去首次进入页")
  //   }
  // },
  onHide:function(){
      this.globalData.scence = 1;
      console.log("app.onHide");
  },

  globalData: {
    userInfo: null,
    member_id:null,
    selectProduct:null
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '东方云定制',
      desc: '上海羽琪科技文化创意中心!',
      path: ''
    }
  }
})