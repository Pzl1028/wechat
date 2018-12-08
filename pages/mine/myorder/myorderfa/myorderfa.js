// pages/mine/myorder/myorder.js
var app = getApp();
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    selected: false,
    selected1: false,
    selected2: true,
    selected3: false,
    myallorder: {},
    payment: {},
    delivery: {},
    received: {},
  },
  selected: function (e) {
    this.setData({
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false

    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
      selected3: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true,
      selected3: false
    })
  },
  selected3: function (e) {
    {
      this.setData({
        selected: false,
        selected1: false,
        selected2: false,
        selected3: true
      })
    }
  },
  tixinggg:function(o){
    var orderid = o.target.id
      console.log(orderid)
      wx.showToast({
        title: '提醒发货成功',
        icon: 'none',
        duration: 1000
      });
  },
  sumbit: function (o) {
    var that = this
    var member_id = wx.getStorageSync('memberId')
    var productid = o.target.id
    app.apiRequest('/order/updateOrders', 'POST', {
      order_id: productid
    }, function (res) {
      console.log(res.code)
      if (res.code == 200) {
        wx.showToast({
          title: '取消订单成功',
          icon: 'loading',
          duration: 500
        });
        app.apiRequest('/order/getOrder', 'GET', {
          memberId: member_id,
          status: 1
        }, function (res) {
          console.log(res.data)
          that.setData({
            payment: res.data,
            statusa: "待付款"
          })
        });
      } else {
        console.log(res.code)
        wx.showToast({
          title: '取消订单失败！',
          icon: 'none'
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var member_id = wx.getStorageSync('memberId')
    console.log(member_id)
    // 所有
    app.apiRequest('/order/getOrder', 'GET', {
      memberId: member_id,
      status: 4
    }, function (res) {
      console.log(res.data)
      that.setData({
        myallorder: res.data,
        status: "已完成"
      })
    });
    // 待付款
    app.apiRequest('/order/getOrder', 'GET', {
      memberId: member_id,
      status: 1
    }, function (res) {
      console.log(res.data)
      that.setData({
        payment: res.data,
        statusa: "待付款"
      })
    });

    // 待发货
    app.apiRequest('/order/getOrder', 'GET', {
      memberId: member_id,
      status: 2
    }, function (res) {
      console.log(res.data)
      that.setData({
        delivery: res.data,
        statusb: "待发货"
      })
    });
    // 待收货
    app.apiRequest('/order/getOrder', 'GET', {
      memberId: member_id,
      status:3
    }, function (res) {
      console.log(res.data)
      that.setData({
        received: res.data,
        statusc: "待收货"
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var member_id = wx.getStorageSync('memberId')
    console.log(member_id)
    let b = [];

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