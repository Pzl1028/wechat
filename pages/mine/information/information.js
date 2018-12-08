// pages/mine/information/information.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true, 
    nick_name: "",
    balance: "",
    mobile: "",
    sex:"",
    array:['男','女'],
    index:"",
    asd:"block",
  },
  clicka: function () {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      asd: "none"
    })
    var abc = e.detail.value
    if(abc ==0){
      var qwer ="男"
      wx.setStorageSync("qwer", qwer)
    }else if(abc =="1"){
      var qwer ="女"
      wx.setStorageSync("qwer", qwer)
    }
    var qwerasd = wx.getStorageSync('qwer')
    console.log(qwerasd)
    this.setData({
      index: qwerasd,
    })
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var asd = wx.getStorageSync('asd') 
    var qwerasd = wx.getStorageSync('qwer')
    console.log(qwerasd)
    if(qwerasd !==""){
      this.setData({
        asd: "none"
      })
    }
    this.setData({
      index: qwerasd,
    })
    // console.log(asd)
    var member_id = wx.getStorageSync('memberId')  //用户id
    var nick_name = wx.getStorageSync('nick_name')
    // var balance = wx.getStorageSync('balance')
    var accounts = wx.getStorageSync('mobile')
    // console.log(password)
    console.log(accounts)
    that.setData({
      nick_name: nick_name,
      mobile: accounts,
      // sex:asd
    });
    //获余额信息
    app.apiRequest('/member/getbalance', 'GET', {
      'member_id': member_id
    }, function (resd) {
      console.log(resd.data)
      that.setData({
        balance: resd.data.balance
      })
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