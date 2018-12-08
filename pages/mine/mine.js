// pages/mine/mine.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick_name:"",
    balance:"",
    mobile:"",  
  },
  clicka: function () {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获余额信息
    var member_id = wx.getStorageSync('memberId');  //用户id
    app.apiRequest('/member/getbalance', 'GET', {
      'member_id': member_id
    }, function (resd) {
      console.log(resd.data)
      that.setData({
        balance: resd.data.balance
      })
    });
    // var that =this
    var member_id = wx.getStorageSync('memberId')  //用户id
    var nick_name = wx.getStorageSync('nick_name') 
    // var balance = wx.getStorageSync('balance') 
    var accounts = wx.getStorageSync('mobile') 
    // console.log(password)
    console.log(accounts)
    that.setData({
      nick_name: nick_name,
      mobile: accounts,
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
    var that =this
    //获余额信息
    var member_id = wx.getStorageSync('memberId');  //用户id
    app.apiRequest('/member/getbalance', 'GET', {
      'member_id': member_id
    }, function (resd) {
      console.log(resd.data)
      that.setData({
        balance: resd.data.balance
      })
    })
    this.onLoad()
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
    return {
      title: '上海羽琪科技文化创意中心技术支持',
      desc: '东方云服装定制小程序',
      path: ''
    }
  }
})