// pages/payorder/payorder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    classification:{},
    title: "",
    product_name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //根据ID获取分类商品
    var that = this;
    var title = options.title;
    var id = options.id;
    console.log(options)
    if(id==2){
      app.apiRequest('/category/getFishing', 'POST', {
        'status': 1,
        'id': id
      }, function (res) {
        that.setData({
          productList: res.data.productList,
          classification: res.data,
          title: title

        })
        console.log(res.data.productList)
        console.log(title)
        console.log(id)
      })
    } else if (id==3){
      app.apiRequest('/category/getNewProducts', 'POST', {
        'status': 1,
        'id': id
      }, function (res) {
        that.setData({
          productList: res.data.productList,
          classification: res.data,
          title: title

        })
        console.log(res.data.productList)
        console.log(title)
        console.log(id)
        })
    } else if (id == 4){
      app.apiRequest('/category/getWillBuy', 'POST', {
        'status': 1,
        'id': id
      }, function (res) {
        that.setData({
          productList: res.data.productList,
          classification: res.data,
          title: title
        })
        console.log(res.data.productList)
        console.log(title)
        console.log(id)
      })
    }else{
      app.apiRequest('/category/getCompetitive', 'POST', {
        'status': 1,
        'id': id
      }, function (res) {
        that.setData({
          productList: res.data.productList,
          classification: res.data,
          title: title
        })
        console.log(res.data.productList)
        console.log(title)
        console.log(id)
      })
    }
   
    // var type_id = id
    //if (id=5){
      // app.apiRequest('/category/getCompetitive', 'POST', {
      //   'status': 1,
      //   'id': id
      // }, function (res) {
      //   that.setData({
      //     productList:res.data,
      //     classification: res.data,
      //     title: title

      //   })
      //   console.log(res)
      //   console.log(title)
      //   console.log(id)
      // })
    //else if(id=2){
     
   // }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})