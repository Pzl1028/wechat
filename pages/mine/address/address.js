// pages/mine/address/address.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consignee: "",
    phone: "",
    detail: "",
    area: "",
  },
  consignee: function (e) {
    this.setData({
      consignee: e.detail.value
    })
  },
  detail: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  area: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  // 获取输入的值传输后台
  submit: function () {
    var that = this
    var consignee = that.data.consignee
    console.log(consignee)
    var phone = that.data.phone
    console.log(phone)
    var area = that.data.area
    console.log(area)
    var detal = that.data.detail
    console.log(detal)
    var create_member_id = wx.getStorageSync('memberId')
    console.log(create_member_id)
    let address ={
      'memberId': create_member_id,
      'consignee': consignee,
      'phone': phone,
      'area': area,
      'detail': detal,
      'ifDefault': 1
    }
    console.log(address)
    app.apiRequest('/address/addMemberAddress','POST',{
      'address': JSON.stringify(address)
    },function(res){
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '添加地址成功',
          icon: 'none',
          duration: 2000
        });
        
        // wx.navigateBack({
        //   url: '../../payorder/payorder',
        // })
        var isfalge = wx.getStorageSync('isfalge');
        if(!isfalge){
            console.log("确认订单进来的")
            wx.navigateBack({
              delta:1
            })
        }else{
            wx.switchTab({
              url: '../home/home',
            })
        }
      } else {
        wx.showToast({
          title: '添加地址失败',
          icon: 'none',
          duration: 2000
          
        })
        // wx.navigateBack({
        //   url: 'pages/payorder/payorder',
        // });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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