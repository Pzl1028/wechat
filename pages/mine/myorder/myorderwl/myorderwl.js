// pages/mine/myorder/myorderwl/myorderwl.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wulixx:"",
    product_icon:"",
    order_code:"",
    wulixt:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this
    var order_id = options.order_id;
    var product_icon = options.product_icon;
    var order_code = options.order_code;
    that.setData({
      product_icon: product_icon,
      order_code: order_code,
    });
    app.apiRequest('/express/queryLogisticsInfo','POST',{
      'order_id': order_id,
    },function(res){
        console.log(res.data)
        console.log(res.data.pOrder)
        console.log(res.data.Traces)
        that.setData({
          wulixx: res.data.Traces,
          wulixt: res.data.pOrder
        });
    });
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