// pages/mine/setup/setup.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:"",
    accounts: null,
    password: null,
    passwordq: null,
    code: null,
  },
  passworda: function (e) {
    this.setData({
      passworda: e.detail.value
    })
  },
  passwd: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var accounts = wx.getStorageSync('mobile')
    // console.log(password)
    console.log(accounts)
    that.setData({
      mobile: accounts,
    })
  },
    yzm:function(){
      var that =this
      var accounts = wx.getStorageSync('mobile')
      app.apiRequest('/wx/balance/forgetPwd/code','POST',{
        'mobile': accounts
      },function(res){
        console.log(res.data)
        if(res.code ==200){
          wx.showToast({
            title: '验证码获取成功',
            icon: 'none',
            duration: 1000
          });
          console.log('验证码', res.data)
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          });
        }
      })
    },
  click:function(){
    var that = this
    var accounts = wx.getStorageSync('mobile')
    var passworda = this.data.passworda
    var code = this.data.code
    var passwd = this.data.passwd
    var mobile = "18401668378" 
    if (passworda.length !== 8 || passwd.lenght !== 8){
      wx.showToast({
        title: '密码必须是8位数',
        icon: 'none',
        duration: 1000
      });
    }
    if (passworda !== passwd) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        duration: 1000
      });
    }
    app.apiRequest('/wx/balance/forgetPwd','POST',{
      'mobile': accounts,
      'pay_password': passwd,
      'forgetPwdCode':code
    },function(res){
      console.log(res.data)
      if(res.code ==200){
        wx.showToast({
          title: '设置支付密码成功',
          icon: 'none',
          duration: 1000
        });
      }else{
        wx.showToast({
          title: '设置支付密码失败',
          icon: 'none',
          duration: 1000
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})