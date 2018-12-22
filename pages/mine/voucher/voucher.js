// pages/mine/voucher/voucher.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        voucher:"",
        asd:"none",
        list:"",
    product_pricea:""
  }, 
  // 使用红包点击事件
  click:function(e){
    wx.setStorageSync('selectCoupon', e.currentTarget.dataset.coupon)
    wx.navigateBack({
      url:'/pages/payorder/payorder'
    })
    // var that =this;
    // var ec_id = e.currentTarget.dataset.id;
    // var discount_amount = e.currentTarget.dataset.amount;
    // console.log(discount_amount)
    // console.log(ec_id)
    // var list =that.data.list
    // console.log(list)
    // var product_pricea = that.data.product_pricea
    // console.log(product_pricea)
    // if(list !==undefined){
    //   wx.redirectTo({
    //     url: '/pages/payorder/payorder?ec_id=' + ec_id + '&discount_amount=' + discount_amount
    // })
    // }
    // if(product_pricea !==undefined){
    //   wx.redirectTo({
    //     url: '/pages/payorder/payorder?ec_id=' + ec_id + '&discount_amount=' + discount_amount
    //   })
    // }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var list = wx.getStorageSync('couponList')
      console.log(list)
    // var product_pricea = options.product_pricea
    
    that.setData({
      list: list
     
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var that = this
    var member_id = wx.getStorageSync('memberId')
    app.apiRequest('/Exchange/getExchangeId', 'GET', {
      member_id: member_id
    },
      function (res) {
        console.log(res.data)
        if(res.data ==""){
          that.setData({
            asd:"block"
          })
        }
        that.setData({
          voucher:res.data
        })
      })
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