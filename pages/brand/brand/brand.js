// pages/style/style.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classification: {},
    style: {},
    shop: {},
    type_name:"",
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var type_id = options.type_id;
    var type_name = options.type_name
    console.log(type_id)
   
    var id = options.id;
    console.log(id)
    var name = options.name
    console.log(name)
    // var type_id = that.data.id
    if (type_id !== undefined){
      app.apiRequest('/product/getProduct', 'GET', {
        'status':1,
        'typeId': type_id
      }, function (resa) {
        if(resa.data ==""){
          wx.showToast({
            title: '商品正在上架中',
          });
          wx.navigateBack({
            delat:1
          });
        }
        console.log(resa.data)
          that.setData({
            classification: resa.data,
            type_name: type_name
          })
      });
    } else if (id !== undefined){
        app.apiRequest('/product/getProduct', 'GET', {
          'status':1,
          'styleId': id
        }, function (res) {
            console.log(res.data)
            that.setData({
              style: res.data,
              name:name
            })
        });
    }else{

    }
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